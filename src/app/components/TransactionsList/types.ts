import { Planet, TransactionStatus } from '../../types';

export interface TransactionsListProps {
  planet?: Planet;
}

export const TransactionStatusLabel: Record<TransactionStatus, string> = {
  inProgress: 'In progress',
  completed: 'Completed',
  blocked: 'Blocked',
};
