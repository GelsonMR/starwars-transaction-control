import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../../services';
import { UseTransactionsOptions } from './types';

export const useTransactions = ({ minDate }: UseTransactionsOptions = {}) => {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const sortedTransactions =
    query.data &&
    [...query.data].sort(({ date: dateA }, { date: dateB }) => {
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });

  const jsonDate = minDate?.toJSON();
  const filteredTransactions = !jsonDate
    ? sortedTransactions
    : sortedTransactions?.filter(({ date }) => {
        if (date >= jsonDate) return true;
        return false;
      });

  return {
    ...query,
    data: filteredTransactions,
  };
};
