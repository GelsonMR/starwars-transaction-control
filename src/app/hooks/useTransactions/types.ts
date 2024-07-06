import { DateValue } from '@mantine/dates';
import { Currency, TransactionStatus } from '../../types';

export interface UseTransactionsOptions {
  currency?: Currency;
  minDate?: DateValue;
  status?: TransactionStatus;
}
