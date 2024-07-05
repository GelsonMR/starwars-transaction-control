import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanetSelection } from '.';
import { render } from '../../utils/test';
import { makeServer } from '../../../server';
import { Server } from 'miragejs';

describe('PlanetSelection component', () => {
  let server: Server;

  beforeAll(() => {
    server = makeServer();
  });

  afterAll(() => server.shutdown());

  test('renders the component title', () => {
    render(<PlanetSelection />);

    const title = screen.getByText(/Planets/i);

    expect(title).toBeInTheDocument();
  });

  test('triggers planet selection', async () => {
    const onChange = jest.fn();

    render(<PlanetSelection onChange={onChange} />);

    const planetCard = await screen.findByText(/Tatooine/i);
    fireEvent.click(planetCard);

    expect(onChange).toHaveBeenCalled();
  });

  test('selects all planets', async () => {
    const onChange = jest.fn();

    render(<PlanetSelection selected="1" onChange={onChange} />);

    const allPlanetsCard = await screen.findByText(/All planets/i);
    fireEvent.click(allPlanetsCard);

    expect(onChange).toHaveBeenCalledWith(undefined);
  });
});
