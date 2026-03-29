---
author: shashanth
title: "SOLID Principles in Java: Build Maintainable, Extensible Systems"
categories: [java]
---

# SOLID Principles in Java: Build Maintainable, Extensible Systems

## Why This Matters

As Java codebases grow, the biggest risk is rarely syntax errors—it is design drift. Classes become overloaded, dependencies harden, and small feature requests trigger risky refactors. SOLID helps prevent that by giving teams a shared vocabulary for maintainable object-oriented design.

## Problem Statement

Without design boundaries, Java services often accumulate:

- Large classes doing unrelated work
- Tight coupling to concrete implementations
- Fragile inheritance hierarchies
- Interfaces that force unused methods
- Components that are hard to test in isolation

SOLID provides a practical design framework to reduce those failure modes.

## Core Concepts

SOLID is an acronym:

1. **S**ingle Responsibility Principle (SRP)
2. **O**pen/Closed Principle (OCP)
3. **L**iskov Substitution Principle (LSP)
4. **I**nterface Segregation Principle (ISP)
5. **D**ependency Inversion Principle (DIP)

## How It Works

### 1) Single Responsibility Principle (SRP)
A class should have one reason to change.

- Keep domain logic separate from presentation, persistence, and integration concerns.
- Smaller responsibilities improve testability and change isolation.

```java
public class Invoice {
    private final List<Item> items;

    public Invoice(List<Item> items) {
        this.items = items;
    }

    public double total() {
        return items.stream().mapToDouble(Item::price).sum();
    }
}

public class InvoicePrinter {
    public void print(Invoice invoice) {
        System.out.println("Total: " + invoice.total());
    }
}
```

### 2) Open/Closed Principle (OCP)
Software should be open for extension, closed for modification.

- Add new behavior by introducing new implementations.
- Avoid repeatedly editing stable, already-tested logic.

```java
public interface Shape {
    double area();
}

public final class Circle implements Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
    public double area() { return Math.PI * radius * radius; }
}

public final class Rectangle implements Shape {
    private final double w, h;
    public Rectangle(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}
```

### 3) Liskov Substitution Principle (LSP)
Subtypes must be usable anywhere the base type is expected.

- Avoid inheritance when child behavior changes parent contracts.
- Favor composition or parallel abstractions when semantics differ.

```java
public interface Shape {
    int area();
}

public final class RectangleShape implements Shape {
    private final int width, height;
    public RectangleShape(int width, int height) {
        this.width = width; this.height = height;
    }
    public int area() { return width * height; }
}

public final class SquareShape implements Shape {
    private final int side;
    public SquareShape(int side) { this.side = side; }
    public int area() { return side * side; }
}
```

### 4) Interface Segregation Principle (ISP)
Clients should not depend on methods they do not use.

- Split large interfaces into focused contracts.
- Keep implementations lean and intention-revealing.

```java
public interface Printable {
    void print(Document doc);
}

public interface Scannable {
    Document scan();
}

public final class OfficePrinter implements Printable, Scannable {
    public void print(Document doc) { /* ... */ }
    public Document scan() { return new Document(); }
}
```

### 5) Dependency Inversion Principle (DIP)
High-level modules should depend on abstractions, not low-level details.

- Inject interfaces rather than constructing dependencies directly.
- Improves testing, replaceability, and modularity.

```java
public interface MessageSender {
    void send(String recipient, String message);
}

public final class EmailSender implements MessageSender {
    public void send(String recipient, String message) {
        // SMTP integration
    }
}

public final class NotificationService {
    private final MessageSender sender;

    public NotificationService(MessageSender sender) {
        this.sender = sender;
    }

    public void notifyUser(String user, String msg) {
        sender.send(user, msg);
    }
}
```

## Example

A practical way to apply SOLID during refactoring:

1. Extract side effects from core domain classes (**SRP**).
2. Replace conditional logic with strategy interfaces (**OCP**).
3. Remove “is-a” relationships that violate behavior guarantees (**LSP**).
4. Break broad service interfaces into role-specific contracts (**ISP**).
5. Inject dependencies through constructors and interfaces (**DIP**).

## Common Pitfalls

- Treating SOLID as dogma and over-abstracting simple flows.
- Creating interfaces for classes that have no variation pressure.
- Using inheritance for code reuse when behavior semantics differ.
- Splitting interfaces so much that cohesion is lost.

## Best Practices

- Start with concrete implementations; extract abstractions when a second use case appears.
- Review pull requests for “reason to change” violations.
- Keep constructor injection as the default dependency model.
- Add tests around contracts (not only around concrete classes).

## Advanced Notes

- SOLID works best with complementary practices: immutable value objects, clear module boundaries, and explicit domain language.
- In Spring Boot systems, SOLID maps naturally to layered architecture, but layers are not a substitute for proper object design.
- For pattern-level design built on SOLID principles, see the companion article on Java design patterns.

## Key Takeaways

- SOLID is a practical maintainability tool, not a theoretical checklist.
- The principles are most valuable when used together.
- Better boundaries lead to safer change, easier testing, and cleaner collaboration.
