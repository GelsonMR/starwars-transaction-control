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

  test('fetches and sorts planets by transaction length', async () => {
    const { result } = renderHook(() => usePlanets());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const firstPlanet = result.current.data?.[0];
    const lastPlanet = result.current.data?.[result.current.data.length - 1];
    expect(firstPlanet?.name).toEqual('Tatooine');
    expect(lastPlanet?.name).toEqual('Yavin IV');
    expect(
      (firstPlanet?.transactions?.length || 0) >
        (lastPlanet?.transactions?.length || 0),
    ).toBeTruthy();
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

  test('planets have ICS and GCS values', async () => {
    const { result } = renderHook(() => usePlanets());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const currencies = result.current.data?.[0].transactions?.currencies;
    expect(currencies?.ICS.sum).toEqual(92885.553794);
    expect(currencies?.GCS.sum).toEqual(-11811.8823);
  });
});
