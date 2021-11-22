import 'reflect-metadata';
import {Container} from 'typedi';
import {
  OrderProcessorWorkflow,
  OrderProcessorOutcome,
} from './OrderProcessorWorkflow';
import {Order} from './Order';

/**
 *
 */
async function main() {
  const order: Order = new Order(123, 456);
  const workflow = Container.get(OrderProcessorWorkflow);
  const outcome: OrderProcessorOutcome = await workflow.execute(order);
  console.log(`outcome = ${JSON.stringify(outcome, null, 2)}`);
}

/**
 *
 */
(async () => {
  await main();
})();
