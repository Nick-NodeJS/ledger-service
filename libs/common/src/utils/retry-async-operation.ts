import { LoggerService } from '@nestjs/common';

export type retryAsyncOperationArgs<T> = {
  operation: (...args: any[]) => Promise<T>;
  args: any[];
  maxRetries: number;
  delay: number;
  logger: LoggerService;
};

export async function retryAsyncOperation<T>({
  operation,
  delay,
  maxRetries,
  logger,
  args,
}): Promise<T> {
  let retries = 1;

  while (retries <= maxRetries) {
    try {
      // Execute the asynchronous operation
      const result = await operation(...args);
      return result; // If successful, return the result
    } catch (error) {
      // If an error occurs, log it
      logger.error(`Attempt ${retries} failed: ${error.message}`);

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
