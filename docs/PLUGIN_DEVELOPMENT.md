# Kothi Plugin Development Guide

## Overview

Kothi.js is a modular, API-first, event-driven backend framework for modern restaurants. This guide will help you create plugins that extend Kothi's functionality.

## Quick Start

### 1. Generate a New Plugin

```bash
# From the Kothi monorepo root
pnpm kothi generate payment-gateway --description "Payment gateway integration"
```

This creates:
```
packages/plugins/payment-gateway/
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts
└── README.md
```

### 2. Build Your Plugin

```bash
cd packages/plugins/payment-gateway
pnpm install
pnpm build
```

### 3. Your Plugin is Automatically Loaded

Kothi's bootstrap system automatically discovers and loads all plugins in `packages/plugins/`.

## Plugin Structure

### Required Files

- `package.json` - Plugin metadata and dependencies
- `tsconfig.json` - TypeScript configuration
- `src/index.ts` - Main plugin implementation
- `README.md` - Documentation

### Plugin Interface

All plugins must implement the `Plugin` interface:

```typescript
import { Plugin } from "@kothi/shared";

export class MyPlugin implements Plugin {
  async init() {
    // Called when plugin is loaded
    console.log("MyPlugin initialized");
  }

  async onOrderCreate(order: any) {
    // Called when a new order is created
    console.log("Order created:", order);
  }

  async onOrderPaid(order: any) {
    // Called when an order is paid
    console.log("Order paid:", order);
  }
}
```

## Plugin Lifecycle

1. **Discovery** - Kothi scans `packages/plugins/` directory
2. **Loading** - Dynamic import of plugin modules
3. **Initialization** - `init()` method is called
4. **Event Handling** - Plugin receives events (order creation, payment, etc.)

## Available Events

### Order Events
- `onOrderCreate(order)` - New order created
- `onOrderPaid(order)` - Order payment completed
- `onOrderCancelled(order)` - Order cancelled
- `onOrderUpdated(order)` - Order modified

### Table Events
- `onTableAssigned(table, order)` - Table assigned to order
- `onTableFreed(table)` - Table becomes available

### Kitchen Events
- `onKOTGenerated(kot)` - Kitchen Order Ticket generated
- `onKOTCompleted(kot)` - KOT marked as completed

## Best Practices

### 1. Error Handling
```typescript
async onOrderCreate(order: any) {
  try {
    // Your logic here
  } catch (error) {
    console.error("Plugin error:", error);
    // Don't throw - let other plugins continue
  }
}
```

### 2. Async Operations
```typescript
async init() {
  // Initialize database connections, API clients, etc.
  this.paymentClient = new PaymentClient();
  await this.paymentClient.connect();
}
```

### 3. Configuration
```typescript
export class MyPlugin implements Plugin {
  private config: any;

  async init() {
    // Load configuration from environment or config files
    this.config = {
      apiKey: process.env.MY_PLUGIN_API_KEY,
      endpoint: process.env.MY_PLUGIN_ENDPOINT
    };
  }
}
```

## Testing Your Plugin

### 1. Unit Tests
```typescript
// src/__tests__/my-plugin.test.ts
import { MyPlugin } from '../index';

describe('MyPlugin', () => {
  let plugin: MyPlugin;

  beforeEach(() => {
    plugin = new MyPlugin();
  });

  it('should initialize correctly', async () => {
    await expect(plugin.init()).resolves.not.toThrow();
  });
});
```

### 2. Integration Tests
```typescript
// Test with real Kothi events
import { loadPlugins } from '@kothi/api/bootstrap';

describe('Plugin Integration', () => {
  it('should load and initialize', async () => {
    const plugins = await loadPlugins();
    expect(plugins).toHaveLength(1);
  });
});
```

## Publishing Plugins

### Internal (Monorepo)
Plugins in `packages/plugins/` are automatically available to the Kothi monorepo.

### External (NPM)
To publish a plugin to NPM:

1. Create a separate repository
2. Copy the plugin structure
3. Update package.json with proper metadata
4. Publish to NPM

```json
{
  "name": "@kothi/plugin-payment-gateway",
  "version": "1.0.0",
  "description": "Payment gateway plugin for Kothi.js",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "@kothi/shared": "^1.0.0"
  }
}
```

## Examples

### Payment Gateway Plugin
```typescript
export class PaymentGatewayPlugin implements Plugin {
  private stripe: Stripe;

  async init() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async onOrderPaid(order: any) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: order.total * 100, // Convert to cents
      currency: 'usd',
      metadata: { orderId: order.id }
    });
    
    console.log(`Payment processed: ${paymentIntent.id}`);
  }
}
```

### Printer Plugin
```typescript
export class PrinterPlugin implements Plugin {
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

## Support

- **Documentation**: [docs.kothi.js](https://docs.kothi.js)
- **Discord**: [Kothi Community](https://discord.gg/kothi)
- **GitHub**: [Issues](https://github.com/kothi/kothi/issues)

## License

MIT License - see [LICENSE](../LICENSE) for details. 