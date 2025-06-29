import { Plugin } from "@kothi/shared";

export class KotPrinterPlugin implements Plugin {
  async init() {
    console.log("KotPrinterPlugin initialized");
  }
  async onOrderCreate(order: any) {
    console.log("KotPrinterPlugin onOrderCreate", order);
  }
}

// KOT Printer plugin for Kothi framework will go here.
export const kotPrinterVersion = "0.1.0";
