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
    id: '1',
    transactions: {
      currencies: {
        ICS: {
          sum: 900,
          length: 10,
        },
        GCS: {
          sum: 100,
          length: 5,
        },
      },
      sum: 1000,
      length: 15,
    },
  };
  test('renders default title', () => {
    render(<PlanetCard />);

    const title = screen.getByText(/All planets/i);

    expect(title).toBeInTheDocument();
  });

  test('renders planet name and ID', () => {
    render(<PlanetCard planet={planetMock} />);

    const title = screen.getByText(/Tatooine/i);
    const id = screen.getByText(/ID: 1/i);

    expect(title).toBeInTheDocument();
    expect(id).toBeInTheDocument();
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

  test('renders planet ICS and GCS transaction amount', () => {
    render(<PlanetCard planet={planetMock} />);

    const ICSAmount = screen.getByText(/ICS 900/i);
    const GCSAmount = screen.getByText(/GCS 100/i);

    expect(ICSAmount).toBeInTheDocument();
    expect(GCSAmount).toBeInTheDocument();
  });
});
