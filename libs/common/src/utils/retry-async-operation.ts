import { AnyLogger, retryAsyncOperationArgs } from '../common/types';

export async function retryAsyncOperation<T, L extends AnyLogger>({
  operation,
  delay,
  maxRetries,
  logger,
  args,
}: retryAsyncOperationArgs<T, L>): Promise<T> {
  let retries = 1;

  while (retries <= maxRetries) {
    try {
      // Execute the asynchronous operation
      const result = await operation(...args);
      return result; // If successful, return the result
    } catch (error) {
      // If an error occurs, log it
      logger.warn(`Attempt ${retries} failed: ${error.message}`);

      // If there are remaining retries, wait for the specified delay before retrying
      if (retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay * retries));
      }
    }

    retries++;
  }

  // If all retries are exhausted, throw an error
  throw new Error(`Operation failed after ${maxRetries} attempts`);
}
