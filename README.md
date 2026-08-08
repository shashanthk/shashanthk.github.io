# Personal Technical Knowledge Base

A minimal, fast, search-first technical knowledge base built with **Astro + Starlight** and hosted on **GitHub Pages**.

## Primary Requirement: Markdown is Source of Truth

To add a new technical note or topic:
1. Create or edit a `.md` file under `src/content/docs/<category>/<file-name>.md`.
2. Push to `main`.
3. GitHub Actions automatically builds and deploys the update to [shashanthk.github.io](https://shashanthk.github.io).

No manual HTML, navigation config, or page creation required.

---

## Technical Domain Structure

```
src/content/docs/
├── index.md                 # Portal homepage
├── java/                    # JVM, Memory Model, Concurrency, Virtual Threads
├── spring-boot/             # Auto-config, Bean Lifecycle, Security, JPA
├── databases/               # B-Trees, Indexing, ACID, Sharding, Replication
├── system-design/           # High-Level Architecture, Load Balancers, Caching
├── distributed-systems/     # CAP/PACELC, Consensus, Distributed Locks
├── devops-cloud/            # Multi-stage Docker, K8s, CI/CD, IaC
├── architecture/            # Clean Architecture, DDD, Microservices
├── security/                # OAuth2, PKCE, JWT, TLS, OWASP
└── interview-prep/          # System Design Framework, Estimations, Cheat Sheets
```

---

## Local Development Commands

Ensure Node.js v20+ is available:

```bash
# Install dependencies
npm ci

# Start local development server (http://localhost:4321)
npm run dev

# Perform production build (generates static site & Pagefind index in dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## Features

- 🔍 **Instant Search**: Pagefind full-text search indexed at build time (<kbd>Ctrl</kbd> + <kbd>K</kbd>).
- 📊 **Mermaid Diagrams**: Native rendering for sequence, flow, and class diagrams inside ```mermaid code blocks.
- 🎨 **Minimal Design**: Focused on zero clutter, high readability, light/dark/system themes, and ultra-fast page loads.
- ⚡ **Zero Client JS Core**: Pure pre-rendered static HTML.
