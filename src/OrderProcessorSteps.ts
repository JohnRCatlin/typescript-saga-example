import {OrderProcessingEvelope} from './OrderProcessingEvelope';
import {ProcessConsistencyStatus} from './ProcessConsistencyStatus';
import {StepStatus} from './StepStatus';

/**
 *
 */
class OrderProcessorSteps {
  /**
   *
   * @param evelope
   */
  static async createOrder(evelope: OrderProcessingEvelope) {
    console.log('create order logic ...');
    if (isRandomFail()) {
      evelope.orderCreateStatus = StepStatus.FAIL;
      throw new Error('FAILED (create order logic)');
    }
    evelope.orderCreateStatus = StepStatus.SUCCESS;
    console.log('SUCCESS (create order logic)');
  }

  /**
   *
   * @param evelope
   */
  static async compensateCreateOrder(evelope: OrderProcessingEvelope) {
    console.log('compensate create order logic ...');
    if (isRandomFail()) {
      evelope.processConsistencyStatus = ProcessConsistencyStatus.INCONSISTENT;
      throw new Error('FAILED (compensate create order logic)');
    }
    evelope.processConsistencyStatus = ProcessConsistencyStatus.CONSISTENT;
    console.log('SUCCESS (compensate create order logic)');
  }

  /**
   *
   * @param evelope
   */
  static async reserveCredit(evelope: OrderProcessingEvelope) {
    console.log('reserve credit logic ...');
    if (isRandomFail()) {
      evelope.creditReserveStatus = StepStatus.FAIL;
      throw new Error('FAILED (reserve credit logic)');
    }
    evelope.creditReserveStatus = StepStatus.SUCCESS;
    console.log('SUCCESS (reserve credit logic)');
  }

  /**
   *
   * @param evelope
   */
  static async orderApproval(evelope: OrderProcessingEvelope) {
    console.log('approve order logic ...');
    if (isRandomFail()) {
      evelope.orderApprovalStatus = StepStatus.FAIL;
      throw new Error('FAILED (approve order logic)');
    }
    evelope.orderApprovalStatus = StepStatus.SUCCESS;
    console.log('SUCCESS (approve order logic)');
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
