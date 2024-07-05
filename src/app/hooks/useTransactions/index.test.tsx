import { useTransactions } from './';
import { renderHook, waitFor } from '../../utils/test';
import { makeServer } from '../../../server';
import { Server } from 'miragejs';

describe('useTransactions hook', () => {
  let server: Server;

  beforeAll(() => {
    server = makeServer();
  });

  afterAll(() => server.shutdown());

  test('fetches and sorts transactions chronologically', async () => {
    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const latestTransactionDate = result.current.data?.[0].date || '';
    const earliestTransactionDate =
      result.current.data?.[result.current.data.length - 1].date || '';

    expect(earliestTransactionDate).not.toEqual('');
    expect(latestTransactionDate).not.toEqual('');
    expect(earliestTransactionDate < latestTransactionDate).toEqual(true);
  });

  test('show transactions after specific date', async () => {
    const minDate = new Date(2024, 11, 30);
    const { result } = renderHook(() => useTransactions({ minDate }));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const firstTransactionDate = result.current.data?.[0].date || '';

    expect(firstTransactionDate >= minDate.toJSON()).toBeTruthy();
  });

  test('return no transactions', async () => {
    const minDate = new Date(2025, 0, 1);
    const { result } = renderHook(() => useTransactions({ minDate }));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toHaveLength(0);
  });
});
