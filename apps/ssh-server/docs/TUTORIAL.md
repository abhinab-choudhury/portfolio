# Build your first SSH portfolio

This tutorial takes your existing `apps/ssh-server` scaffold to a small working portfolio. You will add three screens, connect through SSH, and package it with Docker.

The code below is for the **v1 dependencies already pinned in your `go.mod`**: Wish 1.4.7, Bubble Tea 1.3.4, and Lip Gloss 1.1.0. Do not mix these snippets with v2 imports. This is a learning baseline; complete the public-deployment checklist before exposing it to everyone.

## 1. Understand the three pieces

- **Wish** accepts SSH connections and attaches a terminal to your application.
- **Bubble Tea** keeps the screen state and reacts to keyboard and resize events.
- **Lip Gloss** styles the text your application renders.

Your Go program runs on the server. Visitors only need an SSH client. Each visitor receives a separate model, so one visitor changing screens does not affect anyone else.

## 2. Prepare the scaffold

From the repository root:

```sh
cd apps/ssh-server
go version
go mod download
```

Use Go 1.24.4 or a compatible newer version. All remaining commands assume you are in `apps/ssh-server` unless stated otherwise.

Your scaffold contains empty `.go` files. Go requires a package declaration even in files you are not using yet. Run this once to initialize **only empty files**:

```sh
python3 - <<'PYCODE'
from pathlib import Path
for path in Path('.').rglob('*.go'):
    if path.stat().st_size == 0:
        package = 'main' if path.parent.name == 'portfolio-server' else path.parent.name
        path.write_text(f'package {package}\n')
PYCODE
```

Add these lines to the app's `.gitignore`:

```gitignore
.local/
.env
portfolio-server
```

Create a local SSH host key:

```sh
mkdir -p .local
chmod 700 .local
ssh-keygen -t ed25519 -N '' -f .local/ssh_host_ed25519_key
```

If this key already exists, keep it rather than overwriting it. It identifies your **server**, not a visitor. Never commit its private file.

**Checkpoint:** `go mod download` completes and your host-key files exist.

## 3. Add configuration

Replace `internal/config/config.go` with:

```go
package config

import "os"

type Config struct {
    Address string
    HostKeyPath string
}

func Load() Config {
    return Config{
        Address: value("SSH_LISTEN_ADDR", "127.0.0.1:23234"),
        HostKeyPath: value("SSH_HOST_KEY_PATH", ".local/ssh_host_ed25519_key"),
    }
}

func value(name, fallback string) string {
    if v := os.Getenv(name); v != "" {
        return v
    }
    return fallback
}
```

Local development binds only to your machine. Docker will override the address later. This example reads the process environment; it does not load `.env` automatically.

## 4. Write the screens

Replace `internal/tui/screens/home.go` with:

```go
package screens

func Home() string {
    return "Hello, I'm Abhinab.\n\nWelcome to my SSH portfolio.\nI build software and enjoy learning new tools."
}
```

Replace `internal/tui/screens/projects.go` with:

```go
package screens

func Projects() string {
    return "Projects\n\nSSH Portfolio\nAn interactive portfolio built with Go.\n\nAdd your own project descriptions here."
}
```

Replace `internal/tui/screens/contact.go` with:

```go
package screens

func Contact() string {
    return "Contact\n\nGitHub: https://github.com/abhinab-choudhury\nEmail: replace-with-your-email@example.com"
}
```

These functions return content only. Keeping them separate makes it easier to change the layout without changing your biography or links. Replace the example email before sharing the app.

## 5. Build the Bubble Tea model

Replace `internal/tui/model.go` with:

