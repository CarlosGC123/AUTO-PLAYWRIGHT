# Sauce Demo – Framework de Automatización E2E

Suite de pruebas end-to-end automatizadas para [Sauce Demo](https://www.saucedemo.com/), construida sobre **Playwright** y **Cucumber (BDD)** con **TypeScript**, siguiendo un patrón de diseño inspirado en **Screenplay**.

---

## Índice

1. [Stack tecnológico](#stack-tecnológico)
2. [Arquitectura y patrón de diseño](#arquitectura-y-patrón-de-diseño)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Prerrequisitos](#prerrequisitos)
5. [Instalación](#instalación)
6. [Configuración de entornos](#configuración-de-entornos)
7. [Ejecución de pruebas](#ejecución-de-pruebas)
8. [Sistema de reportes](#sistema-de-reportes)
9. [Escenarios cubiertos](#escenarios-cubiertos)
10. [Logging en consola](#logging-en-consola)

---

## Stack tecnológico

| Herramienta | Versión | Propósito |
|---|---|---|
| [Playwright](https://playwright.dev/) | `1.44` | Motor de automatización multi-navegador (Chromium, Firefox, WebKit) |
| [@cucumber/cucumber](https://cucumber.io/) | `10.x` | Framework BDD y ejecutor de archivos Gherkin |
| [TypeScript](https://www.typescriptlang.org/) | `5.4` | Tipado estático en todo el código de pruebas |
| [ts-node](https://typestrong.org/ts-node/) | `10.x` | Compilación y ejecución de TypeScript en tiempo real (sin paso de build) |
| [dotenv](https://github.com/motdotla/dotenv) | `16.x` | Gestión de variables de entorno por archivo `.env` |
| [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) | `3.x` | Generación de reportes HTML enriquecidos a partir de la salida JSON de Cucumber |

---

## Arquitectura y patrón de diseño

El framework sigue un patrón inspirado en **Screenplay**, separando responsabilidades en capas independientes:

```
Feature (Gherkin)
  └── Steps          → Traduce Gherkin al código de prueba
        └── Tasks    → Orquesta flujos de negocio de alto nivel
              └── Interactions → Acciones atómicas de Playwright (clic, escribir, navegar)
                     └── Questions  → Consultan el estado de la UI antes de cada acción
```

### Capas y responsabilidades

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| **Features** | `src/features/` | Escenarios BDD escritos en Gherkin en español |
| **Steps** | `src/steps/` | Glue-code entre Gherkin y las Tasks / Interactions |
| **Tasks** | `src/tasks/` | Flujos de negocio reutilizables (login, agregar al carrito, checkout) |
| **Interactions** | `src/interactions/` | Acciones atómicas: clic, escritura, navegación, verificaciones |
| **Questions** | `src/questions/` | Consultas de estado sobre la UI: visible, clickable, escribible, texto, URL |
| **Pages** | `src/pages/` | Constantes de selectores CSS. Sin lógica de negocio |
| **Hooks** | `src/hooks/` | Ciclo de vida de Playwright: lanzar / cerrar browser y contexto por escenario |
| **Util** | `src/util/` | Utilidades transversales: lectura de env, Base64, logging con color |

> **Principio clave:** cada Interaction valida el estado del elemento mediante una Question antes de actuar. Si el elemento no está disponible, se lanza un error descriptivo con contexto completo.

---

## Estructura del proyecto

```
auto-playwright/
│
├── src/
│   ├── features/               # Escenarios Gherkin (BDD)
│   │   ├── login.feature
│   │   ├── shopping.feature
│   │   └── checkout.feature
│   │
│   ├── steps/                  # Definiciones de pasos (glue code)
│   │   ├── login.steps.ts
│   │   ├── shopping.steps.ts
│   │   └── checkout.steps.ts
│   │
│   ├── hooks/                  # Ciclo de vida del runner
│   │   ├── CustomWorld.ts      # Contexto compartido por escenario: browser, context, page
│   │   └── Hooks.ts            # BeforeAll / Before / After / AfterAll
│   │
│   ├── pages/                  # Selectores de elementos (Page Object simplificado)
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutOnePage.ts
│   │   ├── CheckoutTwoPage.ts
│   │   └── CheckoutCompletePage.ts
│   │
│   ├── questions/              # Preguntas sobre el estado de la UI (solo lectura)
│   │   ├── ElementoEsVisible.ts
│   │   ├── ElementoEsClickable.ts
│   │   ├── ElementoEsEscribible.ts
│   │   ├── TextoContiene.ts
│   │   └── UrlContiene.ts
│   │
│   ├── interactions/           # Acciones atómicas de Playwright
│   │   ├── Navegar.ts          # Navegación a URL
│   │   ├── Rellenar.ts         # Escritura en campos de texto
│   │   ├── Clic.ts             # Clic sobre elementos
│   │   ├── Verificar.ts        # Aserciones de UI (URL, texto, visibilidad)
│   │   ├── IniciarSesion.ts    # Flujo atómico de autenticación
│   │   └── types.ts            # Interfaces de las Interactions
│   │
│   ├── tasks/                  # Orquestaciones de negocio
│   │   ├── AgregarProducto.ts
│   │   ├── VerCarrito.ts
│   │   └── Checkout.ts
│   │
│   └── util/                   # Utilidades transversales
│       ├── EnvReader.ts        # Lectura tipada de variables de entorno
│       ├── Base64.ts           # Codificación / decodificación Base64
│       └── FormatoConsola.ts   # Logging con colores ANSI y niveles (PASO, TAREA, ACCIÓN…)
│
├── reports/
│   ├── generate.js             # Script generador del reporte HTML
│   ├── cucumber-report.json    # JSON generado por Cucumber (sobreescrito en cada ejecución)
│   ├── html/                   # Reporte de la última ejecución (se abre automáticamente)
│   └── backup/                 # Historial de reportes organizados por marca de tiempo
│       └── YYYY-MM-DD_HH-mm-ss/
│
├── .vscode/
│   ├── tasks.json              # Tareas VS Code equivalentes a Run Configurations de IntelliJ
│   └── launch.json             # Configuraciones de depuración con F5
│
├── .env.local                  # Variables para entorno local
├── .env.staging                # Variables para entorno de staging
├── cucumber.js                 # Configuración del runner de Cucumber
├── tsconfig.json               # Configuración de TypeScript
└── package.json
```

---

## Prerrequisitos

| Requisito | Versión mínima |
|---|---|
| Node.js | 18.x |
| npm | 9.x |

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd auto-playwright

# 2. Instalar dependencias de Node.js
npm install

# 3. Instalar los navegadores de Playwright
npx playwright install
```

> El paso 3 descarga los binarios de Chromium, Firefox y WebKit (~300 MB). Solo es necesario ejecutarlo una vez por máquina.

---

## Configuración de entornos

El proyecto incluye dos archivos de entorno predefinidos. No existe un `.env` global; cada ejecución indica qué archivo usar mediante la variable `ENV_FILE`.

### `.env.local` — Entorno local

```env
BASE_URL=https://www.saucedemo.com

STANDARD_USER=standard_user
LOCKED_OUT_USER=locked_out_user

# Contraseña en Base64 (secret_sauce → c2VjcmV0X3NhdWNl)
PASSWORD=c2VjcmV0X3NhdWNl

BROWSER=chromium      # chromium | firefox | webkit
HEADLESS=false        # true para ejecución sin ventana de navegador
```

### `.env.staging` — Entorno de staging

```env
BASE_URL=https://staging.saucedemo.com
BROWSER=chromium
HEADLESS=true
```

### Variables disponibles

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `BASE_URL` | URL base de la aplicación bajo prueba | `https://www.saucedemo.com` |
| `STANDARD_USER` | Usuario estándar de prueba | `standard_user` |
| `LOCKED_OUT_USER` | Usuario con cuenta bloqueada | `locked_out_user` |
| `PASSWORD` | Contraseña codificada en **Base64** | `c2VjcmV0X3NhdWNl` |
| `BROWSER` | Motor de navegador: `chromium`, `firefox`, `webkit` | `chromium` |
| `HEADLESS` | Ejecutar sin interfaz gráfica (`true` / `false`) | `false` |

> **Seguridad:** La contraseña se almacena en Base64 para evitar credenciales en texto plano en el historial de Git. La clase `Base64` en `src/util/Base64.ts` realiza la decodificación en tiempo de ejecución.

---

## Ejecución de pruebas

### Desde la terminal (npm scripts)

```bash
# Suite completa
ENV_FILE=.env.local npm test

# Solo escenarios de login
ENV_FILE=.env.local npm run test:login

# Solo carrito de compras
ENV_FILE=.env.local npm run test:shopping

# Solo checkout
ENV_FILE=.env.local npm run test:checkout

# Ejecutar + generar y abrir el reporte HTML automáticamente
ENV_FILE=.env.local npm run test:report
```

### Desde VS Code — Tareas (`Ctrl+Shift+P` → "Ejecutar tarea")

El proyecto incluye tareas preconfiguradas equivalentes a los **Run Configurations** de IntelliJ IDEA / PyCharm.

| Tarea | Entorno | Tag |
|---|---|---|
| 🎯 **Ejecutar Pruebas** | Combobox interactivo | Combobox interactivo |
| ▶ Todos – Local | `.env.local` | Todos |
| ▶ Login – Local | `.env.local` | `@login` |
| ▶ Login Fallido – Local | `.env.local` | `@login_fallido` |
| ▶ Shopping – Local | `.env.local` | `@shopping` |
| ▶ Checkout – Local | `.env.local` | `@checkout` |
| ▶ Todos – Staging | `.env.staging` | Todos |

Todas las tareas generan y abren el reporte HTML automáticamente al finalizar.

### Desde VS Code — Depurador (`F5`)

El archivo `.vscode/launch.json` incluye 9 configuraciones listas (combinaciones de suite × entorno) seleccionables desde el panel de depuración.

---

## Sistema de reportes

### Tipo de reporte

El framework utiliza **[multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)** — un generador de reportes HTML dedicado para proyectos Cucumber.js.

> No es Serenity BDD ni Allure. Es una librería más liviana, orientada específicamente a proyectos BDD con Cucumber, que convierte la salida JSON estándar de Cucumber en un reporte HTML navegable.

### Características del reporte

- Resumen visual por feature: escenarios pasados / fallidos / pendientes
- Detalle paso a paso con duración de cada step
- Screenshots embebidos automáticamente cuando un escenario falla
- Metadata: navegador, plataforma, fecha y hora de ejecución
- Apertura automática en el navegador al finalizar cada run

### Historial de ejecuciones (backup)

Cada ejecución guarda una copia del reporte en `reports/backup/`:

```
reports/
  html/                        ← Reporte de la última ejecución
  backup/
    2026-05-17_02-04-00/       ← Historial: una carpeta por ejecución
    2026-05-17_06-42-11/
    ...
```

---

## Escenarios cubiertos

### `@login` — Autenticación de usuarios

| Escenario | Usuario | Resultado esperado |
|---|---|---|
| Inicio de sesión exitoso | `standard_user` | Redirige a la página de inventario de productos |
| Cuenta bloqueada | `locked_out_user` | Muestra mensaje de error específico |
| Credenciales inválidas | `invalid_user` / `wrong_password` | Muestra mensaje de error específico |

### `@shopping` — Gestión del carrito de compras

| Escenario | Resultado esperado |
|---|---|
| Agregar un producto al carrito | El indicador del carrito muestra `1` |
| Ver los productos en la página del carrito | El producto aparece listado en el carrito |

### `@checkout` — Flujo completo de compra

| Escenario | Resultado esperado |
|---|---|
| Checkout end-to-end | Confirmación: *"Thank you for your order!"* |

---

## Logging en consola

El módulo `FormatoConsola` emite mensajes con colores ANSI y marca de tiempo `HH:mm:ss` durante toda la ejecución:

| Nivel | Color | Cuándo aparece |
|---|---|---|
| `[PASO]` | Cian | Inicio de cada step de Cucumber |
| `[TAREA]` | Verde | Inicio de una Task de negocio |
| `[ACCIÓN]` | Magenta | Interacción atómica con el navegador (clic, escritura, navegación) |
| `[PREGUNTA]` | Amarillo | Consulta de estado sobre un elemento de la UI |
| `[RESULTADO]` | Gris | Respuesta booleana de una Question |
| `[ÉXITO]` | Verde negrita | Operación completada correctamente |
| `[ADVERTENCIA]` | Amarillo | Situación no crítica pero relevante |
| `[ERROR]` | Rojo | Fallo con mensaje descriptivo y causa |
| `[INFO]` | Gris | Información general del escenario o suite |

Ejemplo de salida al escribir en un campo:

```
[ACCIÓN]     06:42:11  Escribir en → #user-name
[INFO]       06:42:11    Texto a escribir: "standard_user"
[ÉXITO]      06:42:11  "standard_user" escrito correctamente en → #user-name
```
