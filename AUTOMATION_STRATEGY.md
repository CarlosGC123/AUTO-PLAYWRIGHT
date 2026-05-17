# Automation Strategy Report

## 1. Objective

Design and implement a maintainable, scalable, and readable E2E automation suite for [Sauce Demo](https://www.saucedemo.com/) that covers the core purchasing workflow, validates edge cases (locked user, bad credentials), and serves as a living specification aligned with the product's acceptance criteria.

---

## 2. Test Strategy

### Approach: Behaviour-Driven Development (BDD)

Scenarios are written in **Gherkin** using the *Given / When / Then* structure. This provides:

- **Traceability** – every Gherkin scenario maps directly to an acceptance criterion.
- **Living documentation** – feature files are readable by non-technical stakeholders.
- **Separation of intent from implementation** – business rules live in `.feature` files; automation code lives in step definitions and lower layers.

### Browser Automation

**Playwright** was chosen because it provides:

- Auto-waiting on every action (reduces flakiness from timing issues).
- Built-in `expect` with automatic retry logic for assertions.
- Native cross-browser support (Chromium, Firefox, WebKit).
- Screenshot and trace capture on failure.
- No extra process needed for browsers (managed by `playwright install`).

---

## 3. Architecture – Screenplay-Inspired Pattern

The framework is structured around the **Screenplay** pattern principles — without the Actor abstraction — preserving a clear three-tier responsibility model:

```
┌──────────────────────────────────────────────────────────┐
│                     Feature Files (.feature)             │
│           Business language — Gherkin scenarios          │
└───────────────────────────┬──────────────────────────────┘
                            │ calls
┌───────────────────────────▼──────────────────────────────┐
│                    Step Definitions (.steps.ts)           │
│       Thin bridge between Gherkin and TypeScript          │
└──────────────┬─────────────────────────┬─────────────────┘
               │ calls                   │ calls
┌──────────────▼──────────┐  ┌───────────▼─────────────────┐
│      Tasks (tasks/)     │  │   Interactions (interactions/)│
│  Business-level actions │  │   Atomic Playwright actions  │
│  e.g. LoginTask,        │  │   e.g. Click.on(),           │
│  CheckoutTask           │  │   Fill.field(), Verify.*     │
└──────────────┬──────────┘  └───────────┬─────────────────┘
               │ uses                    │ uses
┌──────────────▼──────────────────────────▼─────────────────┐
│                     Pages (pages/)                         │
│         Selector constants — no logic, no imports          │
└────────────────────────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────┐
│                  Playwright Browser API                  │
└──────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | What it contains | What it does NOT contain |
|-------|-----------------|--------------------------|
| **features/** | Gherkin scenarios, tags | Selectors, assertions, Playwright calls |
| **steps/** | Step definitions, Cucumber bindings | Business logic, raw Playwright calls |
| **tasks/** | Orchestrated multi-interaction sequences | Selectors, direct assertions |
| **interactions/** | Atomic wrappers for single Playwright actions | Business rules, page knowledge |
| **pages/** | Selector constants and dynamic selector builders | Any logic or imports |
| **hooks/** | Browser launch/teardown, CustomWorld definition | Test assertions, business logic |
| **util/** | EnvReader, Base64 | Framework concerns |

---

## 4. Design Decisions

### 4.1 Screenplay Without the Actor

The full Screenplay pattern introduces an **Actor** object that holds abilities and performs tasks. For a suite of this scope, the Actor adds indirection without proportional gain. Instead:

- The Playwright `Page` object is passed explicitly as a parameter.
- Tasks and Interactions are plain TypeScript objects with methods.
- The Cucumber `CustomWorld` holds the `Page` and serves as the shared execution context.

This keeps the code idiomatic TypeScript while preserving Screenplay's key benefits: reusability, single-responsibility, and composability.

### 4.2 Pages as Pure Selector Registries

Pages hold **only** CSS / `data-test` selectors — no Playwright methods, no imports. This means:

- Swapping a selector requires a change in exactly one place.
- Pages are trivially readable and testable in isolation.
- Interactions and tasks never duplicate selectors.

### 4.3 Credential Security

Passwords are stored as **Base64** in `.env` (not plain text) and decoded at runtime via `Base64.decode()`. The `.env` file is excluded from git via `.gitignore`. For production CI pipelines, credentials should be injected as environment secrets.

### 4.4 Browser Lifecycle

| Scope | Strategy |
|-------|----------|
| Browser | Created **once** in `BeforeAll`, destroyed in `AfterAll` |
| Context + Page | Created **per scenario** in `Before`, closed in `After` |

This balances performance (no browser restart per scenario) with isolation (fresh browsing context for each test).

### 4.5 Screenshot on Failure

When a scenario fails, `After` automatically captures a **full-page screenshot** and attaches it to the Cucumber JSON/HTML report, enabling immediate visual debugging.

### 4.6 Environment-Driven Configuration

All runtime variables (`BASE_URL`, `BROWSER`, `HEADLESS`, credentials) are read from `.env` via `EnvReader.get()`. Switching targets (staging, prod) requires only `.env` changes — zero code changes.

---

## 5. Test Coverage vs Acceptance Criteria

| Acceptance Criterion | Feature | Scenario | Tag |
|----------------------|---------|----------|-----|
| Login with valid credentials | login.feature | Successful login with a standard user | @login |
| Login failure – locked account | login.feature | Locked-out user cannot log in | @login |
| Login failure – wrong credentials | login.feature | Login attempt with invalid credentials | @login |
| Add product to cart from products page | shopping.feature | Add a product to the cart | @shopping |
| View products in shopping cart | shopping.feature | View added products in the shopping cart | @shopping |
| Complete purchase to confirmation | checkout.feature | Successfully complete the full checkout process | @checkout |

---

## 6. Future Improvements

| Area | Improvement |
|------|-------------|
| **Parallel execution** | Use Cucumber's `--parallel` with per-worker browser instances |
| **Data-driven tests** | Drive test data from external JSON/CSV via Scenario Outline |
| **API setup** | Use Playwright's API client to create test data before E2E tests (faster, more stable) |
| **Visual regression** | Integrate `@playwright/test` snapshots or Percy for pixel-level assertions |
| **CI/CD** | GitHub Actions workflow with headless Chromium and artifact upload for reports |
| **Accessibility** | Integrate `axe-playwright` for a11y checks on key pages |
