import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanetsPage } from './page';
import { render } from '../utils/test';

describe('PlanetsPage component', () => {
  test('renders the correct greeting message', () => {
    render(<PlanetsPage />);

    const greetingElement = screen.getByText(/Planets/i);

    expect(greetingElement).toBeInTheDocument();
  });
});
