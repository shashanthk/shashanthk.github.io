---
title: Relational Database Indexing & Query Optimization
description: Deep dive into B-Tree indexes, Hash indexes, Composite keys, Covering indexes, and EXPLAIN ANALYZE execution plans.
sidebar:
  order: 1
---

Proper database indexing converts $O(N)$ sequential table scans into $O(\log N)$ tree lookups.

## Index Data Structures

| Index Type | Structure | Ideal Use Case | Search Complexity |
| :--- | :--- | :--- | :--- |
| **B-Tree** | Self-balancing search tree | Range queries (`<`, `>`, `BETWEEN`), equality (`=`), prefix matches | $O(\log N)$ |
| **Hash Index** | Direct bucket hash table | Exact equality lookups only (`=`) | $O(1)$ average |
| **GIN (Generalized Inverted)** | Composite inverted index | Full-text search, JSONB array elements in Postgres | Variable |
| **BRIN (Block Range)** | Min/Max metadata per block range | Time-series data, append-only logs | Low space overhead |

---

## Composite Indexing & Leftmost Prefix Rule

When creating a multi-column index on `(user_id, status, created_at)`:

```sql title="schema_indexes.sql"
CREATE INDEX idx_orders_user_status_date ON orders(user_id, status, created_at);
```

### Valid Index Usage:
- `WHERE user_id = 10` $\rightarrow$ **Uses Index**
- `WHERE user_id = 10 AND status = 'COMPLETED'` $\rightarrow$ **Uses Index**
- `WHERE user_id = 10 AND status = 'COMPLETED' AND created_at >= '2026-01-01'` $\rightarrow$ **Uses Index**

### Invalid / Partial Index Usage:
- `WHERE status = 'COMPLETED'` $\rightarrow$ **Full Table Scan** (Violates leftmost prefix rule)
- `WHERE created_at >= '2026-01-01'` $\rightarrow$ **Full Table Scan**

:::note[Covering Index Optimization]
A **Covering Index** includes all columns requested by a `SELECT` clause in the index leaf nodes, enabling an **Index Only Scan** without reading the table heap.
:::

```sql title="explain_query.sql"
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, status 
FROM orders 
WHERE user_id = 1042 AND status = 'PENDING';
```
