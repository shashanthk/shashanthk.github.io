---
author: shashanth
title: "Polymorphism in Java"
categories: [java, design]
---

## 1  What “polymorphism” really means

> **Poly‑** (“many”) + **‑morph** (“forms”) → *One name, many concrete behaviors.*

In Java this is embodied in **subtype polymorphism** (method overriding) and **ad‑hoc polymorphism** (method overloading, operator coercion). Java also has **parametric polymorphism** (`List<T>`), though it’s usually discussed under the heading “generics.”

---

## 2  Static (compile‑time) vs. dynamic (run‑time) polymorphism

| Dimension | Compile‑time (a.k.a. *static*, *ad‑hoc*) | Run‑time (a.k.a. *dynamic*, *subtype*) |
|-----------|-----------------------------------------|-----------------------------------------|
| **Mechanism** | Method overloading, compile‑time coercion | Method overriding (virtual dispatch) |
| **Binding time** | Resolved by *javac* using declared parameter types | Resolved by the JVM using the *actual* object’s class at the call site |
| **Key caveat** | Decision is **fixed** in bytecode; changing argument’s *runtime* class does not alter target method | Works only on instance methods; `static` and `private` methods are *not* polymorphic |

### 2.1 Method overloading (static)

```java
void log(String msg) { ... }
void log(Throwable t) { ... }

// call site
log("Error");         // picks log(String)
log(new Exception()); // picks log(Throwable)
```

If you up‑cast the second call (`log((Object) new Exception())`) the compiler now sees `Object`, so overload resolution may pick a different method or fail—proof that the decision is compile‑time only.

### 2.2 Method overriding (dynamic)

```java
class Animal { 

  void speak() { 
    System.out.println("..."); 
  } 
}

class Dog extends Animal { 

  @Override void speak() { 
    System.out.println("woof"); 
  } 
}

Animal a = new Dog();
a.speak();             // prints "woof" — chosen at run‑time
```

The bytecode contains one `invokevirtual Animal.speak()V`; at run‑time the JVM consults the *virtual method table* (v‑table) for `Dog`.

---

## 3  Language rules every Java dev should know

| Rule | Quick rationale |
|------|-----------------|
| **Only instance methods participate.** `static`, `private`, and constructors are resolved lexically. | They aren’t stored in v‑tables. |
| **Return types may be covariant.** Child can narrow the return type when overriding. | Enables fluent APIs without unsafe casts. |
| **Parameters are *invariant*.** Signature must match exactly except for covariant return. | Prevents the Liskov Substitution Principle (LSP) from being broken at compile time. |
| **Fields are *hidden*, not overridden.** Accessed by reference type. | Java’s field look‑up is lexical, not virtual. |
| **`final` methods/classes disable overriding.** | JVM can de‑virtualize for performance and safety. |

---

## 4  Polymorphism beyond classes

### 4.1 Interfaces & Java 8 default methods  
Interfaces give multiple‑inheritance‑of‑type. Since Java 8, `default` lets you ship behavior too:

```java
interface Flyable {
    
    default void takeOff() { 
      System.out.println("Taking off"); 
    }

    void land();  // still abstract
}
```

`takeOff()` is virtual; the implementing class can override it.

### 4.2 Generics (parametric)  
`List<Integer>` and `List<String>` are two *instantiations* of the same generic type. Type erasure removes the `<T>` at run‑time, so this is compile‑time polymorphism, but wildcards (`? extends Number`) enable polymorphic *substitutions* across instantiations.

### 4.3 Functional polymorphism (lambdas & method references)  
A lambda is an instance of a *functional interface*. The exact `invoke` target is carried by the object, so calling `Supplier<T>.get()` is a virtual dispatch to the lambda’s hidden class.

### 4.4 Pattern matching & sealed classes (Java 17 +)  
`sealed` hierarchies and `instanceof switch` provide *exhaustive* polymorphic dispatch reminiscent of algebraic data types:

