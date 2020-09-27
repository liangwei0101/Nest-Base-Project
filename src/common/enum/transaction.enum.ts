/**
 * 业务类型
 */
export enum TransactionTypeEnum {
  Deposit = 'deposit',
  Fx = 'fx',
}

/**
 *
 */
export enum TransactionStatusEnum {
  // 等待XX
  Pending = 'pending',
  // 处理中
  Processing = 'processing',
  // 正常结束
  Closed = 'closed',
  // 取消
  Cancelled = 'cancelled',
  // 失败
  Fail = 'fail',
}