```go
package tui

import (
    "strings"

    tea "github.com/charmbracelet/bubbletea"
    "github.com/charmbracelet/lipgloss"
    "github.com/abhinab-choudhury/portfolio/apps/ssh-server/internal/tui/screens"
)

type Model struct {
    tab int
    width, height int
    active lipgloss.Style
    muted lipgloss.Style
}

func New(width, height int, renderer *lipgloss.Renderer) Model {
    return Model{
        width: width, height: height,
        active: renderer.NewStyle().Bold(true).Foreground(lipgloss.Color("6")),
        muted: renderer.NewStyle().Foreground(lipgloss.Color("8")),
    }
}

func (m Model) Init() tea.Cmd { return nil }

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width, m.height = msg.Width, msg.Height
    case tea.KeyMsg:
        switch msg.String() {
        case "q", "ctrl+c":
            return m, tea.Quit
        case "right", "l", "tab":
            m.tab = (m.tab + 1) % 3
        case "left", "h", "shift+tab":
            m.tab = (m.tab + 2) % 3
        case "1", "2", "3":
            m.tab = int(msg.String()[0] - '1')
        }
    }
    return m, nil
}

func (m Model) View() string {
    if m.width < 60 || m.height < 18 {
        return "Resize to at least 60 x 18.\nPress q to exit."
    }
    tabs := []string{"1 Home", "2 Projects", "3 Contact"}
    for i := range tabs {
        if i == m.tab {
            tabs[i] = m.active.Render(tabs[i])
        }
    }
    pages := []string{screens.Home(), screens.Projects(), screens.Contact()}
    return strings.Join(tabs, "    ") + "\n\n" + pages[m.tab] +
        "\n\n" + m.muted.Render("←/→ or Tab: switch screen • q: quit")
}
```

The three methods are the core of Bubble Tea:

- `Init()` starts optional background work. There is none yet.
- `Update()` receives an event and returns the next state.
- `View()` turns that state into terminal text.

In v1, use a renderer created for the SSH session so styles use the visitor's terminal capabilities. The sample content is deliberately short; add wrapping and a viewport before displaying long content.

## 6. Connect the model to Wish

Replace `internal/infra/ssh/server.go` with:

```go
package ssh

import (
    "fmt"
    "os"
    "time"

    tea "github.com/charmbracelet/bubbletea"
    sshlib "github.com/charmbracelet/ssh"
    "github.com/charmbracelet/wish"
    "github.com/charmbracelet/wish/accesscontrol"
    "github.com/charmbracelet/wish/activeterm"
    wishtea "github.com/charmbracelet/wish/bubbletea"
    "github.com/charmbracelet/wish/logging"

    "github.com/abhinab-choudhury/portfolio/apps/ssh-server/internal/config"
    "github.com/abhinab-choudhury/portfolio/apps/ssh-server/internal/tui"
)

func New(cfg config.Config) (*sshlib.Server, error) {
    if _, err := os.Stat(cfg.HostKeyPath); err != nil {
        return nil, fmt.Errorf("host key: %w", err)
    }
    server, err := wish.NewServer(
        wish.WithAddress(cfg.Address),
        wish.WithHostKeyPath(cfg.HostKeyPath),
        wish.WithMiddleware(
            wishtea.Middleware(func(s sshlib.Session) (tea.Model, []tea.ProgramOption) {
                pty, _, _ := s.Pty()
                model := tui.New(pty.Window.Width, pty.Window.Height, wishtea.MakeRenderer(s))
                return model, []tea.ProgramOption{tea.WithAltScreen()}
            }),
            activeterm.Middleware(),
            accesscontrol.Middleware(),
            logging.Middleware(),
        ),
    )
    if err != nil {
        return nil, err
    }
    server.IdleTimeout = 10 * time.Minute
    server.MaxTimeout = 30 * time.Minute
    return server, nil
}
```

Wish executes this middleware list from last to first: logging, command checks, terminal checks, then the TUI. No authentication callbacks are installed, so this baseline allows guest connections. It gives visitors the application, not an OS shell.

The explicit key check prevents an accidental new server identity if the configured key disappears. The timeouts are fixed for this tutorial; configurable limits are described in [Setup](SETUP.md).

## 7. Start and stop the server

Replace `cmd/portfolio-server/main.go` with:

