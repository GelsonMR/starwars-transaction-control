import { TransactionStatus } from '../../types';

export interface TransactionsListProps {}

export const TransactionStatusLabel: Record<TransactionStatus, string> = {
  inProgress: 'In progress',
  completed: 'Completed',
  blocked: 'Blocked',
};
