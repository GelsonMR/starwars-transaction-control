import { useQuery } from '@tanstack/react-query';
import { getPlanets } from '../../services';
import { UsePlanetsOptions } from './types';
import { normalizeString } from '../../utils';

export const usePlanets = ({ searchQuery = '' }: UsePlanetsOptions = {}) => {
  const query = useQuery({
    queryKey: ['planets'],
    queryFn: getPlanets,
  });

  const filteredPlanets =
    query.data &&
    [...query.data]
      .sort(({ name: planetA }, { name: planetB }) => {
        if (planetA < planetB) return -1;
        if (planetA > planetB) return 1;
        return 0;
      })
      .filter(({ name }) =>
        normalizeString(name).includes(normalizeString(searchQuery)),
      );

  return {
    ...query,
    data: filteredPlanets,
  };
};
