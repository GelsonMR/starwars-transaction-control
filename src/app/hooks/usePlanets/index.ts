import { useQuery } from '@tanstack/react-query';
import { getPlanets } from '../../services';
import { UsePlanetsOptions } from './types';
import { normalizeString } from '../../utils';
import { Planet } from '../../types';
import { useTransactions } from '../useTransactions';
import Decimal from 'decimal.js';

export const usePlanets = ({ searchQuery = '' }: UsePlanetsOptions = {}) => {
  const planetsQuery = useQuery({
    queryKey: ['planets'],
    queryFn: getPlanets,
  });
  const transactionsQuery = useTransactions();

  const sortAlphabetically = (list: Planet[]) =>
    list.sort(({ name: planetA }, { name: planetB }) => {
      if (planetA < planetB) return -1;
      if (planetA > planetB) return 1;
      return 0;
    });

  const filterByName = (list: Planet[]) =>
    !searchQuery
      ? list
      : list.filter(({ name }) =>
          normalizeString(name).includes(normalizeString(searchQuery)),
        );

  const mapAddingTransactions = (list: Planet[]) =>
    !transactionsQuery.data
      ? list
      : list.map((planet) => {
          const planetTransactions =
            transactionsQuery.data?.filter(
              (transaction) => planet.id === transaction.planet?.id,
            ) || [];

          return {
            ...planet,
            transactions: {
              sum: Decimal.sum(
                0,
                ...planetTransactions.map(({ amount }) => amount),
              ).toNumber(),
              length: planetTransactions.length,
            },
          };
        });

  const sortByTransactions = (list: Planet[]) =>
    list.sort(
      (planetA, planetB) =>
        (planetB.transactions?.length || 0) -
        (planetA.transactions?.length || 0),
    );

  const finalList =
    planetsQuery.data &&
    [
      sortAlphabetically,
      filterByName,
      mapAddingTransactions,
      sortByTransactions,
    ].reduce((acc, func) => func(acc), [...planetsQuery.data]);

  return {
    ...planetsQuery,
    data: finalList,
  };
};
