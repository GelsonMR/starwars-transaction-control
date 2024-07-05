import { api } from '../../api';
import { Transaction } from '../types';

export const getTransactions = (): Promise<Transaction[]> => {
  return api
    .get('/transactions')
    .then((response) => response.data.transactions);
};
