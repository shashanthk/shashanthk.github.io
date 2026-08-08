---
title: OAuth 2.0 & JWT Authentication Security
description: Comprehensive breakdown of Authorization Code Flow with PKCE, JWT signature validation, and token security best practices.
sidebar:
  order: 1
---

Modern API security relies on **OAuth 2.0** for delegated authorization and **OIDC (OpenID Connect)** for authentication.

## Authorization Code Flow with PKCE

```mermaid
sequenceDiagram
    participant User as End User Browser
    participant SPA as Single Page App / Native
    participant AuthServer as OAuth2 Auth Server
    participant API as Resource Server (API)

    SPA->>SPA: Generate Code Verifier & Code Challenge
    SPA->>AuthServer: 1. Redirect /authorize (with Code Challenge)
    User->>AuthServer: 2. Authenticate & Grant Consent
    AuthServer-->>SPA: 3. Return Authorization Code
    SPA->>AuthServer: 4. Post /token (Auth Code + Code Verifier)
    AuthServer-->>SPA: 5. Return Access Token & Refresh Token
    SPA->>API: 6. Request API (Bearer Access Token)
    API-->>SPA: 7. Validated Response
```

---

## JWT Claims Structure

A JSON Web Token consists of three base64url-encoded parts separated by dots (`.`): `Header.Payload.Signature`

```json title="jwt_payload.json"
{
  "iss": "https://auth.company.com/",
  "sub": "user_984214",
  "aud": "https://api.company.com",
  "exp": 1770542400,
  "iat": 1770538800,
  "roles": ["ROLE_USER", "ROLE_ADMIN"]
}
```

:::danger[Security Vulnerability Warning]
Never rely solely on client-side decoding. The Resource Server **must** cryptographically verify the signature against the Auth Server's JWKS (JSON Web Key Set) public key and validate `exp`, `iss`, and `aud` claims before granting access.
:::
