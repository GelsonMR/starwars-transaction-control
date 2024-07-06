import { DateValue } from '@mantine/dates';
import { Currency, TransactionStatus } from '../../types';

export interface UseTransactionsOptions {
  planetId?: string;
  currency?: Currency;
  minDate?: DateValue;
  status?: TransactionStatus;
  onMutationSuccess?: () => void;
}
