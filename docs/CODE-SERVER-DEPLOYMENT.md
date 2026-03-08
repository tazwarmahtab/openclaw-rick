# OpenClaw Code-Server Deployment Guide

## 24/7 Self-Evolving Architecture

This guide sets up OpenClaw on a code-server (VS Code in browser) with Telegram control, allowing the agent to:
- Execute terminal commands via Telegram
- Upgrade its own codebase
- Run continuously 24/7
- Self-heal and self-evolve

---

## 1. Prerequisites

### Server Requirements
- Linux server (Ubuntu 22.04+ recommended)
- Node.js 22+ installed
- At least 2GB RAM
- Open ports: 80/443 (code-server), 19001 (OpenClaw gateway)

### Accounts Needed
- Telegram Bot Token (from @BotFather)
- GitHub account with your forked repos

---

## 2. Code-Server Installation

```bash
# Install code-server
curl -fsSL https://code-server.dev/install.sh | sh

# Start code-server (will create config on first run)
code-server

# Edit config to allow external access
nano ~/.config/code-server/config.yaml
```

### Config Changes
```yaml
bind-addr: 0.0.0.0:8080
auth: password
password: YOUR_SECURE_PASSWORD
cert: false  # Set to true if you have SSL certs
```

### Enable as Systemd Service
```bash
sudo systemctl enable --now code-server@$USER
sudo systemctl status code-server@$USER
```

---

## 3. Clone OpenClaw-Rick Repository

```bash
# In code-server terminal
cd ~
git clone --recurse-submodules https://github.com/tazwarmahtab/openclaw-rick.git
cd openclaw-rick/openclaw

# Initialize submodule if needed
git submodule update --init --recursive

# Install dependencies
pnpm install
```

---

## 4. Configure OpenClaw Profile

```bash
# Create dev profile
openclaw config init --profile dev

# Set gateway configuration
openclaw config set gateway.mode local --profile dev
openclaw config set gateway.bind 0.0.0.0 --profile dev  # Listen on all interfaces
openclaw config set gateway.port 19001 --profile dev
```

---

## 5. Enable Self-Evolution Tools

### Critical: Enable exec, write, and apply_patch

```bash
# Enable terminal command execution
openclaw config set tools.exec.enabled true --profile dev

# Enable file writing
openclaw config set tools.write.enabled true --profile dev

# Enable patch application
openclaw config set tools.apply_patch.enabled true --profile dev

# Optional: Require approval for dangerous commands
openclaw config set tools.exec.ask true --profile dev
```

### Security Recommendation
```bash
# Set approval mode for destructive commands
openclaw config set tools.exec.approvalMode ask --profile dev

# Whitelist safe commands (optional)
openclaw config set tools.exec.whitelist '["git pull","git status","npm install","pnpm install","openclaw gateway restart"]' --profile dev
```

---

## 6. Telegram Configuration

### Set Bot Token
```bash
# Set Telegram bot token (from @BotFather)
openclaw config set channels.telegram.token $TELEGRAM_BOT_TOKEN --profile dev

# Or set in environment
export TELEGRAM_BOT_TOKEN="your-bot-token-here"
```

### Configure Group Policy
```bash
# Allow messages from your Telegram group
openclaw config set channels.telegram.groupPolicy open --profile dev

# Or specify allowed users/groups
openclaw config set channels.telegram.allowFrom '["your-telegram-user-id"]' --profile dev
```

### Pairing (CRITICAL SECURITY)
```bash
# Start gateway first
openclaw gateway run --profile dev &

# In another terminal, get pairing code
openclaw pairing generate --profile dev

# Send the code to your Telegram bot, then approve:
openclaw pairing approve telegram YOUR_CODE --profile dev
```

---

## 7. NVIDIA NIM Configuration

```bash
# Set NVIDIA API key
openclaw config set providers.nvidia.apiKey $NVIDIA_API_KEY --profile dev
openclaw config set providers.nvidia.baseUrl "https://integrate.api.nvidia.com/v1" --profile dev

# Or in environment
export NVIDIA_API_KEY="nvapi-your-key-here"
```

---

## 8. 24/7 Persistence with PM2

### Install PM2
```bash
sudo npm install -g pm2
```

### Create PM2 Ecosystem File

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'openclaw-gateway',
    script: 'openclaw',
    args: 'gateway run --profile dev --bind 0.0.0.0 --port 19001',
    cwd: '/home/youruser/openclaw-rick/openclaw',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
      NVIDIA_API_KEY: process.env.NVIDIA_API_KEY
    },
    error_file: '/var/log/openclaw/error.log',
    out_file: '/var/log/openclaw/out.log',
    log_file: '/var/log/openclaw/combined.log',
    time: true
  }]
};
```

### Start with PM2
```bash
# Create log directory
sudo mkdir -p /var/log/openclaw
sudo chown $USER:$USER /var/log/openclaw

