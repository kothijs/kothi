import * as fs from "fs-extra";
import * as path from "path";

interface PluginOptions {
  description?: string;
  author?: string;
}

export async function generatePlugin(
  name: string,
  options: PluginOptions = {}
) {
  const pluginDir = path.join(process.cwd(), "packages", "plugins", name);

  // Create plugin directory
  await fs.ensureDir(pluginDir);
  await fs.ensureDir(path.join(pluginDir, "src"));

  // Generate package.json
  const packageJson = {
    name: `@kothi/plugins/${name}`,
    version: "0.1.0",
    description: options.description || `Kothi plugin for ${name}`,
    author: options.author || "",
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      build: "tsc",
      dev: "tsc --watch",
      test: "jest",
      lint: "eslint src --ext .ts",
      format: "prettier --write src/**/*.ts",
      clean: "rm -rf dist",
      "type-check": "tsc --noEmit",
    },
    dependencies: {
      "@kothi/core": "workspace:*",
      "@kothi/shared": "workspace:*",
    },
    devDependencies: {
      typescript: "^5.7.3",
    },
  };

  await fs.writeJson(path.join(pluginDir, "package.json"), packageJson, {
    spaces: 2,
  });

  // Generate tsconfig.json
  const tsconfig = {
    extends: "../../../tsconfig.base.json",
    compilerOptions: {
      outDir: "dist",
      rootDir: "src",
      composite: true,
    },
    include: ["src"],
    exclude: ["dist"],
    references: [{ path: "../../../packages/shared" }],
  };

  await fs.writeJson(path.join(pluginDir, "tsconfig.json"), tsconfig, {
    spaces: 2,
  });

  // Generate main plugin file
  const pluginClass = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Plugin`;

  const indexTs = `import { Plugin } from "@kothi/shared";

export class ${pluginClass} implements Plugin {
  async init() {
    console.log("${pluginClass} initialized");
    // Initialize your plugin here
  }

  async onOrderCreate(order: any) {
    console.log("${pluginClass} onOrderCreate", order);
    // Handle order creation
  }

  async onOrderPaid(order: any) {
    console.log("${pluginClass} onOrderPaid", order);
    // Handle order payment
  }
}

// Export the plugin class as default
export default ${pluginClass};
`;

  await fs.writeFile(path.join(pluginDir, "src", "index.ts"), indexTs);

  // Generate README.md
  const readme = `# ${pluginClass}

${options.description || `A Kothi plugin for ${name}`}

## Installation

This plugin is part of the Kothi monorepo. No additional installation required.

## Usage

The plugin is automatically loaded by Kothi's plugin system.

## Development

\`\`\`bash
cd packages/plugins/${name}
pnpm install
pnpm build
\`\`\`

## API

This plugin implements the following Plugin interface methods:

- \`init()\`: Called when the plugin is initialized
- \`onOrderCreate(order)\`: Called when a new order is created
- \`onOrderPaid(order)\`: Called when an order is paid

## License

MIT
`;

  await fs.writeFile(path.join(pluginDir, "README.md"), readme);
}
