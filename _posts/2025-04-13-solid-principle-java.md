---
author: shashanth
title: "The SOLID principles in Java"
categories: [java]
---

The SOLID principles form a set of guidelines that help developers create software that is easy to maintain, extend, and refactor. They stress modularity, clarity, and separation of concerns. Below is an in-depth explanation of each principle using Java examples.

---

## 1. Single Responsibility Principle (SRP)

**Definition:**  
A class should have only one reason to change. In other words, every class should have only one responsibility or job. This reduces complexity and makes each part of your code easier to understand, test, and maintain.

**Explanation:**  
- **Responsibility Separation:** When a class handles multiple tasks (such as processing business logic and managing I/O concerns like logging or display), changes in one responsibility may affect the other unexpectedly.
- **Maintainability:** If each class does one thing, then developers know exactly where to look when a change is needed.

**Java Example:**  
Imagine an invoicing system. Without SRP, you might mix business logic with output formatting, but using SRP you would separate these concerns.

```java
// Business Logic: Responsible only for invoice data and computations.
public class Invoice {
    private List<Item> items;
    private Customer customer;
    
    public Invoice(Customer customer, List<Item> items) {
        this.customer = customer;
        this.items = items;
    }
    
    public double calculateTotal() {
        return items.stream().mapToDouble(Item::getPrice).sum();
    }
    
    // Getters and additional business-related methods...
}

// Separate Responsibility: Responsible for presenting or printing an invoice.
public class InvoicePrinter {
    public void print(Invoice invoice) {
        System.out.println("Invoice for: " + invoice.getCustomer().getName());
        invoice.getItems().forEach(item -> 
            System.out.println(item.getDescription() + " - $" + item.getPrice()));
        System.out.println("Total: $" + invoice.calculateTotal());
    }
}
```

*In this example, `Invoice` is solely focused on business logic, while `InvoicePrinter` deals with output formatting. If the printing logic changes, only `InvoicePrinter` needs to be updated.*

---

## 2. Open/Closed Principle (OCP)

**Definition:**  
Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. That means you should be able to add new functionality without altering existing code.

**Explanation:**  
- **Extension over Modification:** Using abstract classes or interfaces allows your code to be extended with new behaviors while keeping the existing tested code intact.
- **Stability:** Once tested and deployed code remains unmodified, minimizing the risk of introducing new bugs.

**Java Example:**  
Consider a scenario where you need to compute areas for different shapes. By creating an abstract `Shape` class or an interface, you can add new shapes without changing the area calculator.

```java
// Open for extension: Shape interface.
public interface Shape {
    double area();
}

// Concrete implementation for a Circle.
public class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

// Concrete implementation for a Rectangle.
public class Rectangle implements Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
}

// A class that uses the Shape interface.
public class AreaCalculator {
    public double totalArea(List<Shape> shapes) {
        return shapes.stream().mapToDouble(Shape::area).sum();
    }
}
```

*If you need to add a new shape (say, a Triangle), you simply implement the `Shape` interface and add your new class. The calculator remains unchanged.*

---

## 3. Liskov Substitution Principle (LSP)

**Definition:**  
Subtypes should be substitutable for their base types without affecting the correctness of the program. In simple terms, if `S` is a subtype of `T`, then objects of type `T` should be replaceable with objects of type `S` without altering any desirable properties.

**Explanation:**  
- **Behavioral Compatibility:** Overriding methods in subclasses should not violate the expectations set by the base class’s contract.
- **Preconditions and Postconditions:** Subclasses should not strengthen preconditions or weaken postconditions compared to the parent class.

**Java Example – The Rectangle/Square Problem:**  

Consider a common mistake where a `Square` is made a subclass of `Rectangle`. Although a square is a kind of rectangle geometrically, the implementation might violate LSP if the subclass alters expected behavior.

*Problematic design:*

```java
// Base class: Rectangle
public class Rectangle {
    protected int width;
    protected int height;
    
    public void setWidth(int width) {
        this.width = width;
    }
    
    public void setHeight(int height) {
        this.height = height;
    }
    
    public int getArea() {
        return width * height;
    }
}

// Subclass: Square
public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;
    }
    
    @Override
    public void setHeight(int height) {
        this.height = height;
        this.width = height;
    }
}
```

*Issue:* If code that works with `Rectangle` sets width and height independently, substituting a `Square` will break the assumptions—changes in one dimension will unexpectedly affect the other.

**Proper Approach:**  
Instead of forcing a square into a rectangle hierarchy, model them separately. One way is to define a more abstract interface for shapes with an area calculation:

