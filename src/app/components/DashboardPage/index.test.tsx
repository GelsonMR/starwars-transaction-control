import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardPage } from '.';
import { render } from '../../utils/test';

describe('DashboardPage component', () => {
  test('renders default title', () => {
    render(<DashboardPage />);

    const title = screen.getByText(/Coruscan's bank transaction control/i);

    expect(title).toBeInTheDocument();
  });
});
