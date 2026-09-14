# JWT Authentication with Granular Role-Based Access Control (RBAC) API

**A production-ready Authentication API built with Node.js, designed to handle user registration, secure login, and granular route access control based on user roles utilizing JSON Web Tokens (JWT) and MongoDB.**

---

## The Problem
When building scalable applications and modern enterprise systems, securing API endpoints is a critical challenge. Without a well-defined access control architecture, backends face severe security integration blockers:
*   **Access Vulnerabilities:** Standard users bypassing system boundaries to access administrative panels or executing restricted actions without proper authorization clearance.
*   **Insecure Sessions:** Weak credential validation or unencrypted state management that leaves the application exposed to session hijacking or brute-force exploits.
*   **Boilerplate Code Duplication:** Manually repeating role checks and token validations inside every single route or controller, making the codebase fragile and difficult to scale.
*   **Leaked Credentials:** Accidentally hardcoding sensitive JWT signing keys and production database connection strings inside the source control tree.

---

## The Solution
This service acts as a robust, centralized authentication and authorization broker. It exposes public endpoints to manage user lifecycle operations (`/register` and `/login`) and utilizes a custom interceptor middleware to validate incoming access tokens and enforce granular restrictions based on the user's role level (`admin`, `employee`, `customer`).

### What this tool automatically handles for you:
*   **Secure Password Hashing:** Automatically intercepts password mutations via Mongoose (`pre-save` hooks) and utilizes `bcrypt` to guarantee no plain-text passwords ever touch the database registries.
*   **Time-Expiring Token Generation:** Issues secure digital signatures via JWT containing encapsulated telemetry (`userId` and `userRole`) with expiration limits strictly controlled through operational environment variables.
*   **Abstract Authorization Middleware:** A reusable router interceptor that dynamically evaluates whether the authenticated user's role exists within the route's allowed roles array, dropping unauthorized hits with an HTTP `403 Forbidden`.
*   **Global Error Handling Layer:** Gracefully catches unexpected runtime exceptions or database index collisions (e.g., duplicate names or emails) to return uniform, structured JSON payloads to the client.
*   **Isolated Environments:** Seamlessly switches execution parameters between production/development databases and independent testing memory stacks using runtime `.env` routing properties.

---

## Demonstrated Capabilities
Building this security and access control broker proves an advanced understanding of backend engineering, cryptography, and API architecture integrity:

*   **Clean Architectural Boundaries:** Strict separation of responsibilities between Routes, Controllers, Models, and Middlewares, aligning with modern design patterns for Express ecosystems.
*   **Secure Infrastructure Management:** Utilizing operational `.env` variables ensures sensitive deployment secrets are isolated from vulnerable public code repositories.
*   **Cross-Applicable Middleware Engineering:** The exact tracking, validation, and role checking structure developed here can be easily scaled or adapted to support:
    *   Scope-based permissions and claims-based identity systems.
    *   Centralized Gateway microservice authentication.
    *   Multi-tenant SaaS architectures requiring complex data governance structures.

---

## Interface Specifications & Technical Walkthrough

This section outlines how data flows through the application, detailing the exact execution lifecycle of public endpoints and secure role-based verification.

### 1. Public Authentication Routes

The lifecycle begins at the public registration boundary where new user payloads are validated, hashed, and safely provisioned into the database.

#### **POST** `/register`
Creates a new user profile with a designated security role.
*   **Headers:** `Content-Type: application/json`
*   **Body Parameters:**
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "securepassword123",
      "role": "customer" 
    }
    ```
    *Note: Valid choices for `role` are restricted to `admin`, `employee`, or `customer`.*
*   **Success Response (`201 Created`):**
    ```json
    {
      "message": "User registered with success!",
      "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request` (Missing fields or invalid role value).
    *   `400 Bad Request` (Duplicate database collision: Name or Email already registered).

#### **POST** `/login`
Authenticates existing credentials and issues a session token.
*   **Headers:** `Content-Type: application/json`
*   **Body Parameters:**
    ```json
    {
      "email": "johndoe@example.com",
      "password": "securepassword123"
    }
    ```
*   **Success Response (`201 Created`):**
    ```json
    {
      "message": "User logged with success!",
      "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request` (Missing fields or user not found).
    *   `401 Unauthorized` (Invalid password match).

---

### 2. Protected Role-Based Routes

Once authenticated, requests to access protected pathways must present a valid JSON Web Token. The custom `authMiddleware` intercepts the incoming payload, verifies the digital signature against the environment key, and evaluates whether the user's role meets the specific endpoint requirements.

*   **Required Header for all Protected Routes:** `Authorization: Bearer <your-access-token>`

#### **POST** `/customer`
*   **Allowed Access Roles:** `customer`, `employee`, `admin`
*   **Success Response (`200 OK`):**
    ```json
    { "message": "Hello Customer" }
    ```

#### **POST** `/employee`
*   **Allowed Access Roles:** `employee`, `admin`
*   **Success Response (`200 OK`):**
    ```json
    { "message": "Hello Employee" }
    ```

#### **POST** `/admin`
*   **Allowed Access Roles:** `admin`
*   **Success Response (`200 OK`):**
    ```json
    { "message": "Hello Admin" }
    ```

#### **Protected Routes Failure Modes:**
*   `401 Unauthorized` (Missing or malformed Authorization header payload).
*   `403 Forbidden` (Token is valid, but the user's role is not cleared to view this tier).
*   `403 Forbidden` (Token signature has expired or tampering was detected).

---

## Project Architecture
```text
jwt-authentication-with-rbac-api/
├── src/
│   ├── config/          # Infrastructure and database configurations
│   │   └── database.js  # Mongoose database initialization manager
│   ├── controllers/     # Route logic engines for auth and protected flows
│   │   ├── authController.js
│   │   └── protectedController.js
│   ├── middlewares/     # Request lifecycle interceptors
│   │   └── auth.middleware.js # Core RBAC rule evaluation engine
│   ├── models/          # Data schemas and Mongoose database models
│   │   └── user.model.js
│   ├── routes/          # Express network endpoint definitions
│   │   ├── auth.routes.js
│   │   └── protected.routes.js
│   └── app.js           # Core Express framework configuration setup
├── .env                 # Private local runtime environmental properties
├── package.json         # Dependency configurations and execution scripts
├── server.js            # Main entrypoint of the application
└── README.md            # Documentation
```