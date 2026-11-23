# Architecture

This document describes the intended implementation. The current source files are placeholders.

## Design

Run a single Go service that accepts SSH connections through Wish. Each interactive session gets its own Bubble Tea model; Lip Gloss styles the rendered screens. Bubbles can provide list, viewport, and help components when needed.

```text
SSH client → Wish session → Bubble Tea model → screen/components
                                  ↓
                            content provider
                                  ↓
                         bundled JSON content
```

The application serves a public, read-only portfolio. It does not need a database, user accounts, or a separate HTTP API for its first release.

## Directory responsibilities

```text
apps/ssh-server/
├── cmd/portfolio-server/main.go   # Configuration, dependency wiring, shutdown
├── internal/
│   ├── config/config.go          # Read and validate environment configuration
│   ├── infra/
│   │   ├── ssh/server.go         # Wish listener and per-session model creation
│   │   ├── ssh/middleware.go     # Terminal checks, limits, and connection logs
│   │   └── data/provider.go      # Typed, validated portfolio content
│   └── tui/
│       ├── model.go              # Navigation, messages, and session state
│       ├── constants.go          # Theme, spacing, and key bindings
│       ├── components/           # Reusable list and scrolling views
│       └── screens/              # Home, Projects, and Contact
├── assets/projects.json          # Public portfolio content
├── deployment/                  # Container build and Compose configuration
└── docs/                        # Architecture and operational guidance
```

CI workflows belong in the monorepo root `.github/workflows/`.

## Boundaries and state

- `main` wires configuration, the content provider, and the SSH server.
- The SSH layer owns connection lifecycle and passes content into a new TUI model for each session.
- Screens own presentation. They do not open files, make network requests, or configure SSH.
- Selection, scrolling, terminal dimensions, and navigation are session-local. Never share mutable models between visitors.
- Load and validate JSON at startup, then share immutable content. Embed defaults in the binary using a small Go package inside `assets/`; `go:embed` cannot reference parent directories.
- Keep content access behind a small provider boundary so a remote source can be added later. Run future network operations asynchronously through Bubble Tea commands, with deadlines and session cancellation.

## Terminal behavior

Support arrows and `j/k`, Enter to select, Esc to return, and `q`/Ctrl+C to quit. Resize events recalculate available content space. Small terminals receive a usable compact layout or a minimum-size message. Mouse support is optional; links remain readable as plain text.

Use the terminal capabilities of the connected client. Sanitize external text to prevent embedded terminal control sequences from executing.

## Connection lifecycle

Allow anonymous browsing explicitly; an SSH username is not application identity. Require an interactive terminal and return a helpful message otherwise. Reject unsupported commands, subsystems, and forwarding requests. Never invoke an operating-system shell for visitors.

Set connection/session limits and idle timeouts. Log connection lifecycle and errors without recording keystrokes or sensitive data. On disconnect, cancel session work. On shutdown, stop accepting new connections, allow a bounded drain period, then close remaining sessions.

Persist the server host key outside the image and repository. All restarts of the same endpoint must retain its identity.

## Verification

Test navigation, content validation, resize behavior, and isolation between simultaneous sessions. Add an SSH integration test that requests a PTY and receives the initial screen. Run `go test ./...`, `go test -race ./...`, `go vet ./...`, and a production build in CI.