```java
public interface Shape {
    int getArea();
}

public class RectangleShape implements Shape {
    private int width;
    private int height;
    
    public RectangleShape(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public int getArea() {
        return width * height;
    }
}

public class SquareShape implements Shape {
    private int side;
    
    public SquareShape(int side) {
        this.side = side;
    }
    
    @Override
    public int getArea() {
        return side * side;
    }
}
```

*Now both `RectangleShape` and `SquareShape` implement the same contract without misusing inheritance, ensuring that substitutability holds.*

---

## 4. Interface Segregation Principle (ISP)

**Definition:**  
Clients should not be forced to depend upon interfaces that they do not use. Instead of one large fat interface, many smaller, more specific interfaces are preferred.

**Explanation:**  
- **Tailored Interfaces:** Instead of a single interface with many methods, split it so that the client only needs to implement what it actually uses.
- **Reduced Coupling:** This reduces the impact of change because a client is not affected by methods it does not care about.

**Java Example – Multifunction Device Interfaces:**  

Suppose you have a multifunction device that can print, scan, and fax. Not every device will support all functionalities.

*Problematic design (fat interface):*

```java
public interface MultiFunctionDevice {
    void print(Document d);
    void scan(Document d);
    void fax(Document d);
}
```

*Better design (segregated interfaces):*

```java
// Segregated interfaces
public interface Printer {
    void print(Document d);
}

public interface Scanner {
    void scan(Document d);
}

public interface Fax {
    void fax(Document d);
}

// A device that supports both printing and scanning.
public class MultiFunctionMachine implements Printer, Scanner {
    @Override
    public void print(Document d) {
        // print logic
    }

    @Override
    public void scan(Document d) {
        // scan logic
    }
}

// A simple printer device.
public class SimplePrinter implements Printer {
    @Override
    public void print(Document d) {
        // print logic
    }
}
```

*Now a simple printer only implements the `Printer` interface and isn’t forced to provide methods for scanning or faxing.*

---

## 5. Dependency Inversion Principle (DIP)

**Definition:**  
High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

**Explanation:**  
- **Abstraction over Implementation:** By programming to an interface (or abstract class), you can easily swap out implementations without modifying the high-level logic.
- **Flexibility and Testability:** It enables dependency injection, which makes unit testing easier as dependencies can be mocked or stubbed.

**Java Example – Notification Service Using Dependency Injection:**  

Imagine a notification service that sends messages. Instead of hardcoding a particular notification method (e.g., email), you depend on an abstraction.

```java
// Abstraction for notification services.
public interface MessageService {
    void sendMessage(String msg, String receiver);
}

// Concrete implementation using Email.
public class EmailService implements MessageService {
    @Override
    public void sendMessage(String msg, String receiver) {
        // Code to send email.
        System.out.println("Email sent to " + receiver + " with message: " + msg);
    }
}

// Another implementation can be provided later, e.g., SMS.
public class SMSService implements MessageService {
    @Override
    public void sendMessage(String msg, String receiver) {
        // Code to send SMS.
        System.out.println("SMS sent to " + receiver + " with message: " + msg);
    }
}

// High-level module that depends on the abstraction.
public class NotificationService {
    private MessageService service;
    
    // Dependency injection through the constructor.
    public NotificationService(MessageService service) {
        this.service = service;
    }
    
    public void notifyUser(String message, String user) {
        service.sendMessage(message, user);
    }
}

// Usage Example:
public class Main {
    public static void main(String[] args) {
        // Easily switch between EmailService or SMSService without changing NotificationService.
        MessageService emailService = new EmailService();
        NotificationService notification = new NotificationService(emailService);
        notification.notifyUser("Your order has been shipped.", "user@example.com");
    }
}
```

*Here, `NotificationService` depends solely on the `MessageService` abstraction rather than a concrete class. This allows you to change the underlying message delivery system without altering the high-level logic.*

---

## Summary

- **SRP (Single Responsibility Principle):** Each class has one responsibility, which makes the code easier to maintain.
- **OCP (Open/Closed Principle):** Use abstraction (interfaces or abstract classes) to allow new functionality without modifying existing code.
- **LSP (Liskov Substitution Principle):** Ensure that subclasses extend base classes without altering the expected behavior.
- **ISP (Interface Segregation Principle):** Break down fat interfaces into smaller, client-specific ones.
- **DIP (Dependency Inversion Principle):** High-level modules should depend on abstractions, not concrete implementations, allowing for more flexible and testable code.

By adhering to these SOLID principles, you can build a well-structured Java application that is modular, robust, and easier to manage as it grows in complexity.
