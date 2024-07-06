import { useQueries } from '@tanstack/react-query';
import { getPlanets, getTransactions } from '../../services';
import { UseTransactionsOptions } from './types';
import {
  filterByCurrency,
  filterByMinDate,
  filterByPlanet,
  filterByStatus,
  mapAddingPlanetToTransactions,
  sortChronologically,
} from './helpers';

export const useTransactions = ({
  planetId,
  currency,
  minDate,
  status,
}: UseTransactionsOptions = {}) => {
  const refetchInterval = 5000;
  const [transactionsQuery, planetsQuery] = useQueries({
    queries: [
      {
        queryKey: ['transactions'],
        queryFn: getTransactions,
        refetchInterval,
      },
      {
        queryKey: ['planets'],
        queryFn: getPlanets,
        refetchInterval,
      },
    ],
  });

  const transactionsWithPlanets = mapAddingPlanetToTransactions(
    transactionsQuery.data,
    planetsQuery.data,
  );

  const filteredTransactions = transactionsWithPlanets?.filter(
    (transaction) => {
      const isExpectedStatus = status
        ? filterByStatus(transaction, status)
        : true;
      const isExpectedCurrency = currency
        ? filterByCurrency(transaction, currency)
        : true;
      const isExpectedMinDate = minDate
        ? filterByMinDate(transaction, minDate.toJSON())
        : true;
      const isExpectedPlanet = planetId
        ? filterByPlanet(transaction, planetId)
        : true;
      return (
        isExpectedStatus &&
        isExpectedCurrency &&
        isExpectedMinDate &&
        isExpectedPlanet
      );
    },
  );

  const finalTransactions = filteredTransactions?.sort(sortChronologically);

  return {
    ...transactionsQuery,
    data: finalTransactions,
  };
};
