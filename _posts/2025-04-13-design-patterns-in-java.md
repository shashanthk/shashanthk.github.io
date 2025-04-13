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

### 1.2 Factory Method
- **Purpose**: Defines an interface for creating an object but allows subclasses to alter the type of objects that will be created.
- **Problem**: You don’t know what exact type of object to create.
- **Structure**: Abstract class/interface with a `createProduct()` method.
- **Use When**:
  - A class can't anticipate the class of objects it must create.
  - You want to delegate the responsibility of instantiation to subclasses.

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

### 1.5 Prototype
- **Purpose**: Create new objects by copying an existing object.
- **Problem**: Object creation is costly, and you want to avoid instantiating repeatedly.
- **Structure**: Prototype interface with a `clone()` method.
- **Use When**:
  - You want to avoid building a hierarchy of factories.
  - You need object copies, not just references.

---

## **2. Structural Design Patterns**
These patterns focus on how classes and objects are composed to form larger structures.

### 2.1 Adapter (Wrapper)
- **Purpose**: Converts one interface into another interface that a client expects.
- **Problem**: Incompatible interfaces need to work together.
- **Structure**: Adapter implements the target interface and delegates calls to the adaptee.
- **Use When**:
  - You want to reuse an existing class with an incompatible interface.

### 2.2 Bridge
- **Purpose**: Decouples an abstraction from its implementation.
- **Problem**: You want to vary both abstraction and implementation independently.
- **Structure**: Interface (abstraction) + implementation interface.
- **Use When**:
  - You want to avoid a permanent binding between abstraction and implementation.

### 2.3 Composite
- **Purpose**: Treats individual objects and compositions of objects uniformly.
- **Problem**: Need to deal with tree structures (like GUI components or file systems).
- **Structure**: Component interface with `add()`, `remove()` methods.
- **Use When**:
  - You need to work with hierarchies of objects.

### 2.4 Decorator
- **Purpose**: Attach additional responsibilities to an object dynamically.
- **Problem**: You want to add behavior without modifying the class.
- **Structure**: Decorator class implements the same interface as the component.
- **Use When**:
  - You want to add functionality at runtime.

### 2.5 Facade
- **Purpose**: Provides a simplified interface to a complex subsystem.
- **Problem**: You want to hide the complexity of subsystems from clients.
- **Structure**: Facade delegates requests to appropriate subsystem classes.
- **Use When**:
  - You want to provide a single entry point to a system.

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

---

## **3. Behavioral Design Patterns**
These patterns focus on communication between objects.

### 3.1 Chain of Responsibility
- **Purpose**: Passes a request along a chain of handlers.
- **Problem**: Multiple objects can handle a request.
- **Structure**: Each handler decides either to process the request or pass it on.
- **Use When**:
  - You want to decouple sender and receiver of requests.

### 3.2 Command
- **Purpose**: Encapsulates a request as an object.
- **Problem**: You want to parameterize objects with operations.
- **Structure**: Command object with `execute()` method.
- **Use When**:
  - You need undo/redo, queuing, logging of requests.

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

### 3.10 Template Method
- **Purpose**: Defines the skeleton of an algorithm, deferring steps to subclasses.
- **Problem**: You want to keep invariant parts of an algorithm and allow variation.
- **Structure**: Abstract class with concrete and abstract methods.
- **Use When**:
  - Subclasses need to extend specific steps of an algorithm.

### 3.11 Visitor
- **Purpose**: Represents an operation to be performed on elements of an object structure.
- **Problem**: You need to perform operations on object elements without changing their classes.
- **Structure**: Visitor interface + `accept(visitor)` method in elements.
- **Use When**:
  - You need to add behaviors to a class hierarchy without modifying it.

---
