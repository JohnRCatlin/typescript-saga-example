import {OrderProcessingEvelope} from './OrderProcessingEvelope';
import {ProcessConsistencyStatus} from './ProcessConsistencyStatus';
import {StepStatus} from './StepStatus';

/**
 *
 */
class OrderProcessorSteps {
  /**
   *
   * @param envelope
   */
  static async placeOrder(envelope: OrderProcessingEvelope) {
    console.log('create order logic ...');
    if (isRandomFail()) {
      envelope.orderPlaced = false;
      envelope.placeOrderStatus = StepStatus.FAIL;
      throw new Error('FAILED (create order logic ...)');
    }
    envelope.orderPlaced = true;
    envelope.placeOrderStatus = StepStatus.SUCCESS;
  }

  /**
   *
   * @param envelope
   */
  static async undoPlaceOrder(envelope: OrderProcessingEvelope) {
    console.log('undo create order logic ...');
    if (isRandomFail()) {
      envelope.processConsistentStatus = ProcessConsistencyStatus.INCONSISTENT;
      envelope.placeOrderStatus = StepStatus.UNDO_FAIL;
      throw new Error('FAILED (undo create order logic ...)');
    }
    envelope.orderPlaced = false;
    envelope.placeOrderStatus = StepStatus.UNDO_SUCCESS;
  }

  /**
   *
   * @param envelope
   */
  static async reserveCredit(envelope: OrderProcessingEvelope) {
    console.log('reserve credit logic ...');
    if (isRandomFail()) {
      envelope.creditReserved = false;
      envelope.reserveCreditStatus = StepStatus.FAIL;
      throw new Error('FAILED (reserve credit logic ...)');
    }
    envelope.creditReserved = true;
    envelope.reserveCreditStatus = StepStatus.SUCCESS;
  }

  /**
   *
   * @param envelope
   */
  static async undoReserveCredit(envelope: OrderProcessingEvelope) {
    console.log('undo reserve credit logic ...');
    if (isRandomFail()) {
      envelope.reserveCreditStatus = StepStatus.UNDO_FAIL;
      envelope.processConsistentStatus = ProcessConsistencyStatus.INCONSISTENT;
      throw new Error('FAILED (undo reserve credit logic ...)');
    }
    envelope.creditReserved = false;
    envelope.reserveCreditStatus = StepStatus.UNDO_SUCCESS;
  }

  /**
   *
   * @param envelope
   */
  static async approveOrder(envelope: OrderProcessingEvelope) {
    console.log('approve order logic ...');
    if (isRandomFail()) {
      envelope.orderApproved = false;
      envelope.approveOrderStatus = StepStatus.FAIL;
      throw new Error('FAILED (approve order logic ...)');
    }
    envelope.orderApproved = true;
    envelope.approveOrderStatus = StepStatus.SUCCESS;
  }
}

/**
 *
 * @returns
 */
function isRandomFail(): boolean {
  const failureCoefficient = 4;
  const randomInt = Math.floor(Math.random() * failureCoefficient);
  return randomInt % failureCoefficient === 0 ? true : false;
}

export {OrderProcessorSteps};
