import { renderHook, waitFor } from '../../utils/test';
import { makeServer } from '../../../server';
import { Server } from 'miragejs';
import { usePlanets } from '.';

describe('usePlanets hook', () => {
  let server: Server;

  beforeAll(() => {
    server = makeServer();
  });

  afterAll(() => server.shutdown());

  test('fetches and sorts planets alphabetically', async () => {
    const { result } = renderHook(() => usePlanets());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.[0].name).toEqual('Alderaan');
    expect(result.current.data?.[result.current.data.length - 1].name).toEqual(
      'Zolan',
    );
  });

  test('search planet by name', async () => {
    const { result } = renderHook(() =>
      usePlanets({ searchQuery: 'Tatooine' }),
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.[0].name).toEqual('Tatooine');
  });
});
