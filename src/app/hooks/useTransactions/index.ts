import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../../services';
import { UseTransactionsOptions } from './types';
import { Transaction } from '../../types';

export const useTransactions = ({
  minDate,
  status,
}: UseTransactionsOptions = {}) => {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const sortChronologically = (list: Transaction[]) =>
    list.sort(({ date: dateA }, { date: dateB }) => {
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });

  const jsonDate = minDate?.toJSON();
  const filterByMinDate = (list: Transaction[]) =>
    !jsonDate ? list : list.filter(({ date }) => date >= jsonDate);

  const filterByStatus = (list: Transaction[]) =>
    !status ? list : list.filter(({ status: tStatus }) => status === tStatus);

  const finalList =
    query.data &&
    [sortChronologically, filterByMinDate, filterByStatus].reduce(
      (acc, func) => func(acc),
      [...query.data],
    );

  return {
    ...query,
    data: finalList,
  };
};
