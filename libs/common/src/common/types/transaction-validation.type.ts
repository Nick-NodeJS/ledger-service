import { BadTransactionReason } from "@app/common/enums"

export type TransactionValidation = {
  isValid: boolean,
  reason?: BadTransactionReason,
}