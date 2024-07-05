import { api } from './api';
import { Planet, Transaction } from './types';

export const getPlanets = (): Promise<Planet[]> => {
  return api.get('/planets').then((response) => response.data.planets);
};

export const getTransactions = (): Promise<Transaction[]> => {
  return api
    .get('/transactions')
    .then((response) => response.data.transactions);
};
