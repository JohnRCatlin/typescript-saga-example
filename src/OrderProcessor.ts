import {
  SagaBuilder,
  SagaCompensationFailed,
  SagaExecutionFailed,
} from 'node-sagas';
import {Order} from './Order';
import {OrderProcessingEvelope} from './OrderProcessingEvelope';
import {OrderProcessorSteps} from './OrderProcessorSteps';

type OrderProcessorOutcome = OrderProcessingEvelope;

/**
 * The order processing saga.
 */
const OrderProcessorSaga = new SagaBuilder<OrderProcessingEvelope>()
  .step('Create order')
  .invoke(async (order: OrderProcessingEvelope) => {
    await OrderProcessorSteps.placeOrder(order);
  })
  .withCompensation(async (order: OrderProcessingEvelope) => {
    await OrderProcessorSteps.undoPlaceOrder(order);
  })

  .step('Reserve credit')
  .invoke(async (order: OrderProcessingEvelope) => {
    await OrderProcessorSteps.reserveCredit(order);
  })
  .withCompensation(async (order: OrderProcessingEvelope) => {
    await OrderProcessorSteps.undoReserveCredit(order);
  })

  .step('Approve order')
  .invoke(async (order: OrderProcessingEvelope) => {
    await OrderProcessorSteps.approveOrder(order);
  })
  .build();

/**
 * An order processor.
 */
class OrderProcessor {
  private order: Order;

  /**
   * The order to process.
   * @param order
   */
  constructor(order: Order) {
    this.order = order;
  }

  /**
   * Process the order.
   * @returns
   */
  async execute(): Promise<OrderProcessorOutcome> {
    const evelope = new OrderProcessingEvelope(this.order);
    await OrderProcessorSaga.execute(evelope).catch(e => {
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
    return evelope;
  }
}

export {OrderProcessor, OrderProcessorOutcome};
