/**
 *
 */
class Order {
  orderId: number;
  customerId: number;

  public constructor(orderId: number, customerId: number) {
    this.orderId = orderId;
    this.customerId = customerId;
  }
}

export {Order};