```go
package main

import (
    "context"
    "errors"
    "log"
    "os"
    "os/signal"
    "syscall"
    "time"

    sshlib "github.com/charmbracelet/ssh"
    "github.com/abhinab-choudhury/portfolio/apps/ssh-server/internal/config"
    sshserver "github.com/abhinab-choudhury/portfolio/apps/ssh-server/internal/infra/ssh"
)

func main() {
    if err := run(); err != nil {
        log.Fatal(err)
    }
}

func run() error {
    cfg := config.Load()
    server, err := sshserver.New(cfg)
    if err != nil {
        return err
    }
    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()
    failures := make(chan error, 1)
    go func() { failures <- server.ListenAndServe() }()
    log.Printf("Starting SSH portfolio on %s", cfg.Address)

    select {
    case err := <-failures:
        if errors.Is(err, sshlib.ErrServerClosed) {
            return nil
        }
        return err
    case <-ctx.Done():
        deadline, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        if err := server.Shutdown(deadline); err != nil {
            _ = server.Close()
            return err
        }
        return nil
    }
}
```

Format and run:

```sh
gofmt -w cmd internal
go mod tidy
go run ./cmd/portfolio-server
```

In a second terminal:

```sh
ssh -p 23234 localhost
```

On the first connection, compare the fingerprint with this command before accepting:

```sh
ssh-keygen -lf .local/ssh_host_ed25519_key.pub
```

**Checkpoint:** switch among all three screens, resize the terminal, and press `q`. Open two sessions and check that they navigate independently. Ctrl+C in the server terminal stops the service.

## 8. Verify your build

```sh
go test ./...
go test -race ./...
go vet ./...
go build -o portfolio-server ./cmd/portfolio-server
```

At this stage, `go test` mostly checks that packages compile because you have not added tests yet. Next, add tests that send key/resize messages to the model and an SSH integration test that requests a PTY and reads the welcome screen. The race detector needs a supported platform and a C compiler.

## 9. Package it with Docker

Create `.dockerignore` in `apps/ssh-server`:

```dockerignore
.local
.env
.git
portfolio-server
```

Replace `deployment/Dockerfile` with:

```dockerfile
FROM golang:1.24.4-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -trimpath -o /out/portfolio-server ./cmd/portfolio-server

FROM alpine:3.22
RUN addgroup -g 10001 app && adduser -D -u 10001 -G app app
COPY --from=build /out/portfolio-server /usr/local/bin/portfolio-server
USER 10001:10001
EXPOSE 23234
ENTRYPOINT ["/usr/local/bin/portfolio-server"]
```

These tags make the example concrete and match your module baseline. Before public deployment, update to supported patched Go/runtime images, scan them, and pin the verified image digests.

Replace `deployment/docker-compose.yml` with:

```yaml
services:
  portfolio:
    build:
      context: ..
      dockerfile: deployment/Dockerfile
    ports:
      - "127.0.0.1:23234:23234"
    environment:
      SSH_LISTEN_ADDR: "0.0.0.0:23234"
      SSH_HOST_KEY_PATH: "/var/lib/ssh-portfolio/ssh_host_ed25519_key"
    volumes:
      - ../.local:/var/lib/ssh-portfolio:ro
    restart: unless-stopped
    stop_grace_period: 10s
    read_only: true
    cap_drop:
      - ALL
    security_opt:
      - no-new-privileges:true
    mem_limit: 128m
    cpus: 1.0
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

For local testing on Linux, run the container as your own UID/GID so it can read your private key without changing its permissions. Create `deployment/compose.local.yml`:

```yaml
services:
  portfolio:
    user: "${LOCAL_UID}:${LOCAL_GID}"
```

Stop the Go server first to free the port. Then:

```sh
LOCAL_UID=$(id -u) LOCAL_GID=$(id -g) docker compose \
  -f deployment/docker-compose.yml \
  -f deployment/compose.local.yml up --build -d
