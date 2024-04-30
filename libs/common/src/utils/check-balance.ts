export function checkBalance(
  balance: number,
  transactionAmount: number,
): boolean {
  return balance > transactionAmount;
}
