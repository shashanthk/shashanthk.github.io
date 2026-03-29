---
author: shashanth
title: "SSH Keys for GitHub and Bitbucket: Secure Setup for Multi-Account Workflows"
categories: [git, github, bitbucket]
---

# SSH Keys for GitHub and Bitbucket: Secure Setup for Multi-Account Workflows

## Why This Matters

SSH keys replace password-based Git authentication with asymmetric cryptography, which is safer and more automation-friendly. They also let you isolate personal, work, and CI identities with separate keys.

## Problem Statement

Developers frequently struggle with:

- Repeated credential prompts
- Multi-account conflicts across Git hosts
- Push failures due to incorrect key selection
- Port 22 network restrictions in some environments

## Core Concepts

- **Private key**: stays on your machine (never share).
- **Public key**: uploaded to Git provider account.
- **SSH config aliases**: map each host/account to a specific key.
- **SSH agent**: keeps keys loaded in memory for seamless auth.

## How It Works

1. Create the `~/.ssh` directory if missing.
2. Generate separate Ed25519 keypairs for each account/provider.
3. Define host aliases in `~/.ssh/config` so Git uses the right key.
4. Upload public keys to GitHub/Bitbucket.
5. Verify with test SSH connections and alias-based clone URLs.

## Example

### 1) Generate keys

```bash
mkdir -p ~/.ssh
cd ~/.ssh
ssh-keygen -t ed25519 -f id_github_personal -C "your_email@example.com"
ssh-keygen -t ed25519 -f id_bitbucket_work -C "your_work_email@example.com"
```

### 2) Configure host aliases

```sshconfig
Host user-github
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_github_personal

Host user-bitbucket
  HostName bitbucket.org
  User git
  IdentityFile ~/.ssh/id_bitbucket_work
```

### 3) Upload public keys

- Copy `~/.ssh/id_github_personal.pub` into GitHub SSH keys.
- Copy `~/.ssh/id_bitbucket_work.pub` into Bitbucket SSH keys.

### 4) Clone with aliases

```bash
git clone git@user-github:your-username/your-repo.git
git clone git@user-bitbucket:your-workspace/your-repo.git
```

### 5) Verify connectivity

```bash
ssh -T git@user-github
ssh -T git@user-bitbucket
```

## Common Pitfalls

- Using default `github.com` URLs after creating aliases.
- Forgetting to set restrictive permissions (`chmod 600 ~/.ssh/*`).
- Overwriting one account key with another.
- Loading the wrong identity in long-lived terminal sessions.

## Best Practices

- Use one key per identity (personal/work/CI).
- Add passphrases to private keys.
- Rotate and revoke keys periodically.
- Keep `~/.ssh/config` documented with comments.
- Store emergency recovery access in your password manager.

## Advanced Notes

### If port 22 is blocked

Use SSH over port 443 for GitHub:

```sshconfig
Host user-github
  HostName ssh.github.com
  Port 443
  User git
  IdentityFile ~/.ssh/id_github_personal
```

### Optional: make key usage explicit per repository

```bash
git config core.sshCommand "ssh -i ~/.ssh/id_github_personal"
```

## Key Takeaways

- SSH keys are the secure default for Git workflows.
- Host aliases solve multi-account and multi-provider confusion.
- A small, consistent SSH setup prevents most day-to-day Git auth issues.
