import { api } from './api';
import { Planet, Transaction, TransactionStatus } from './types';

export const getPlanets = (): Promise<Planet[]> =>
  api.get('/planets').then((response) => response.data.planets);

export const getTransactions = (): Promise<Transaction[]> =>
  api.get('/transactions').then((response) => response.data.transactions);

export const updateTransactions = (
  transactions: Transaction[],
  status: TransactionStatus,
) => {
  api
    .put('/transactions/update-batch', {
      transactions: transactions.map(
        ({ id, user, amount, currency, date }) => ({
          id,
          user,
          amount,
          currency,
          date,
          status,
        }),
      ),
    })
    .then((response) => response.data.transactions);
};
