---
title: CAP Theorem & PACELC Trade-Offs
description: Comparative analysis of Consistency, Availability, Partition Tolerance, and latency trade-offs in distributed systems.
sidebar:
  order: 1
---

The **CAP Theorem** states that a distributed data store can simultaneously guarantee at most 2 out of 3 properties during a network partition:

- **Consistency (C)**: Every read receives the most recent write or an error.
- **Availability (A)**: Every non-failing node returns a non-error response (without guarantee that it contains the most recent write).
- **Partition Tolerance (P)**: System continues operating despite network message drops or delays between nodes.

:::important[Network Partitions are Inevitable]
In real-world networks, network partitions ($P$) **will occur**. Therefore, distributed database design is fundamentally a choice between **CP** (Consistency over Availability) and **AP** (Availability over Consistency).
:::

---

## PACELC Theorem Extension

The **PACELC Theorem** extends CAP by addressing system behavior when there is **NO** network partition:

$$\text{If } \mathbf{P} \text{ (Partition): Choose } \mathbf{A} \text{ vs } \mathbf{C}; \quad \text{Else } \mathbf{E} \text{ (Else): Choose } \mathbf{L} \text{ (Latency) vs } \mathbf{C} \text{ (Consistency)}$$

### Real-World Database Classifications

| Database | PACELC Classification | Behavior During Partition | Behavior During Normal Operation |
| :--- | :--- | :--- | :--- |
| **Apache Cassandra** | **PA/EL** | Chooses Availability over Consistency | Chooses Latency over Consistency |
| **Amazon DynamoDB** | **PA/EL** | Configurable, defaults to Latency/Availability | Low latency eventual consistency |
| **MongoDB** | **PC/EC** | Chooses Consistency over Availability | Chooses Consistency over Latency |
| **Google Spanner** | **PC/EC** | True Time Synchronized CP | Strict serializability consistency |
