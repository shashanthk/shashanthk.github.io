---
title: Production Docker Containerization & Security Best Practices
description: Guidelines for building minimal, hardened, production-ready container images with multi-stage builds.
sidebar:
  order: 1
---

Creating secure container images requires minimizing attack surface area, optimizing layer caching, and enforcing non-root runtime privileges.

## Multi-Stage Build Pattern

```dockerfile title="Dockerfile" ins={16,21}
# Stage 1: Build & Compile Environment
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Layer Caching Optimization: Copy build configuration first
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -B

# Copy source code and package application JAR
COPY src ./src
RUN ./mvnw package -DskipTests

# Stage 2: Minimal Runtime Environment
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Security: Create non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy compiled executable JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar
USER appuser

EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseZGC", "-jar", "app.jar"]
```

---

## Core Security Rules

1. **Never Run as Root**: Always specify an explicit `USER` directive in the Dockerfile.
2. **Use Minimal Base Images**: Prefer `distroless` or `alpine` over full OS distributions to remove unnecessary OS utilities (`curl`, `netcat`, `bash`).
3. **Pin Base Image Hashes**: Use SHA256 image digests (`FROM eclipse-temurin@sha256:...`) to avoid unexpected upstream parent image regressions.
4. **Scan Dependencies**: Integrate trivy or grype vulnerability scanners in CI pipelines.
