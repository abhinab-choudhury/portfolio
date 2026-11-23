# Setup and deployment

This is the deployment strategy for the first release. The application, Dockerfile, Compose file, and CI workflow still need implementation; commands below describe the intended workflow.

## Local configuration

Run Go commands from `apps/ssh-server`. Implement these environment variables in `internal/config/config.go` and document them in `.env.template`:

| Variable | Local default | Purpose |
| --- | --- | --- |
| `SSH_LISTEN_ADDR` | `127.0.0.1:23234` | Listener address; use `0.0.0.0:23234` inside Docker |
| `SSH_HOST_KEY_PATH` | `.local/ssh_host_ed25519_key` | Persistent SSH server identity |
| `SSH_IDLE_TIMEOUT` | `10m` | Disconnect inactive sessions |
| `SSH_MAX_SESSIONS` | `100` | Initial global session limit; tune after load testing |
| `LOG_LEVEL` | `info` | Structured logging verbosity |

Read environment variables directly; a `.env` file is not automatically loaded by Go. Keep `.env`, `.local/`, private keys, and build outputs out of Git and the Docker build context. Provision a host key before production startup and restrict its permissions to the runtime user.

After implementation:

```sh
go mod download
go run ./cmd/portfolio-server
# In another terminal:
ssh -p 23234 localhost
```

## Hosting topology

Use one Linux VPS with a public IP, Docker Engine, and Compose. Run one non-root app container listening on port `23234`, with host port `22` published to it. Mount a persistent host-key directory at `/var/lib/ssh-portfolio` and set `SSH_HOST_KEY_PATH` accordingly.

Visitors connect with `ssh ssh.yourdomain.com`. Point that hostname's A record to the VPS; add AAAA only when IPv6 routing and firewall rules are configured. For Cloudflare DNS, select DNS-only: the ordinary HTTP proxy does not carry SSH.

Before using host port 22, configure administrative SSH on a separate port or private interface, update firewall rules, and verify a second administrative connection. Keep the original connection open until that succeeds. Restrict administrative access and expose only the required public app port. Check the effective Docker and provider firewall rules from outside the VPS.

## Container requirements

- Multi-stage build with a pinned Go builder compatible with `go.mod`.
- Minimal runtime image and an unprivileged application user.
- Build context rooted at `apps/ssh-server`, with an explicit `.dockerignore`.
- Bundled content, no secrets or private host keys in image layers.
- Persistent host-key mount with ownership matching the runtime user.
- Restart policy, memory/CPU limits, bounded logs, and a shutdown grace period.
- A readiness check that confirms the service can accept SSH connections.

The intended Compose command, run from `apps/ssh-server`, is:

```sh
docker compose -f deployment/docker-compose.yml up -d
```

If Compose builds locally, set its build context to `..` and Dockerfile to `deployment/Dockerfile`. Production should pull an immutable image produced by CI instead.

## Release pipeline

Create a workflow in the repository root `.github/workflows/`, filtered to SSH application and workflow changes:

1. Run formatting checks, unit/integration tests, race checks, vet, and build.
2. Build and publish a container tagged with the Git commit SHA; deploy by digest where possible.
3. Deploy to staging and verify a real SSH connection with a PTY and initial screen output.
4. Pull the same image on the production VPS and replace the service. Serialize deployments.
5. Verify the public endpoint with its expected host key; roll back to the previous image if verification fails.

Store registry and deployment credentials in CI secrets. Pin the VPS host key for CI SSH connections; do not disable host-key verification. Keep production host keys on the VPS or in an appropriate secret store, never in the repository.

## Operations and recovery

A single-container restart can disconnect active visitors. Use bounded graceful shutdown and document this expected behavior. Multiple replicas and TCP load balancing can be introduced if availability requirements grow.

Monitor process restarts, active sessions, rejected connections, memory, and SSH handshake failures. Back up the host key securely and test restoration. There is no database backup requirement while content is bundled in the image.

For rollback, restore the previous image reference and run Compose again without replacing the key volume. For a VPS rebuild, restore the same host key, deploy the known-good image, and verify the endpoint before switching DNS. Publish the public host-key fingerprint through a trusted channel so visitors can verify it.

## References

- [Wish documentation](https://github.com/charmbracelet/wish)
- [Docker port publishing](https://docs.docker.com/engine/network/port-publishing/)
- [Cloudflare proxy limitations](https://developers.cloudflare.com/dns/proxy-status/limitations/)
