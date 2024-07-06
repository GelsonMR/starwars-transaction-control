import { useQuery } from '@tanstack/react-query';
import { getPlanets } from '../../services';
import { UsePlanetsOptions } from './types';
import { normalizeString } from '../../utils';
import { Planet } from '../../types';

export const usePlanets = ({ searchQuery = '' }: UsePlanetsOptions = {}) => {
  const planetsQuery = useQuery({
    queryKey: ['planets'],
    queryFn: getPlanets,
  });

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

  const finalList =
    planetsQuery.data &&
    [sortAlphabetically, filterByName].reduce(
      (acc, func) => func(acc),
      [...planetsQuery.data],
    );

  return {
    ...planetsQuery,
    data: finalList,
  };
};
