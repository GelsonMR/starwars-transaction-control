import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../services';

export const useTransactions = () => {
  const query = useQuery({
    queryKey: ['Transactions'],
    queryFn: getTransactions,
  });

  const filteredTransactions =
    query.data &&
    [...query.data].sort(({ date: dateA }, { date: dateB }) => {
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });

  return {
    ...query,
    data: filteredTransactions,
  };
};
