import { DateValue } from '@mantine/dates';
import { TransactionStatus } from '../../types';

export interface UseTransactionsOptions {
  minDate?: DateValue;
  status?: TransactionStatus;
}
