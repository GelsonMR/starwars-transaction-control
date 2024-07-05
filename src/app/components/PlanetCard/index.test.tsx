import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanetCard } from '.';
import { render } from '../../utils/test';

describe('PlanetCard component', () => {
  test('renders the component title', () => {
    render(
      <PlanetCard
        planet={{
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
        }}
      />,
    );

    const title = screen.getByText(/Tatooine/i);

    expect(title).toBeInTheDocument();
  });

  test('renders default title', () => {
    render(<PlanetCard />);

    const title = screen.getByText(/All planets/i);

    expect(title).toBeInTheDocument();
  });
});
