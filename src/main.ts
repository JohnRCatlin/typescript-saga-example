import 'reflect-metadata';
import {Container} from 'typedi';
import {OrderProcessor, OrderProcessorOutcome} from './OrderProcessor';
import {Order} from './Order';

/**
 *
 */
async function main() {
  const order: Order = new Order(123, 456);
  const processor = Container.get(OrderProcessor);
  const outcome: OrderProcessorOutcome = await processor.execute(order);
  console.log(`outcome = ${JSON.stringify(outcome, null, 2)}`);
}

/**
 *
 */
(async () => {
  await main();
})();
