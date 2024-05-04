export type retryAsyncOperationArgs<T, L> = {
  operation: (...args: any[]) => Promise<T>;
  args: any[];
  maxRetries: number;
  delay: number;
  logger: L;
};
