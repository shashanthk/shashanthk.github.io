---
author: shashanth
title: "REST API guidelines"
categories: [rest, guidelines]
---

REST (Representational State Transfer) is an architectural style for designing networked applications. Although REST is not a strict standard but rather a set of constraints and best practices, following robust REST API guidelines helps ensure that your API is intuitive, scalable, and reliable. Below is an in-depth exploration of REST API guidelines grouped into several key categories:

---

## 1. Fundamental Principles of REST

### a. Client-Server Architecture
- **Separation of Concerns:** The client is responsible for the user interface and user experience, while the server manages the backend data and logic. This decoupling allows each side to evolve independently.
- **Stateless Communication:** Every client request must contain all the information necessary to understand the request. The server should not rely on stored context (session information) between requests.

### b. Uniform Interface
- **Resource Identification:** Every resource should be uniquely addressable using a URI (Uniform Resource Identifier). For instance, `/users/123` clearly indicates a user resource.
- **Manipulation through Representations:** Clients interact with resources by transferring representations (typically JSON or XML). Changes are made on these representations, and the server applies them to the underlying resource.
- **Self-descriptive Messages:** Each message should include enough context (such as metadata in HTTP headers) so that the receiver can process the message without needing additional context.
- **Hypermedia as the Engine of Application State (HATEOAS):** Ideally, responses include hypermedia links to related resources or allowed actions, guiding the client dynamically through valid state transitions.

### c. Cacheability
- **Improved Efficiency:** Responses should be explicitly defined as cacheable or non-cacheable to reduce the number of interactions between client and server.
- **Appropriate Headers:** Use HTTP headers like `Cache-Control`, `ETag`, and `Last-Modified` to manage caching effectively.

### d. Layered System
- **Scalability and Security:** An API can have intermediary layers (such as proxies or gateways) that perform tasks like load balancing or authentication without affecting the overall communication between client and server.
- **Interoperability:** Each layer should be independent, allowing for the addition of services without requiring clients to alter their behavior.

### e. Code-On-Demand (Optional)
- **Extensibility:** Some REST architectures allow the server to temporarily extend client functionality by transferring executable code (e.g., JavaScript), though this is optional and less common in many API designs.

---

## 2. Resource Design and URI Guidelines

### a. Use Nouns, Not Verbs
- **Resource Focused:** URIs should represent resources (e.g., `/orders`, `/customers/456`) rather than actions (avoid `/getOrders` or `/updateUser`).

### b. Consistent Naming Conventions
- **Plural vs. Singular:** Most guidelines suggest using plural nouns for resources (`/products`) to indicate a collection. If you refer to a single item, it might be `/products/{productId}`.
- **Lowercase Letters:** Use lowercase letters and hyphens (`-`) to improve readability, e.g., `/customer-orders` rather than `/CustomerOrders`.

### c. Hierarchical Organization
- **Nested Resources:** For related resources, consider nesting URIs. For example, `/users/123/orders` can indicate the orders for a specific user.
- **Avoid Deep Nesting:** Limit nesting to two levels to avoid overly complex URIs.

### d. Versioning
- **URI Versioning:** Include version numbers in the path (e.g., `/v1/products` or `/api/v2/users`) to facilitate backward compatibility.
- **Header-based Versioning:** Alternatively, use custom HTTP headers or content negotiation to manage API versions.

---

## 3. HTTP Methods and Their Semantics

### a. GET
- **Read-Only:** Retrieve data without modifying state. GET requests should be safe (no side-effects) and idempotent.
- **Caching:** Encourage caching as GET requests often return the same data if the resource has not changed.

### b. POST
- **Create Resource:** Typically used to create a new resource. POST is not idempotent—repeating a POST may result in duplicate resources.
- **Complex Processing:** Utilize POST when the operation involves processing that is more complex than simple creation or updating.

### c. PUT
- **Replace Resource:** Generally used to update an existing resource or create one if it does not exist (upsert). PUT requests are idempotent.
- **Complete Replacement:** Often assumed to represent the entire resource, so partial updates may be better suited to PATCH.

### d. PATCH
- **Partial Update:** Modify part of an existing resource. PATCH is idempotent if properly implemented and reflects the differences rather than a full object replacement.
  
### e. DELETE
- **Remove Resource:** Intended to delete a resource. DELETE operations should be idempotent—repeated calls should yield the same result (e.g., resource already removed).

---

## 4. HTTP Status Codes

### a. Informational (1xx)
- Rarely used in REST, but can indicate preliminary responses.

### b. Success (2xx)
- **200 OK:** Standard response for successful operations.
- **201 Created:** Indicates resource creation with a `Location` header pointing to the newly created resource.
- **204 No Content:** Used when the action is successful but there is no content to return (often after a DELETE).

