---
author: shashanth
title: "Polymorphism in Java: Runtime Dispatch, Overloading, and Modern Language Features"
categories: [java, design]
---

# Polymorphism in Java: Runtime Dispatch, Overloading, and Modern Language Features

## Why This Matters

Polymorphism is one of the core mechanisms that keeps Java systems extensible. It allows you to add new behavior with minimal changes to existing code and is foundational to clean APIs, framework integration, and testable architecture.

## Problem Statement

Teams often mix compile-time overloading with runtime overriding, leading to subtle bugs, especially when inheritance, interfaces, and generics are combined.

## Core Concepts

Java uses multiple forms of polymorphism:

- **Subtype polymorphism**: overriding with runtime dispatch
- **Ad-hoc polymorphism**: method overloading at compile time
- **Parametric polymorphism**: generics (`List<T>`, `Repository<T>`)
- **Functional polymorphism**: lambdas via functional interfaces

## How It Works

### Compile-time polymorphism (overloading)

```java
class Logger {
    void log(String msg) { System.out.println("msg: " + msg); }
    void log(Throwable t) { System.out.println("error: " + t.getMessage()); }
}
```

The compiler selects the method using declared argument types.

### Runtime polymorphism (overriding)

```java
class Animal {
    void speak() { System.out.println("..."); }
}

class Dog extends Animal {
    @Override
    void speak() { System.out.println("woof"); }
}

Animal a = new Dog();
a.speak(); // woof
```

The JVM dispatches based on the actual object type at runtime.

### Interface-driven polymorphism

```java
interface PaymentProcessor {
    void pay(long amountInCents);
}

class CardProcessor implements PaymentProcessor {
    public void pay(long amountInCents) { /* card flow */ }
}

class UpiProcessor implements PaymentProcessor {
    public void pay(long amountInCents) { /* upi flow */ }
}
```

Consumers stay stable while implementations vary.

## Example

```java
class CheckoutService {
    private PaymentProcessor processor;

    CheckoutService(PaymentProcessor processor) {
        this.processor = processor;
    }

    void setProcessor(PaymentProcessor processor) {
        this.processor = processor;
    }

    void checkout(long amountInCents) {
        processor.pay(amountInCents);
    }
}
```

This enables runtime strategy changes and easy test doubles.

## Common Pitfalls

- Expecting overloaded methods to dispatch by runtime type.
- Forgetting that `static` methods are hidden, not overridden.
- Misusing inheritance where composition is a better fit.
- Violating substitutability contracts (LSP issues).

## Best Practices

- Program to interfaces, not concrete classes.
- Use `@Override` consistently to catch signature mistakes.
- Keep inheritance shallow and semantic.
- Prefer composition for optional/variable behaviors.
- Combine polymorphism with SOLID for long-term maintainability.

## Advanced Notes

- Java 17+ sealed classes allow controlled polymorphic hierarchies.
- Pattern matching in `switch` can simplify polymorphic branching while preserving exhaustiveness.
- The JVM can optimize virtual calls aggressively; polymorphism does not automatically mean poor performance.

### Dispatch model (high-level)

```mermaid
flowchart LR
  A[Reference Type: PaymentProcessor] --> B{Runtime Object}
  B --> C[CardProcessor.pay]
  B --> D[UpiProcessor.pay]
```

## Key Takeaways

- Overloading is compile-time; overriding is runtime.
- Interface-based polymorphism is the most maintainable default in enterprise Java.
- Good polymorphic design reduces coupling and future refactor risk.
