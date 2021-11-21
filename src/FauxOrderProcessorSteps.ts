import 'reflect-metadata';
import {Service} from 'typedi';

import {OrderProcessingEvelope} from './OrderProcessingEvelope';
import {ProcessConsistencyStatus} from './ProcessConsistencyStatus';
import {StepStatus} from './StepStatus';

/**
 *
 */
@Service()
class FauxOrderProcessorSteps {
  constructor() {}

  /**
   *
   * @param envelope
   */
  async placeOrder(envelope: OrderProcessingEvelope) {
    console.log('place order logic ...');
    if (this.isRandomFail()) {
      envelope.orderPlaced = false;
      envelope.placeOrderStatus = StepStatus.FAIL;
      throw new Error('FAILED (place order logic ...)');
    }
    envelope.orderPlaced = true;
    envelope.placeOrderStatus = StepStatus.SUCCESS;
  }

  /**
   *
   * @param envelope
   */
  async undoPlaceOrder(envelope: OrderProcessingEvelope) {
    console.log('undo place order logic ...');
    if (this.isRandomFail()) {
      envelope.processConsistentStatus = ProcessConsistencyStatus.INCONSISTENT;
      envelope.placeOrderStatus = StepStatus.UNDO_FAIL;
      throw new Error('FAILED (undo place order logic ...)');
    }
    envelope.orderPlaced = false;
    envelope.placeOrderStatus = StepStatus.UNDO_SUCCESS;
  }

  /**
   *
   * @param envelope
   */
  async reserveCredit(envelope: OrderProcessingEvelope) {
    console.log('reserve credit logic ...');
    if (this.isRandomFail()) {
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
  async undoReserveCredit(envelope: OrderProcessingEvelope) {
    console.log('undo reserve credit logic ...');
    if (this.isRandomFail()) {
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
  async approveOrder(envelope: OrderProcessingEvelope) {
    console.log('approve order logic ...');
    if (this.isRandomFail()) {
      envelope.orderApproved = false;
      envelope.approveOrderStatus = StepStatus.FAIL;
      throw new Error('FAILED (approve order logic ...)');
    }
    envelope.orderApproved = true;
    envelope.approveOrderStatus = StepStatus.SUCCESS;
  }

  private isRandomFail(): boolean {
    const failureCoefficient = 4;
    const randomInt = Math.floor(Math.random() * failureCoefficient);
    return randomInt % failureCoefficient === 0 ? true : false;
  }
}

export {FauxOrderProcessorSteps as OrderProcessorSteps};
