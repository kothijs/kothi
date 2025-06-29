# 🧠 Prompt for Cursor — Kothi

You're working on **Kothi** — a modular, API-first, event-driven backend framework for modern restaurants. Think of it like **Medusa.js**, but for **restaurant operations instead of e-commerce**.

---

## 🍽 Purpose

Kothi is built for handling all real-world restaurant flows:
- Table service
- Takeaway
- Billing, splitting, modifiers
- Kitchen Order Tickets (KOT/BOT)
- Waiter apps
- Kitchen displays
- Payment integrations
- Offline-first terminals

This is a **developer platform**, not just an app. It should be **extendable, hackable, and scalable**.

---

## 🧰 Tech Stack

| Layer         | Tech                              |
|---------------|-----------------------------------|
| API Layer     | NestJS (REST for now, GraphQL optional) |
| Database      | PostgreSQL                        |
| Queueing      | BullMQ (Redis)                    |
| Realtime      | Redis PubSub or WebSockets        |
| Workspace     | PNPM Workspaces + Turborepo       |
| Language      | TypeScript                        |

---

## 🏗 Project Structure

kothi/
├── apps/
│   └── api/                 # NestJS backend app
├── packages/
│   ├── core/                # Core logic (orders, tables, etc.)
│   ├── shared/              # Shared types, interfaces, events
│   └── plugins/
│       └── kot-printer/     # Example plugin
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── package.json
└── prompt.md

---

## 📦 Plugin System (Optional but Supported)

Kothi supports a Medusa-style plugin pattern:

```ts
interface Plugin {
  init(): Promise<void>
  onOrderCreate?(order: Order): Promise<void>
  onOrderPaid?(order: Order): Promise<void>
}

## 📦 Plugins Can:

- Send orders to printers  
- Notify kitchens  
- Trigger webhooks  
- Handle custom payments  
- Extend anything  

But you’re **not limited to this**.

---

## 🔥 Design Freedom

You’re encouraged to go **beyond plugin architecture** if needed:

- Build **module registries**, not just lifecycle hooks  
- Use **domain events**, **decorators**, or **metadata-driven logic**  
- Build **CLI generators** to scaffold plugins or modules  
- Create a full-blown **service bus/event bus**  
- Make **Kothi** feel like a real framework, not just a boilerplate  

---

## ✅ Goals

- Modular, composable, POS-specific backend  
- Built for real-time apps (POS terminals, waiter screens, kitchen displays)  
- Highly extensible, like a framework  
- Built with DX in mind: typed, tested, clean  

---

## 💡 Inspirations

- **Medusa.js** → plugin-first commerce  
- **Vendure** → extensible GraphQL  
- **Shopify POS + TabPOS** → restaurant flows  
- **AdonisJS** → DX-first backend  

---

## 🚫 Anti-Goals

- Not a bloated monolith  
- Not a frontend-first system  
- Not just a boilerplate — **this is a framework**  

---

## 🌟 Mindset

Think like you’re building the **Next.js of restaurant backends** — modular, convention-driven, extensible, and powerful.

Make **Kothi** the platform people use to build serious restaurant systems.

