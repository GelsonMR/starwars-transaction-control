import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from './utils/test';
import { App } from '.';

describe('App component', () => {
  test('renders app title', () => {
    render(<App />);

    const title = screen.getByText(/Coruscant's bank transaction control/i);

    expect(title).toBeInTheDocument();
  });
});
