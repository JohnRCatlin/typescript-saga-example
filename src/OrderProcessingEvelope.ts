import {Order} from './Order';
import {ProcessConsistencyStatus} from './ProcessConsistencyStatus';
import {StepStatus} from './StepStatus';

/**
 *
 */
class OrderProcessingEvelope {
  order: Order;

  processConsistencyStatus: ProcessConsistencyStatus;
  orderCreateStatus: StepStatus;
  orderApprovalStatus: StepStatus;
  creditReserveStatus: StepStatus;

  /**
   *
   * @param order
   */
  public constructor(order: Order) {
    this.order = order;
    this.processConsistencyStatus = ProcessConsistencyStatus.CONSISTENT;
    this.processConsistencyStatus = ProcessConsistencyStatus.CONSISTENT;
    this.orderCreateStatus = StepStatus.NONE;
    this.orderApprovalStatus = StepStatus.NONE;
    this.creditReserveStatus = StepStatus.NONE;
  }
}

export {OrderProcessingEvelope};
