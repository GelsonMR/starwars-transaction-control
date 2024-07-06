import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TransactionsList } from '.';
import { render } from '../../utils/test';
import { makeServer } from '../../../server';
import { Server } from 'miragejs';

describe('TransactionsList component', () => {
  let server: Server;

  beforeAll(() => {
    server = makeServer();
  });

  afterAll(() => server.shutdown());

  test('renders the component title', () => {
    render(<TransactionsList />);

    const title = screen.getByText(/Transactions/i);

    expect(title).toBeInTheDocument();
  });

  test('show no transactions message', async () => {
    render(<TransactionsList />);

    fireEvent.change(screen.getByLabelText(/Only after date/i), {
      target: {
        value: 'January 1, 2025',
      },
    });

    const noTransactionsMessage = await screen.findByText(/No transactions/i);

    expect(noTransactionsMessage).toBeInTheDocument();
  });

  test('show only transactions in progress', async () => {
    render(<TransactionsList />);

    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('In progress');
  });

  test('show only blocked transactions', async () => {
    render(<TransactionsList />);
    fireEvent.click(screen.getByRole('textbox', { name: 'Status' }));

    fireEvent.click(screen.getByRole('option', { name: 'Blocked' }));

    const table = screen.getByRole('table');
    expect(table).not.toHaveTextContent('In progress');
    expect(table).toHaveTextContent('Blocked');
  });

  test('show only transactions in ICS currency', async () => {
    render(<TransactionsList />);

    const table = screen.getByRole('table');
    expect(table).not.toHaveTextContent('GCS');
    expect(table).toHaveTextContent('ICS');
  });

  test('show only transactions in all currencies', async () => {
    render(<TransactionsList />);
    fireEvent.click(screen.getByRole('textbox', { name: 'Currency' }));

    fireEvent.click(screen.getByRole('option', { name: 'All currencies' }));

    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('ICS');
    expect(table).toHaveTextContent('GCS');
  });
});
