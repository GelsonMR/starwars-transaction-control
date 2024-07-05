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
});
