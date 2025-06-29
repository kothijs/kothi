export interface Plugin {
  init(): Promise<void>;
  onOrderCreate?(order: any): Promise<void>;
  onOrderPaid?(order: any): Promise<void>;
}
