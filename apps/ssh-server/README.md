# SSH Portfolio

An interactive portfolio served over SSH, inspired by terminal.shop. Built with Go, Wish, Bubble Tea, and Lip Gloss.

**Status:** scaffold only. Application code, content, and Docker configuration are not implemented yet.

## Planned experience

- Home, Projects, and Contact screens.
- Keyboard navigation and layouts that adapt to terminal size.
- Public, read-only access without creating an account.

## Development

Use the Go version declared in `go.mod` or a compatible newer version. The module currently uses the Charm v1 libraries; any v2 migration must update Wish, Bubble Tea, Lip Gloss, and compatible components together.

Once the application is implemented, run from this directory:

```sh
go run ./cmd/portfolio-server
```

Connect from another terminal:

```sh
ssh -p 23234 localhost
```

## Documentation

- [Step-by-step tutorial](docs/TUTORIAL.md): build your first working SSH portfolio and deploy it.

- [Architecture](docs/ARCHITECTURE.md): responsibilities, session model, and content flow.
- [Setup and deployment](docs/SETUP.md): configuration, VPS hosting, releases, and recovery.
