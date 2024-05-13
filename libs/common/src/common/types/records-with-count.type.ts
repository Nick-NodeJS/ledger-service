export type WithCount<T> = {
  records: T[];
  count: number | undefined;
};
