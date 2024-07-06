import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardPage } from '.';
import { render } from '../../utils/test';
import { makeServer } from '../../../server';
import { Server } from 'miragejs';

describe('DashboardPage component', () => {
  let server: Server;

  beforeAll(() => {
    server = makeServer();
  });

  afterAll(() => server.shutdown());

  test('change the selected planet', async () => {
    render(<DashboardPage />);

    const planetCard = (await screen.findAllByText(/Tatooine/i))[0];

    fireEvent.click(planetCard);

    const transactionLines = await screen.findAllByRole('row');

    expect(transactionLines).toHaveLength(20);
  });
});
