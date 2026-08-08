---
title: System Design Fundamentals & Scalability Principles
description: Core principles for designing scalable, resilient systems including load balancing, caching strategies, rate limiting, and consistent hashing.
sidebar:
  order: 1
---

Designing web-scale architectures requires balancing availability, latency, data consistency, and operational complexity.

## Scalable Architecture Pattern

```mermaid
graph LR
    Client[Mobile / Web Client] --> DNS[Route 53 DNS]
    DNS --> CDN[Cloudflare CDN]
    CDN --> LB[Application Load Balancer]
    LB --> App1[App Instance 1]
    LB --> App2[App Instance 2]
    App1 --> Cache[(Redis Cache Cluster)]
    App2 --> Cache
    App1 --> PrimaryDB[(Primary DB - Writes)]
    App2 --> ReplicaDB[(Read Replicas)]
    PrimaryDB -. Async Replication .-> ReplicaDB
```

---

## Key Design Patterns

### 1. Consistent Hashing
Used in distributed caching (e.g. Memcached, Redis Cluster) and Cassandra to minimize key reshuffling when nodes join or leave the ring:

$$\text{Hash Slot} = \text{hash}(\text{Key}) \pmod{2^{32}}$$

- **Virtual Nodes**: Assign multiple tokens/ring slots to physical nodes to prevent hot-spotting and ensure uniform load distribution.

### 2. Caching Strategies

- **Cache-Aside (Lazy Loading)**: App reads from cache; on miss, reads from DB and updates cache.
- **Write-Through**: App writes to cache; cache synchronously writes to DB.
- **Write-Back (Write-Behind)**: App writes to cache; cache asynchronously batches writes to DB.

:::caution[Cache Stampede / Thundering Herd]
When a hot cache key expires, thousands of concurrent requests miss cache simultaneously and overwhelm the primary database. Mitigate with **Mutex Locks** or **Probabilistic Early Expiration (XFetch)**.
:::
