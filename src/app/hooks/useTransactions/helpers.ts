import { Currency, Planet, Transaction, TransactionStatus } from '../../types';

export const getPlanetByUser = (userId: string, planets: Planet[]) =>
  planets?.[planets.findIndex(({ residents }) => residents.includes(userId))];

export const mapAddingPlanetToTransactions = (
  list?: Transaction[],
  planets?: Planet[],
) =>
  list &&
  planets &&
  list.map((transaction) => {
    const planet = getPlanetByUser(transaction.user.toString(), planets);
    return {
      ...transaction,
      planet,
    };
  });

export const filterByPlanet = (transaction: Transaction, planetId: string) =>
  transaction.planet?.id === planetId;

export const filterByStatus = (
  transaction: Transaction,
  chosenStatus: TransactionStatus,
) => transaction.status === chosenStatus;

export const filterByCurrency = (
  transaction: Transaction,
  currency: Currency,
) => transaction.currency === currency;

export const filterByMinDate = (transaction: Transaction, minDate: string) =>
  transaction.date >= minDate;

export const sortChronologically = (
  { date: dateA }: Transaction,
  { date: dateB }: Transaction,
) => {
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
};
