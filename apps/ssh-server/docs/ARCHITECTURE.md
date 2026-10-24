# Architecture
> go-server 

#### File Structure:

```bash
ssh-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline for building image & rolling out
├── cmd/
│   └── portfolio-server/
│       └── main.go             # Application entrypoint (minimal wiring)
├── deployment/
│   ├── Dockerfile
│   └── docker-compose.yml
├── internal/
│   ├── config/
│   │   └── config.go           # Environment variables & system flag mappings
│   ├── infra/
│   │   ├── ssh/
│   │   │   ├── server.go       # Wish.NewServer setup, middleware attachments
│   │   │   └── middleware.go   # Custom auth, logging, session analytics wrappers
│   │   └── data/
│   │       └── provider.go     # Resolves project/resume content (JSON file or embedded FS)
│   └── tui/
│       ├── model.go            # Top-level Bubble Tea app state orchestrator
│       ├── constants.go        # Shared layout settings, color specs, styling configs
│       ├── components/         # Reusable isolated atomic TUI elements
│       │   ├── list.go         # Project grid selector or generic menu navigators
│       │   └── viewport.go     # Dedicated scrolling container window for bios/readmes
│       └── screens/            # Macro dashboard window components
│           ├── home.go         # Cover landing dashboard view layout
│           ├── projects.go     # Interactive portfolio directory screen
│           └── contact.go      # Links, output instructions, form inputs
├── assets/
│   ├── projects.json           # Your dynamic application portfolio data payload
│   └── keys/                   # Persistent operational SSH host key target mapping
├── go.mod
└── go.sum
```
