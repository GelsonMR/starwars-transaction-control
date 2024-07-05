import { api } from '../../api';
import { Planet } from '../types';

export const getPlanets = (): Promise<Planet[]> => {
  return api.get('/planets').then((response) => response.data.planets);
};
