# 🍽️ Kothi.js

**Modular, API-first, event-driven backend framework for modern restaurants**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/kothi/kothi)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> Think of it like **Medusa.js**, but for **restaurant operations instead of e-commerce**.

## 🎯 What is Kothi?

Kothi is a developer platform for building restaurant management systems. It handles all real-world restaurant flows:

- 🍽️ **Table Service** - Reservations, seating, table management
- 📦 **Takeaway** - Online orders, delivery tracking
- 💳 **Billing & Payments** - Split bills, modifiers, payment integrations
- 🖨️ **Kitchen Orders** - KOT/BOT generation, kitchen displays
- 📱 **Mobile Apps** - Waiter apps, customer apps
- 🖥️ **POS Terminals** - Offline-first, real-time sync
- 🔌 **Plugin System** - Extensible architecture for custom integrations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL 14+

### Installation

```bash
# Clone the repository
git clone https://github.com/kothi/kothi.git
cd kothi

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development server
pnpm dev
```

### Create Your First Plugin

```bash
# Generate a new plugin
pnpm kothi generate payment-gateway --description "Stripe payment integration"

# Build the plugin
cd packages/plugins/payment-gateway
pnpm build
```

Your plugin is automatically loaded by Kothi's plugin system! 🎉

## 🏗️ Architecture

```
kothi/
├── apps/
│   └── api/                 # NestJS backend API
├── packages/
│   ├── core/                # Core restaurant logic
│   ├── shared/              # Shared types & interfaces
│   ├── cli/                 # Plugin generator CLI
│   └── plugins/
│       ├── kot-printer/     # Kitchen order printer
│       └── payment-gateway/ # Payment integrations
├── docs/                    # Documentation
└── turbo.json              # Monorepo configuration
```

## 🔌 Plugin Development

Kothi uses a powerful plugin architecture that makes it easy to extend functionality:

### Plugin Interface

```typescript
import { Plugin } from "@kothi/shared";

export class MyPlugin implements Plugin {
  async init() {
    // Initialize your plugin
    console.log("Plugin initialized");
  }

  async onOrderCreate(order: any) {
    // Handle new orders
    console.log("New order:", order);
  }

  async onOrderPaid(order: any) {
    // Handle payments
    console.log("Order paid:", order);
  }
}
```

### Available Events

- **Order Events**: `onOrderCreate`, `onOrderPaid`, `onOrderCancelled`
- **Table Events**: `onTableAssigned`, `onTableFreed`
- **Kitchen Events**: `onKOTGenerated`, `onKOTCompleted`

### Plugin Lifecycle

1. **Discovery** - Kothi scans `packages/plugins/` directory
2. **Loading** - Dynamic import of plugin modules
3. **Initialization** - `init()` method called
4. **Event Handling** - Plugin receives restaurant events

## 🛠️ Development

### Commands

```bash
# Development
pnpm dev              # Start all services in watch mode
pnpm api:dev          # Start API server only

# Building
pnpm build            # Build all packages
pnpm type-check       # Type check all packages

# Testing
pnpm test             # Run all tests
pnpm lint             # Lint all packages
pnpm format           # Format all code

# Plugin Development
pnpm kothi generate   # Generate new plugin
```

### Project Structure

- **`apps/api/`** - NestJS REST API server
- **`packages/core/`** - Core restaurant business logic
- **`packages/shared/`** - Shared types, interfaces, events
- **`packages/cli/`** - Plugin generator and development tools
- **`packages/plugins/*/`** - Individual plugins

## 📚 Documentation

- [Plugin Development Guide](docs/PLUGIN_DEVELOPMENT.md) - Complete guide to building plugins
- [API Reference](docs/API.md) - REST API documentation
- [Architecture Guide](docs/ARCHITECTURE.md) - System design and patterns
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment

## 🎨 Examples

### Payment Gateway Plugin

```typescript
export class StripePlugin implements Plugin {
  private stripe: Stripe;

  async init() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async onOrderPaid(order: any) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: order.total * 100,
      currency: 'usd',
      metadata: { orderId: order.id }
    });
    
    console.log(`Payment processed: ${paymentIntent.id}`);
  }
}
```

### Kitchen Printer Plugin

```typescript
export class ThermalPrinterPlugin implements Plugin {
  private printer: ThermalPrinter;

  async init() {
    this.printer = new ThermalPrinter({
      type: 'star',
      interface: '/dev/usb/lp0'
    });
  }

  async onKOTGenerated(kot: any) {
    await this.printer.print(kot.formatForPrint());
    console.log(`KOT printed: ${kot.id}`);
  }
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `pnpm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.kothi.js](https://docs.kothi.js)
- **Discord**: [Kothi Community](https://discord.gg/kothi)
- **GitHub Issues**: [Report a bug](https://github.com/kothi/kothi/issues)
- **Email**: support@kothi.js

## 🙏 Acknowledgments

- Inspired by [Medusa.js](https://medusajs.com/) for e-commerce
- Built with [NestJS](https://nestjs.com/) for robust APIs
- Powered by [Turbo](https://turbo.build/) for monorepo management
- TypeScript for type safety and developer experience

---

**Made with ❤️ for the restaurant industry** 