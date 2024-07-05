import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanetsSelection } from './';
import { render } from '../../utils/test';

describe('PlanetsSelection component', () => {
  test('renders the component title', () => {
    render(<PlanetsSelection />);

    const greetingElement = screen.getByText(/Planets/i);

    expect(greetingElement).toBeInTheDocument();
  });
});
