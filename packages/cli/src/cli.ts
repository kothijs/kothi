#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { generatePlugin } from "./generators/plugin";

const program = new Command();

program
  .name("kothi")
  .description("Kothi.js - Restaurant Backend Framework CLI")
  .version("0.1.0");

program
  .command("generate")
  .alias("g")
  .description("Generate a new Kothi plugin")
  .argument("<name>", "Plugin name (e.g., payment-gateway)")
  .option("-d, --description <description>", "Plugin description")
  .option("-a, --author <author>", "Plugin author")
  .action(async (name: string, options: any) => {
    try {
      await generatePlugin(name, options);
      console.log(chalk.green(`✓ Plugin "${name}" generated successfully!`));
      console.log(chalk.blue("\nNext steps:"));
      console.log(chalk.blue(`1. cd packages/plugins/${name}`));
      console.log(chalk.blue("2. pnpm install"));
      console.log(chalk.blue("3. pnpm build"));
      console.log(chalk.blue("4. Start developing your plugin!"));
    } catch (error) {
      console.error(chalk.red("Failed to generate plugin:"), error);
      process.exit(1);
    }
  });

program.parse();