# Start OpenClaw
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Enable PM2 startup script
pm2 startup
# Run the command it outputs
```

### PM2 Commands
```bash
pm2 status                    # Check status
pm2 logs openclaw-gateway     # View logs
pm2 restart openclaw-gateway  # Restart
pm2 stop openclaw-gateway     # Stop
pm2 monit                     # Live monitoring
```

---

## 9. Alternative: Systemd Service

### Create Service File
```bash
sudo nano /etc/systemd/system/openclaw-gateway.service
```

```ini
[Unit]
Description=OpenClaw Gateway Service
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/home/youruser/openclaw-rick/openclaw
Environment="TELEGRAM_BOT_TOKEN=your-token"
Environment="NVIDIA_API_KEY=your-key"
ExecStart=/usr/local/bin/openclaw gateway run --profile dev --bind 0.0.0.0 --port 19001
Restart=always
RestartSec=10
StandardOutput=append:/var/log/openclaw/out.log
StandardError=append:/var/log/openclaw/error.log

[Install]
WantedBy=multi-user.target
```

### Enable Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable openclaw-gateway
sudo systemctl start openclaw-gateway
sudo systemctl status openclaw-gateway
```

---

## 10. Self-Maintenance Skill

Create a skill for Telegram `/upgrade` command:

```bash
mkdir -p ~/.openclaw-dev/skills
nano ~/.openclaw-dev/skills/self-maintenance.md
```

See the Self-Maintenance Skill documentation for the full skill definition.

---

## 11. Telegram Commands Reference

Once configured, send these to your Telegram bot:

### System Commands
```
/status          - Check gateway and system health
/restart         - Restart the gateway service
/logs            - Show recent logs
```

### Upgrade Commands
```
/upgrade         - Pull latest changes and restart
/check-updates   - Check for available updates
/rollback        - Rollback to previous version
```

### Development Commands
```
/build           - Run npm run build
/test            - Run tests
/install         - Run npm install
```

### Natural Language Examples
```
"Check the current version, pull the latest changes from main branch, and restart the gateway"
"Run npm install if package.json changed"
"Show me the last 50 lines of the error log"
```

---

## 12. Security Checklist

- [ ] Telegram pairing completed
- [ ] Only your Telegram ID in allowFrom
- [ ] Strong password for code-server
- [ ] SSL enabled for code-server (recommended)
- [ ] Firewall configured (only allow necessary ports)
- [ ] Approval mode enabled for exec tool
- [ ] Regular backups of ~/.openclaw-dev/
- [ ] API keys stored in environment variables, not files

---

## 13. Monitoring & Alerts

### Health Check Script
```bash
#!/bin/bash
# health-check.sh
if ! pm2 pid openclaw-gateway &>/dev/null; then
  echo "OpenClaw gateway is DOWN!"
  # Send Telegram alert via API
  curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
    -d chat_id=YOUR_CHAT_ID \
    -d text="⚠️ OpenClaw gateway is DOWN! Attempting restart..."
  pm2 restart openclaw-gateway
fi
```

### Cron Job for Monitoring
```bash
# Check every 5 minutes
*/5 * * * * /home/youruser/scripts/health-check.sh
```

---

## 14. Troubleshooting

### Gateway Won't Start
```bash
# Check logs
pm2 logs openclaw-gateway --lines 100

# Verify config
openclaw config list --profile dev

# Check port availability
lsof -i :19001
```

### Telegram Not Responding
```bash
# Verify token
openclaw config get channels.telegram.token --profile dev

# Check pairing status
openclaw pairing list --profile dev

# Restart gateway
pm2 restart openclaw-gateway
```

### Submodule Issues
```bash
cd ~/openclaw-rick
git submodule update --init --recursive --remote
```

---

## 15. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CODE-SERVER (VPS)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    OPENCLAW GATEWAY                        │  │
│  │                    (PM2/Systemd)                           │  │
│  │                    Port: 19001                             │  │
│  │                                                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │  │
│  │  │   ECC       │  │   Rick      │  │   NVIDIA    │       │  │
│  │  │ Integration │  │   Agent     │  │   NIM       │       │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘       │  │
│  │                                                            │  │
│  │  Tools: exec, write, apply_patch (ENABLED)                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ▲                                   │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    TELEGRAM CHANNEL                        │  │
│  │                                                            │  │
│  │  Commands: /upgrade, /status, /restart, /logs            │  │
│  │  Natural: "Pull latest and restart"                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ▲                                   │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    GIT REPOSITORY                          │  │
│  │  github.com/tazwarmahtab/openclaw-rick                    │  │
│  │  (Self-updating via git pull)                             │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Start Commands

```bash
# One-time setup
git clone --recurse-submodules https://github.com/tazwarmahtab/openclaw-rick.git
cd openclaw-rick/openclaw && pnpm install
openclaw config init --profile dev
openclaw config set tools.exec.enabled true --profile dev
openclaw config set tools.write.enabled true --profile dev
openclaw config set tools.apply_patch.enabled true --profile dev
openclaw config set channels.telegram.token $TELEGRAM_BOT_TOKEN --profile dev

# Start gateway
pm2 start ecosystem.config.js
pm2 save && pm2 startup

# Pair Telegram
openclaw pairing generate --profile dev
# Send code to bot, then:
openclaw pairing approve telegram YOUR_CODE --profile dev
```

---

Your OpenClaw system is now running 24/7 with Telegram control and self-evolution capabilities!
