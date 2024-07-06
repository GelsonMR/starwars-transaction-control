export type TransactionStatus = 'inProgress' | 'completed' | 'blocked';

export type Currency = 'ICS' | 'GCS';

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  currency: Currency;
  date: string;
  status: TransactionStatus;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  id: string;
}
