import { Planet, TransactionStatus } from '../../types';

export interface TransactionsListProps {
  planet?: Planet;
}

type StatusInfo = {
  label: string;
  color: string;
};
export const TransactionStatusDisplay: Record<TransactionStatus, StatusInfo> = {
  inProgress: { label: 'In progress', color: 'dark.1' },
  completed: { label: 'Completed', color: 'green' },
  blocked: { label: 'Blocked', color: 'red' },
};
