import { DateValue } from '@mantine/dates';

export interface UseTransactionsOptions {
  minDate?: DateValue;
  status?: TransactionStatus;
}

export type TransactionStatus = 'inProgress' | 'completed' | 'blocked';

export const TransactionStatusLabel: Record<TransactionStatus, string> = {
  inProgress: 'In progress',
  completed: 'Completed',
  blocked: 'Blocked',
};
