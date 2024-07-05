import { useQuery } from '@tanstack/react-query';
import { getPlanets } from '../services';

export const usePlanets = () => {
  const query = useQuery({
    queryKey: ['planets'],
    queryFn: getPlanets,
  });

  const filteredPlanets =
    query.data &&
    [...query.data].sort(({ name: planetA }, { name: planetB }) => {
      if (planetA < planetB) return -1;
      if (planetA > planetB) return 1;
      return 0;
    });

  return {
    ...query,
    data: filteredPlanets,
  };
};
