---
layout: post
title: "Design patterns in Java"
categories: java
---

Design patterns are proven solutions to recurring software design problems. They offer templates for solving issues in object-oriented design, allowing developers to write flexible, reusable, and maintainable code.

Below is an **in-depth list of core design patterns**, grouped into three main categories: **Creational, Structural, and Behavioral**. Each pattern includes **definition, problem it solves, structure, and when to use it**.

---

## **1. Creational Design Patterns**
These patterns abstract the instantiation process, making the system independent of how objects are created.

### 1.1 Singleton
- **Purpose**: Ensures a class has only one instance and provides a global point of access.
- **Problem**: When only one instance of a class is needed across the system (e.g., logging, configuration).
- **Implementation**: Private constructor, static instance, global access method.
- **Use When**:
  - One and only one object is required.
  - The object consumes too many resources to create multiple instances.
- [**Example**](#1-singleton-pattern)

### 1.2 Factory Method
- **Purpose**: Defines an interface for creating an object but allows subclasses to alter the type of objects that will be created.
- **Problem**: You don’t know what exact type of object to create.
- **Structure**: Abstract class/interface with a `createProduct()` method.
- **Use When**:
  - A class can't anticipate the class of objects it must create.
  - You want to delegate the responsibility of instantiation to subclasses.
- [**Example**](#2-factory-method-pattern)

### 1.3 Abstract Factory
- **Purpose**: Produces families of related or dependent objects without specifying their concrete classes.
- **Problem**: You need to ensure that related objects are used together (e.g., GUI themes: buttons + scrollbars).
- **Structure**: Interface for creating related objects (factories).
- **Use When**:
  - You want to provide a library of products without exposing implementation.
  - You need to enforce product consistency.

### 1.4 Builder
- **Purpose**: Separate the construction of a complex object from its representation.
- **Problem**: When a class has too many constructor parameters.
- **Structure**: A `Builder` class with step-by-step methods to construct the object.
- **Use When**:
  - You need to construct different representations of an object.
  - Object construction is complex (e.g., immutable objects, nested properties).
- [**Example**](#3-builder-pattern)

### 1.5 Prototype
- **Purpose**: Create new objects by copying an existing object.
- **Problem**: Object creation is costly, and you want to avoid instantiating repeatedly.
- **Structure**: Prototype interface with a `clone()` method.
- **Use When**:
  - You want to avoid building a hierarchy of factories.
  - You need object copies, not just references.
- [**Example**](#3-builder-pattern)

---

## **2. Structural Design Patterns**
These patterns focus on how classes and objects are composed to form larger structures.

### 2.1 Adapter (Wrapper)
- **Purpose**: Converts one interface into another interface that a client expects.
- **Problem**: Incompatible interfaces need to work together.
- **Structure**: Adapter implements the target interface and delegates calls to the adaptee.
- **Use When**:
  - You want to reuse an existing class with an incompatible interface.
- [**Example**](#21-adapter-wrapper)

### 2.2 Bridge
- **Purpose**: Decouples an abstraction from its implementation.
- **Problem**: You want to vary both abstraction and implementation independently.
- **Structure**: Interface (abstraction) + implementation interface.
- **Use When**:
  - You want to avoid a permanent binding between abstraction and implementation.
- [**Example**](#3-builder-pattern)

### 2.3 Composite
- **Purpose**: Treats individual objects and compositions of objects uniformly.
- **Problem**: Need to deal with tree structures (like GUI components or file systems).
- **Structure**: Component interface with `add()`, `remove()` methods.
- **Use When**:
  - You need to work with hierarchies of objects.
- [**Example**](#8-command-pattern)

### 2.4 Decorator
- **Purpose**: Attach additional responsibilities to an object dynamically.
- **Problem**: You want to add behavior without modifying the class.
- **Structure**: Decorator class implements the same interface as the component.
- **Use When**:
  - You want to add functionality at runtime.
- [**Example**](#10-decorator-pattern)

### 2.5 Facade
- **Purpose**: Provides a simplified interface to a complex subsystem.
- **Problem**: You want to hide the complexity of subsystems from clients.
- **Structure**: Facade delegates requests to appropriate subsystem classes.
- **Use When**:
  - You want to provide a single entry point to a system.
- [**Example**](#11-facade-pattern)

### 2.6 Flyweight
- **Purpose**: Reduces memory usage by sharing as much data as possible.
- **Problem**: Many similar objects cause memory issues.
- **Structure**: Flyweight factory + shared and unshared states.
- **Use When**:
  - You have a large number of similar objects.

### 2.7 Proxy
- **Purpose**: Provides a surrogate or placeholder for another object.
- **Problem**: You need to control access to the original object.
- **Structure**: Proxy implements the same interface as the real subject.
- **Use When**:
  - You want to add access control, lazy loading, or logging.
- [**Example**](#7-proxy-pattern)
---

## **3. Behavioral Design Patterns**
These patterns focus on communication between objects.

### 3.1 Chain of Responsibility
- **Purpose**: Passes a request along a chain of handlers.
- **Problem**: Multiple objects can handle a request.
- **Structure**: Each handler decides either to process the request or pass it on.
- **Use When**:
  - You want to decouple sender and receiver of requests.
- [**Example**](#9-chain-of-responsibility-pattern)

### 3.2 Command
- **Purpose**: Encapsulates a request as an object.
- **Problem**: You want to parameterize objects with operations.
- **Structure**: Command object with `execute()` method.
- **Use When**:
  - You need undo/redo, queuing, logging of requests.
- [**Example**](#8-command-pattern)

### 3.3 Interpreter
- **Purpose**: Given a language, define a representation and interpreter.
- **Problem**: You want to interpret sentences in a domain-specific language.
- **Structure**: Expression interface with `interpret()` method.
- **Use When**:
  - You need to evaluate language grammar or rules.

### 3.4 Iterator
- **Purpose**: Access elements of a collection sequentially without exposing internal structure.
- **Problem**: Need to traverse complex data structures.
- **Structure**: Iterator object with `hasNext()` and `next()` methods.
- **Use When**:
  - You want uniform traversal for different data structures.

### 3.5 Mediator
- **Purpose**: Defines an object that coordinates communication between objects.
- **Problem**: Reduce chaotic dependencies between objects.
- **Structure**: Mediator interface with colleagues.
- **Use When**:
  - Objects communicate in complex ways (chat room, air traffic control).

### 3.6 Memento
- **Purpose**: Captures and restores an object's internal state.
- **Problem**: Implement undo mechanisms without exposing internal details.
- **Structure**: Originator, Memento, Caretaker.
- **Use When**:
  - You want to implement rollback or undo.

### 3.7 Observer
- **Purpose**: Defines a one-to-many dependency between objects.
- **Problem**: When one object changes, others need to be notified.
- **Structure**: Subject maintains a list of observers.
- **Use When**:
  - You need a publish-subscribe mechanism (event handling).
- [**Example**](#6-observer-pattern)

### 3.8 State
- **Purpose**: Allows an object to alter its behavior when its internal state changes.
- **Problem**: Complex conditional logic depending on state.
- **Structure**: Context delegates behavior to state classes.
- **Use When**:
  - Object behavior varies based on internal state.

### 3.9 Strategy
- **Purpose**: Defines a family of algorithms and makes them interchangeable.
- **Problem**: Multiple ways to perform a task (e.g., sorting).
- **Structure**: Context + Strategy interface.
- **Use When**:
  - You want to choose an algorithm at runtime.
- [**Example**](#4-strategy-pattern)

### 3.10 Template Method
- **Purpose**: Defines the skeleton of an algorithm, deferring steps to subclasses.
- **Problem**: You want to keep invariant parts of an algorithm and allow variation.
- **Structure**: Abstract class with concrete and abstract methods.
- **Use When**:
  - Subclasses need to extend specific steps of an algorithm.
- [**Example**](#5-template-method-pattern)

### 3.11 Visitor
- **Purpose**: Represents an operation to be performed on elements of an object structure.
- **Problem**: You need to perform operations on object elements without changing their classes.
- **Structure**: Visitor interface + `accept(visitor)` method in elements.
- **Use When**:
  - You need to add behaviors to a class hierarchy without modifying it.

---
<br>
Here's a **Java standalone version** of real-world examples for each design pattern—no Spring Boot, just core Java, so you can easily run them from a `main()` method or in a Java playground.

---

### 1. **Singleton Pattern**
```java
public class Logger {
    private static Logger instance;

    private Logger() {}

    public static Logger getInstance() {
        if (instance == null)
            instance = new Logger();
        return instance;
    }

    public void log(String msg) {
        System.out.println("Log: " + msg);
    }
}
```

---

### 2. **Factory Method Pattern**
```java
interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class NotificationFactory {
    public static Notification create(String type) {
        return switch (type.toLowerCase()) {
            case "email" -> new EmailNotification();
            case "sms" -> new SmsNotification();
            default -> throw new IllegalArgumentException("Invalid type");
        };
    }
}
```

---

### 3. **Builder Pattern**
```java
class User {
    private final String name;
    private final int age;

    public static class Builder {
        private String name;
        private int age;

        public Builder name(String val) {
            name = val;
            return this;
        }

        public Builder age(int val) {
            age = val;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    public String toString() {
        return name + " (" + age + ")";
    }
}
```

---

### 4. **Strategy Pattern**
```java
interface PaymentStrategy {
    void pay(double amount);
}

class PayPal implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using PayPal.");
    }
}

class CreditCard implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using Credit Card.");
    }
}

class Checkout {
    private PaymentStrategy strategy;

    public Checkout(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void process(double amount) {
        strategy.pay(amount);
    }
}
```

---

### 5. **Template Method Pattern**
```java
abstract class DataProcessor {
    public final void process() {
        readData();
        processData();
        saveData();
    }

    abstract void readData();
    abstract void processData();

    void saveData() {
        System.out.println("Saving to disk...");
    }
}

class CSVProcessor extends DataProcessor {
    void readData() {
        System.out.println("Reading CSV...");
    }

    void processData() {
        System.out.println("Processing CSV...");
    }
}
```

---

### 6. **Observer Pattern**
```java
interface Observer {
    void update(String message);
}

class EmailSubscriber implements Observer {
    public void update(String message) {
        System.out.println("Email received: " + message);
    }
}

class NewsPublisher {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer o) {
        observers.add(o);
    }

    public void notifyAllObservers(String news) {
        for (Observer o : observers) {
            o.update(news);
        }
    }
}
```

---

### 7. **Proxy Pattern**
```java
interface Image {
    void display();
}

class RealImage implements Image {
    private final String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading " + filename);
    }

    public void display() {
        System.out.println("Displaying " + filename);
    }
}

class ProxyImage implements Image {
    private RealImage realImage;
    private final String filename;

    public ProxyImage(String filename) {
        this.filename = filename;
    }

    public void display() {
        if (realImage == null)
            realImage = new RealImage(filename);
        realImage.display();
    }
}
```

---

### 8. **Command Pattern**
```java
interface Command {
    void execute();
}

class LightOnCommand implements Command {
    public void execute() {
        System.out.println("Light turned ON");
    }
}

class RemoteControl {
    private Command command;

    public RemoteControl(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}
```

---

### 9. **Chain of Responsibility Pattern**
```java
abstract class Handler {
    protected Handler next;

    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public abstract void handle(String request);
}

class AuthHandler extends Handler {
    public void handle(String request) {
        if (request.equals("auth")) {
            System.out.println("Handled Auth");
        } else if (next != null) {
            next.handle(request);
        }
    }
}

class LogHandler extends Handler {
    public void handle(String request) {
        System.out.println("Logged request: " + request);
        if (next != null) next.handle(request);
    }
}
```

---

### 10. **Decorator Pattern**
```java
interface Coffee {
    String getDescription();
    double cost();
}

class SimpleCoffee implements Coffee {
    public String getDescription() { return "Simple Coffee"; }
    public double cost() { return 2.0; }
}

class MilkDecorator implements Coffee {
    private final Coffee coffee;

    public MilkDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    public String getDescription() { return coffee.getDescription() + ", Milk"; }
    public double cost() { return coffee.cost() + 0.5; }
}
```

---

### 11. **Facade Pattern**
```java
class CPU {
    void freeze() { System.out.println("CPU freeze"); }
    void execute() { System.out.println("CPU execute"); }
}

class Memory {
    void load(String position, byte[] data) {
        System.out.println("Memory loaded at " + position);
    }
}

class ComputerFacade {
    private final CPU cpu = new CPU();
    private final Memory memory = new Memory();

    public void start() {
        cpu.freeze();
        memory.load("0x00", new byte[]{});
        cpu.execute();
    }
}
```

---
