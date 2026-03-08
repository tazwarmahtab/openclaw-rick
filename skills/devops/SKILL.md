---
name: devops
description: Build, push, and manage Docker images and self-upgrade the OpenClaw codebase. Use when asked to update, build, deploy, or perform DevOps operations.
---

# DevOps Self-Maintenance Skill

This skill enables the agent to perform self-maintenance operations including building and pushing Docker images, git operations, and system upgrades.

## When to Use

Activate this skill when the user asks for:
- "build and push docker image"
- "update the codebase"
- "self-upgrade"
- "pull latest changes"
- "deploy" or "restart gateway"
- Any docker, git pull, or system maintenance operations

## Core Commands

### Docker Build
```bash
docker build -t your-username/openclaw-rick:latest .
```

### Docker Push
```bash
docker push your-username/openclaw-rick:latest
```

### Docker Build & Push Combined
```bash
docker build -t your-username/openclaw-rick:latest . && docker push your-username/openclaw-rick:latest
```

### Git Operations
```bash
# Pull latest changes
git pull origin main

# Check status
git status

# View recent commits
git log --oneline -5
```

### Restart Gateway
```bash
# If using PM2
pm2 restart openclaw-gateway

# Or via openclaw CLI
openclaw gateway restart --profile dev
```

## Self-Upgrade Workflow

When asked to self-upgrade:

1. **Check for updates**: Run `git fetch origin main && git log HEAD..origin/main --oneline`
2. **Pull changes**: If updates exist, run `git pull origin main`
3. **Update submodules**: Run `git submodule update --init --recursive`
4. **Rebuild if needed**: Run `pnpm install` if package.json changed
5. **Restart gateway**: Run `pm2 restart openclaw-gateway` or `openclaw gateway restart`

## Docker Registry Setup

The agent needs Docker credentials configured. Run once:
```bash
docker login
```

Enter your Docker Hub username and password/token when prompted.

## Important Notes

- **GitHub Actions Bypass**: Since GitHub Actions may be locked due to billing, perform builds locally using Docker instead of relying on CI/CD workflows.
- **Security**: Always confirm with user before running destructive commands like `docker rmi` or force pushes.
- **Approval Mode**: If `tools.exec.ask` is enabled, wait for user approval before executing commands.
