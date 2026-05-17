# Sauce Demo – Playwright + Cucumber Automation Framework

Automated E2E test suite for [Sauce Demo](https://www.saucedemo.com/) built with **Playwright** and **Cucumber (BDD)**, following a **Screenplay-inspired** design pattern.

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Cross-browser automation engine |
| [@cucumber/cucumber](https://cucumber.io/) | BDD framework / Gherkin runner |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [ts-node](https://typestrong.org/ts-node/) | Runtime TypeScript execution |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) | Rich HTML test report |

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

---

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd auto-web-playwright

# 2. Install Node.js dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Configuration

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

`.env` values:

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Application URL | `https://www.saucedemo.com` |
| `STANDARD_USER` | Standard test user | `standard_user` |
| `LOCKED_OUT_USER` | Locked account user | `locked_out_user` |
| `PASSWORD` | **Base64-encoded** password | `c2VjcmV0X3NhdWNl` (`secret_sauce`) |
| `BROWSER` | Browser to use: `chromium`, `firefox`, `webkit` | `chromium` |
| `HEADLESS` | Run headless (`true` / `false`) | `false` |

> **Security note:** The password is stored as Base64 to avoid plain-text credentials in source control. The `Base64` utility in `src/util/Base64.ts` handles runtime decoding.

---

## Running the Tests

```bash
# Run the full test suite
npm test

# Run only login scenarios
npm run test:login

# Run only shopping cart scenarios
npm run test:shopping

# Run only checkout scenarios
npm run test:checkout

# Run all tests and generate the HTML report
npm run test:report

# Generate the HTML report from an existing JSON report
npm run report
```

After running `npm run test:report`, open `reports/html/index.html` in your browser to view the detailed report.

---

## Project Structure

```
auto-web-playwright/
│
├── src/
│   ├── features/           # Gherkin feature files (test scenarios)
│   │   ├── login.feature
│   │   ├── shopping.feature
│   │   └── checkout.feature
│   │
│   ├── steps/              # Cucumber step definitions
│   │   ├── login.steps.ts
│   │   ├── shopping.steps.ts
│   │   └── checkout.steps.ts
│   │
│   ├── hooks/              # Browser lifecycle & Cucumber World
│   │   ├── CustomWorld.ts  # Shared Playwright context per scenario
│   │   └── Hooks.ts        # BeforeAll / Before / After / AfterAll
│   │
│   ├── pages/              # Element selector constants (no logic)
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutOnePage.ts
│   │   ├── CheckoutTwoPage.ts
│   │   └── CheckoutCompletePage.ts
│   │
│   ├── interactions/       # Atomic, reusable Playwright actions
│   │   ├── Navigate.ts
│   │   ├── Fill.ts
│   │   ├── Click.ts
│   │   └── Verify.ts
│   │
│   ├── tasks/              # Business-level action orchestrations
│   │   ├── LoginTask.ts
│   │   ├── AddProductTask.ts
│   │   ├── ViewCartTask.ts
│   │   └── CheckoutTask.ts
│   │
│   └── util/               # Cross-cutting helpers
│       ├── EnvReader.ts    # Type-safe environment variable access
│       └── Base64.ts       # Encoding / decoding utility
│
├── reports/                # Generated test reports (git-ignored)
│   └── generate.js         # HTML report generator script
│
├── .env                    # Local environment config (git-ignored)
├── .env.example            # Template for .env
├── cucumber.js             # Cucumber runner configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## Test Scenarios

### @login – User Authentication
| # | Scenario | User |
|---|----------|------|
| 1 | Successful login | `standard_user` |
| 2 | Locked account error | `locked_out_user` |
| 3 | Invalid credentials error | `invalid_user` |

### @shopping – Shopping Cart
| # | Scenario | |
|---|----------|-|
| 1 | Add product → cart badge shows 1 | |
| 2 | Add product → view in cart page | |

### @checkout – Complete Purchase Flow
| # | Scenario | |
|---|----------|-|
| 1 | Full checkout: cart → info → summary → confirmation | |

---

## Design Pattern

See [AUTOMATION_STRATEGY.md](./AUTOMATION_STRATEGY.md) for a full explanation of the Screenplay-inspired architecture and design decisions.
