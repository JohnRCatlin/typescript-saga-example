import 'reflect-metadata';
import {Service} from 'typedi';

import {
  SagaBuilder,
  SagaCompensationFailed,
  SagaExecutionFailed,
} from 'node-sagas';
import {Order} from './Order';
import {OrderProcessingEvelope} from './OrderProcessingEvelope';
import {OrderProcessorSteps} from './FauxOrderProcessorSteps';

type OrderProcessorOutcome = OrderProcessingEvelope;

/**
 * An order processor.
 */
@Service()
class OrderProcessor {
  constructor(private stepsProcessor: OrderProcessorSteps) {}

  private saga = new SagaBuilder<OrderProcessingEvelope>()
    .step('Create order')
    .invoke(async (order: OrderProcessingEvelope) => {
      await this.stepsProcessor.placeOrder(order);
    })
    .withCompensation(async (order: OrderProcessingEvelope) => {
      await this.stepsProcessor.undoPlaceOrder(order);
    })

    .step('Reserve credit')
    .invoke(async (order: OrderProcessingEvelope) => {
      await this.stepsProcessor.reserveCredit(order);
    })
    .withCompensation(async (order: OrderProcessingEvelope) => {
      await this.stepsProcessor.undoReserveCredit(order);
    })

    .step('Approve order')
    .invoke(async (order: OrderProcessingEvelope) => {
      await this.stepsProcessor.approveOrder(order);
    })
    .build();

  /**
   * Process the order.
   * @returns
   */
  async execute(order: Order): Promise<OrderProcessorOutcome> {
    const envelope = new OrderProcessingEvelope(order);
    await this.saga.execute(envelope).catch(e => {
      if (e instanceof SagaExecutionFailed) {
        //processing failure.
        //revert success.
        console.log(e.message);
      } else if (e instanceof SagaCompensationFailed) {
        //processing failure.
        //revert failure.
        console.log(e.message);
      }
    });
    return envelope;
  }
}

export {OrderProcessor, OrderProcessorOutcome};