### c. Client Errors (4xx)
- **400 Bad Request:** The request cannot be processed due to client error.
- **401 Unauthorized / 403 Forbidden:** Authentication or authorization issues.
- **404 Not Found:** The requested resource does not exist.
- **409 Conflict:** Indicates a request conflict, such as duplicate data upon creation.

### d. Server Errors (5xx)
- **500 Internal Server Error:** Generic error message when the server fails to fulfill a valid request.
- **503 Service Unavailable:** The server is currently unable to handle the request, often due to overload or maintenance.

---

## 5. Request and Response Design

### a. Standard Data Formats
- **JSON First:** Use JSON for payloads due to its ubiquity and ease of use. XML can be supported when necessary.
- **Consistent Structure:** Define consistent structures for both success and error responses. For errors, include standardized fields like `errorCode`, `message`, and optionally `details`.

### b. Filtering, Sorting, and Pagination
- **Query Parameters:** Enable filtering (e.g., `/orders?status=shipped`), sorting (e.g., `/products?sort=price_asc`), and pagination using parameters like `page`, `limit`, or `offset`.
- **Hypermedia for Pagination:** Where possible, include links to next, previous, or specific pages to facilitate navigation.

### c. Media Types and Content Negotiation
- **MIME Types:** Ensure clients and servers agree on the data format by using `Content-Type` and `Accept` headers. Consider using MIME types like `application/json`.
- **API Versioning Through Headers:** In some cases, clients and servers negotiate API versions via headers instead of URI versioning.

---

## 6. Error Handling and Reporting

### a. Clear Error Responses
- **Error Codes:** Use standard HTTP status codes coupled with application-specific error codes.
- **Descriptive Messages:** Provide clear, non-ambiguous error messages that help the client understand what went wrong and, where applicable, how to remedy it.
- **Error Object Structure:** A typical error response might include:
  - `code`: Application-specific error code.
  - `message`: Brief description of the error.
  - `details`: (Optional) Additional context or links to documentation.

### b. Consistency Across Endpoints
- **Uniform Error Format:** All endpoints should adhere to a consistent error format to aid in client-side error handling and user experience.

---

## 7. Security Best Practices

### a. Use HTTPS
- **Secure Communication:** Always serve APIs over HTTPS to encrypt data in transit, preventing interception and tampering.

### b. Authentication and Authorization
- **Token-Based Authentication:** Use standard methods like OAuth2, JWT (JSON Web Tokens), or API keys to verify client identities.
- **Granular Permissions:** Implement role-based access control (RBAC) or similar mechanisms to restrict resource access appropriately.

### c. Rate Limiting and Throttling
- **Prevent Abuse:** Introduce rate limiting to protect the API from excessive requests that might lead to denial of service or degradation of service.
- **HTTP Headers:** Inform clients about rate limits using headers like `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `Retry-After` upon exceeding limits.

### d. CORS (Cross-Origin Resource Sharing)
- **Controlled Access:** Configure CORS policies to restrict which domains can access your API, helping prevent unauthorized cross-origin requests.

---

## 8. Documentation and Discoverability

### a. API Documentation
- **Interactive Documentation:** Tools like Swagger (OpenAPI) provide interactive API documentation that aids developers in understanding how to use your API.
- **Examples and Use Cases:** Include detailed examples for each endpoint, including sample requests and responses.

### b. Self-Descriptive Messages
- **Hypermedia:** Adhering to HATEOAS can help clients discover available actions dynamically, reducing the need for out-of-band documentation for navigation.

### c. Versioning and Deprecation Policies
- **Communication:** Clearly document API versions and provide guidelines for deprecation schedules. Encourage clients to upgrade well before older versions are sunset.

---

## 9. Additional Considerations

### a. Idempotency
- **Safe Operations:** Design update and delete operations to be idempotent, meaning that multiple identical requests produce the same result.
- **Client Guidance:** Document when an operation is idempotent (e.g., PUT or DELETE) so clients can design their error-handling and retry strategies appropriately.

### b. Logging and Monitoring
- **Traceability:** Implement robust logging of API requests and responses to aid debugging, performance monitoring, and security auditing.
- **Metrics:** Use monitoring tools to track error rates, latency, and other critical performance metrics.

### c. Testing and Validation
- **Automated Testing:** Utilize unit tests, integration tests, and contract tests to verify API behavior.
- **Schema Validation:** Employ JSON schema validation or similar mechanisms to ensure incoming and outgoing data adhere to expected formats.

---

## Conclusion

Adhering to REST API guidelines ensures the following:
- **Simplicity and Consistency:** Clear, predictable API behavior that meets developer expectations.
- **Scalability:** A design that can evolve and scale as usage grows or requirements change.
- **Maintainability:** Well-structured endpoints, consistent error handling, and thorough documentation make long-term maintenance more manageable.
- **Security and Performance:** Best practices around security, caching, and rate limiting protect both the API and its consumers.
