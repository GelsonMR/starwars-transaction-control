import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlockTransactionsButton } from '.';
import { render } from '../../utils/test';

describe('BlockTransactionsButton component', () => {
  test('renders the component title', () => {
    render(
      <BlockTransactionsButton planetName="Tatooine" onBlock={() => {}} />,
    );

    const blockButton = screen.getByRole('button');

    expect(blockButton).toBeInTheDocument();
  });

  test('successfully blocks all planet transactions', async () => {
    const onBlock = jest.fn();
    render(<BlockTransactionsButton planetName="Tatooine" onBlock={onBlock} />);

    const blockButton = await screen.findByText(
      /Block transactions of "Tatooine"/i,
    );
    fireEvent.click(blockButton);

    const blockButtonConfirmation =
      await screen.findByText(/Block transactions/i);
    fireEvent.click(blockButtonConfirmation);

    expect(onBlock).toBeCalled();
  });

  test('disables dialog buttons', async () => {
    const onBlock = jest.fn();
    render(
      <BlockTransactionsButton
        disableActions={true}
        planetName="Tatooine"
        onBlock={onBlock}
      />,
    );

    const blockButton = await screen.findByText(
      /Block transactions of "Tatooine"/i,
    );
    fireEvent.click(blockButton);

    const neverMindButton = await screen.findByRole('button', {
      name: /Nevermind/i,
    });

    expect(neverMindButton).toBeDisabled();
  });
});
