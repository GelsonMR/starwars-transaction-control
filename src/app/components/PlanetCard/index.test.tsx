import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanetCard } from '.';
import { render } from '../../utils/test';

describe('PlanetCard component', () => {
  const planetMock = {
    name: 'Tatooine',
    rotation_period: '',
    orbital_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    population: '',
    residents: [''],
    films: [''],
    created: '',
    edited: '',
    id: '',
    transactions: {
      sum: 1000,
      length: 15,
    },
  };
  test('renders default title', () => {
    render(<PlanetCard />);

    const title = screen.getByText(/All planets/i);

    expect(title).toBeInTheDocument();
  });

  test('renders planet name', () => {
    render(<PlanetCard planet={planetMock} />);

    const title = screen.getByText(/Tatooine/i);

    expect(title).toBeInTheDocument();
  });

  test('renders planet transaction info', () => {
    render(<PlanetCard planet={planetMock} />);

    const transactionLength = screen.getByText(/15 transactions/i);
    const transactionSum = screen.getByText(/\$ 1000/i);

    expect(transactionLength).toBeInTheDocument();
    expect(transactionSum).toBeInTheDocument();
  });

  test('renders planet transaction length on singular', () => {
    render(
      <PlanetCard
        planet={{
          ...planetMock,
          transactions: {
            sum: 1,
            length: 1,
          },
        }}
      />,
    );

    const transactionLength = screen.getByText(/1 transaction/i);

    expect(transactionLength).toBeInTheDocument();
  });
});