ssh -p 23234 localhost
```

The same host key means the server fingerprint stays the same. The local override is only for development; production should use the fixed container UID.

**Checkpoint:** the app works in Docker and still works after a container restart.

## 10. Deploy on a VPS

Use a Linux VPS with Docker Engine and Compose installed. See [Docker's installation instructions](https://docs.docker.com/engine/install/) for your distribution.

1. Copy or check out the repository on the VPS. Do not copy your local `.env` or private key through Git.
2. Generate a separate production host key in the VPS app's `.local` directory using the command from step 2. Back it up securely.
3. Give UID/GID `10001:10001` ownership of that directory and its keys; keep directory permissions at `700` and private-key permissions at `600`. This matches the image's runtime user. Do not apply this ownership change to your development key directory.
4. Initially publish `23234:23234` instead of the loopback-only mapping. Allow TCP 23234 in the VPS firewall and test `ssh -p 23234 your-server-ip`.
5. Complete the public-deployment checklist below before inviting visitors.
6. For the final command `ssh ssh.yourdomain.com`, first move administrative SSH to a different port or private interface. Verify another admin connection works before changing port 22. Then change the app mapping to `22:23234` and allow TCP 22.
7. Point `ssh.yourdomain.com` at the VPS IP. Use DNS-only if using Cloudflare. Ordinary HTTP reverse proxies do not forward this SSH connection.
8. Run `docker compose -f deployment/docker-compose.yml up --build -d` on the VPS, without the local UID override.
9. Verify the production host-key fingerprint and connect from another machine.

Useful VPS commands, from `apps/ssh-server`:

```sh
docker compose -f deployment/docker-compose.yml ps
docker compose -f deployment/docker-compose.yml logs --tail=100 portfolio
docker compose -f deployment/docker-compose.yml restart portfolio
```

A restart may disconnect existing visitors. Keeping the host key preserves the server identity; it does not preserve live sessions.

### Before public deployment

The tutorial builds the basic experience. Finish these operational pieces before calling it production-ready:

- Add global and per-IP connection/session limits, including handshake deadlines.
- Explicitly reject unsupported SSH requests and test forwarding/subsystem rejection.
- Add a real SSH readiness probe and an external connection monitor.
- Test disconnect cleanup, concurrent sessions, and resource usage under load.
- Keep dependencies and base images patched; review vulnerability scan results.
- Back up the production host key and practice restoring it.

For automated releases, follow [Setup and deployment](SETUP.md): test in CI, publish an immutable image, deploy that image, verify SSH, and retain the previous image for rollback. Avoid building different artifacts separately in staging and production.

## 11. Improve the portfolio one feature at a time

After the basic connection works:

1. Replace hard-coded projects with validated JSON through `internal/infra/data/provider.go`.
2. Add Bubbles v1 list and viewport components for selection and scrolling.
3. Add responsive wrapping, an empty-project state, and readable errors.
4. Add configurable timeouts and session limits to `config.go`.
5. Keep public content immutable and navigation state per session.

Do not add all of these before checking the first working SSH connection. Each small checkpoint makes problems easier to find.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `expected 'package', found 'EOF'` | An empty `.go` file needs a package declaration; see step 2. |
| `connection refused` | Server process, listen address, Docker port mapping, and VPS firewall. |
| `address already in use` | Stop the local Go process before starting Docker on the same port. |
| Host-key file not found | Run from the app directory or set an absolute `SSH_HOST_KEY_PATH`. |
| Host-key permission denied in Docker | Use the local UID override for development; match UID 10001 ownership on the VPS. |
| No interactive terminal | Connect from a terminal, or use `ssh -t -p 23234 localhost`. |
| Host-key mismatch warning | Investigate why the key changed. Only after verifying an intentional local replacement, remove the old entry with `ssh-keygen -R '[localhost]:23234'`. |
| Missing colors | Confirm the session uses `wishtea.MakeRenderer(s)` and the client has a suitable `TERM`. |

## Further reading

- [Wish v1.4.7 SSH/Bubble Tea example](https://github.com/charmbracelet/wish/blob/v1.4.7/examples/bubbletea/main.go)
- [Bubble Tea v1.3.4](https://github.com/charmbracelet/bubbletea/tree/v1.3.4)
- [Lip Gloss v1.1.0](https://github.com/charmbracelet/lipgloss/tree/v1.1.0)
- [Project architecture](ARCHITECTURE.md)