```java
sealed interface Expr permits Lit, Add {}
record Lit(int v) implements Expr {}
record Add(Expr l, Expr r) implements Expr {}

int eval(Expr e) {
    return switch (e) {
        case Lit(int v) -> v;
        case Add(var l, var r) -> eval(l) + eval(r);
    };
}
```

---

## 5  JVM implementation in brief

1. **Every class** has a v‑table with pointers to its concrete methods.
2. For each overridden method the pointer in the child’s table replaces the parent’s.
3. `invokevirtual` loads the object reference, reads its class pointer, indexes into the v‑table, and jumps.
4. Modern JITs aggressively *inline* and *de‑virtualize* when the call site proves monomorphic.

---

## 6  Design patterns & idioms powered by polymorphism

| Pattern | How polymorphism is exploited |
|---------|------------------------------|
| **Strategy** | Swap concrete algorithm objects at run‑time. |
| **Template Method** | Superclass defines skeleton; subclasses override steps. |
| **Visitor** | Double dispatch in languages without multimethods. |
| **Decorator** | Wrap another object that shares the same interface. |
| **Factory Method / Abstract Factory** | Return abstract types; callers code to an interface. |

---

## 7  Practical benefits

* **Extensibility** – add new behavior by dropping in a subtype.  
* **Loose coupling** – higher‑level code depends on an interface, not a concrete class.  
* **Testability** – inject mocks/stubs.  
* **Readability** – conceptual “is‑a” relationships map to the type system.

---

## 8  Common pitfalls

1. **Accidental overloading instead of overriding**  
   Misspelling parameter list or forgetting `@Override` creates a *new* method.
2. **Excessive inheritance**  
   Prefer composition + interfaces (`ItemRenderer` rather than `AbstractItemRendererAdapterBase`).
3. **Leaky abstractions from type erasure**  
   Generic arrays aren’t allowed; `List<T>[]` triggers `unchecked` warnings.
4. **Performance paranoia**  
   Dynamic dispatch is cheap; premature *final* or `static` harms design flexibility more than it helps.

---

## 9  Recommended best practices

* **Always add `@Override`** – compiler catches mismatch.  
* **Program to interfaces** – depend on the abstraction.  
* **Favor composition over inheritance** – use inheritance only for true “is‑a.”  
* **Keep hierarchies shallow** – two or three levels max is usually enough.  
* **Document contracts** – specify which methods subclasses must override and invariants they must honor.  
* **Leverage sealed classes** when the set of subtypes is finite and controlled.  
* **Use default methods** sparingly; avoid the “God interface” anti‑pattern.

---

## 10  End‑to‑end example

```java
interface PaymentProcessor {
    Receipt process(Payment p);
}

class StripeProcessor implements PaymentProcessor {
    public Receipt process(Payment p) { /* Stripe API */ }
}

class PaypalProcessor implements PaymentProcessor {
    public Receipt process(Payment p) { /* PayPal API */ }
}

class CheckoutService {

    private final PaymentProcessor gateway;

    CheckoutService(PaymentProcessor gateway) { 
      this.gateway = gateway; 
    }

    Receipt checkout(Payment p) { 
      return gateway.process(p); 
    }
}

public class Demo {

    public static void main(String[] args) {
        PaymentProcessor gateway = new StripeProcessor(); // can swap at run‑time
        CheckoutService svc = new CheckoutService(gateway);
        svc.checkout(new Payment("1999"));
    }
}
```

`CheckoutService` never cares which concrete gateway it talks to—that’s pure runtime polymorphism enabling dependency inversion, test doubles, and plug‑and‑play integrations.

---

### Key takeaway

> **Polymorphism is the beating heart of object‑oriented design in Java.**  
> Understand the compiler’s overload resolution, the JVM’s v‑table dispatch, and modern features like lambdas and sealed types, and you’ll wield a toolset that keeps code *flexible*, *extensible*, and *maintainable*.
