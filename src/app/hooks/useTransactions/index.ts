import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../../services';
import { UseTransactionsOptions } from './types';
import { Transaction } from '../../types';
import { usePlanets } from '../usePlanets';

export const useTransactions = ({
  planetId,
  currency,
  minDate,
  status,
}: UseTransactionsOptions = {}) => {
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });
  const planetsQuery = usePlanets();

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

  const filterByCurrency = (list: Transaction[]) =>
    !currency
      ? list
      : list.filter(({ currency: tCurrency }) => currency === tCurrency);

  const getPlanetByUser = (userId: string) =>
    planetsQuery.data?.[
      planetsQuery.data.findIndex(({ residents }) => residents.includes(userId))
    ];

  const mapAddingPlanetToTransactions = (list: Transaction[]) =>
    list?.map((transaction) => {
      const planet = getPlanetByUser(transaction.user.toString());
      return {
        ...transaction,
        planet,
      };
    });

  const filterByPlanet = (list: Transaction[]) =>
    !planetId ? list : list.filter(({ planet }) => planet?.id === planetId);

  const finalList =
    transactionsQuery.data &&
    [
      sortChronologically,
      filterByMinDate,
      filterByStatus,
      filterByCurrency,
      mapAddingPlanetToTransactions,
      filterByPlanet,
    ].reduce((acc, func) => func(acc), [...transactionsQuery.data]);

  return {
    ...transactionsQuery,
    data: finalList,
  };
};
