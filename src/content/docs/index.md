---
title: Engineering Knowledge Base
description: Technical documentation manual covering Java, Spring Boot, Databases, System Design, Distributed Systems, DevOps, Architecture, and Security.
---

Welcome to the engineering documentation manual. This portal serves as a searchable technical knowledge base compiled directly from Markdown notes.

:::note[Architecture Guarantee]
This portal is built directly from raw Markdown files (`src/content/docs/**/*.md`). Every document is indexed at build-time for instant static full-text search.
:::

## Technical Documentation Index

### Core Platforms & Frameworks

- **[Java Core](/java/01-java-memory-model/)**
  - JVM Runtime Data Areas (Eden, Survivor, Tenured, Metaspace)
  - Garbage Collectors (G1, ZGC, Shenandoah) & Memory Allocation
  - Memory Visibility & Happens-Before Guarantees (JMM)
  - Concurrency, Thread Pools, and Virtual Threads (Project Loom)

- **[Spring Boot](/spring-boot/01-spring-bean-lifecycle/)**
  - ApplicationContext & IoC Container Lifecycle
  - Bean Instantiation, Dependency Injection & `BeanPostProcessor`
  - Spring Security Architecture & Filter Chains
  - Data JPA Optimization, Batching & Connection Pool Sizing

### Data Architecture & Storage

- **[Databases & Storage](/databases/01-indexing-and-query-optimization/)**
  - B-Tree, Hash, GIN, and BRIN Index Structures
  - Composite Indexing & Leftmost Prefix Enforcement
  - Relational Transaction Isolation Levels (Read Committed, Repeatable Read, Serializable)
  - Query Execution Plan Analysis (`EXPLAIN ANALYZE`)

### Distributed Systems & Infrastructure

- **[System Design](/system-design/01-high-level-design-fundamentals/)**
  - Vertical vs. Horizontal Scaling Principles
  - Consistent Hashing & Ring Token Allocation
  - Caching Strategies (Cache-Aside, Write-Through, Write-Back)
  - Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window)

- **[Distributed Systems](/distributed-systems/01-cap-theorem-and-pacelc/)**
  - CAP Theorem & PACELC Trade-Off Matrix
  - Distributed Consensus Protocols (Raft, Paxos)
  - Distributed Locking (Redlock, Zookeeper Ephemeral Sequential Nodes)
  - Saga Pattern & Eventual Consistency Models

- **[DevOps & Cloud](/devops-cloud/01-containerization-docker-best-practices/)**
  - Multi-Stage Docker Builds & Image Hardening
  - Non-Root Container Runtime Privileges
  - Kubernetes Pod Lifecycle & Deployment Strategies
  - Infrastructure as Code (Terraform) & CI/CD Pipelines

### Software Architecture & Security

- **[Software Architecture](/architecture/01-clean-architecture-principles/)**
  - Clean Architecture & Onion Layer Separation
  - Domain-Driven Design (Bounded Contexts, Aggregates, Entities)
  - Event-Driven Architecture & Message Queue Patterns
  - Microservices vs. Modular Monolith Trade-Offs

- **[Security & Authentication](/security/01-oauth2-jwt-authentication/)**
  - OAuth 2.0 Authorization Code Flow with PKCE
  - JSON Web Token (JWT) Signature Verification & Key Rotation
  - TLS/SSL Handshake & Cipher Suite Negotiation
  - OWASP Top 10 Vulnerabilities & Defense-in-Depth

### Career & Interviews

- **[Interview Preparation](/interview-prep/01-system-design-interview-framework/)**
  - 4-Step System Design Interview Framework
  - Back-of-the-Envelope Estimation Rules & Latency Numbers
  - High-Throughput System Design Templates

---

## Global Navigation & Keyboard Shortcuts

- **Search**: Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd>) anywhere on the site to trigger instant full-text search across all documents and code snippets.
- **Sidebar**: Use the left navigation panel to browse categories hierarchically.
- **Table of Contents**: Use the right-hand panel to jump to specific section headings within any page.
- **Theme**: Toggle between Light, Dark, or System mode using the theme selector in the top header.
