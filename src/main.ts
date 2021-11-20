import {OrderProcessor, OrderProcessorOutcome} from './OrderProcessor';
import {Order} from './Order';

/**
 *
 */
async function main() {
  const order: Order = new Order(123, 456);
  const processor: OrderProcessor = new OrderProcessor(order);
  const outcome: OrderProcessorOutcome = await processor.execute();
  console.log(`outcome = ${JSON.stringify(outcome, null, 2)}`);
}

/**
 *
 */
(async () => {
  await main();
})();
