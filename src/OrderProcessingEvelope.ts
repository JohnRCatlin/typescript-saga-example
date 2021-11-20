import {Order} from './Order';
import {ProcessConsistencyStatus as ProcessConsistentStatus} from './ProcessConsistencyStatus';
import {StepStatus} from './StepStatus';

/**
 *
 */
class OrderProcessingEvelope {
  order: Order;

  orderPlaced: boolean;
  creditReserved: boolean;
  orderApproved: boolean;

  placeOrderStatus: StepStatus;
  reserveCreditStatus: StepStatus;
  approveOrderStatus: StepStatus;

  processConsistentStatus: ProcessConsistentStatus;

  /**
   *
   * @param order
   */
  public constructor(order: Order) {
    this.order = order;

    this.orderPlaced = false;
    this.creditReserved = false;
    this.orderApproved = false;

    this.placeOrderStatus = StepStatus.NONE;
    this.reserveCreditStatus = StepStatus.NONE;
    this.approveOrderStatus = StepStatus.NONE;

    this.processConsistentStatus = ProcessConsistentStatus.CONSISTENT;
  }
}

export {OrderProcessingEvelope};
