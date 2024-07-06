export interface BlockTransactionsButtonProps {
  planetName: string;
  disableActions?: boolean;
  onBlock: () => void | Promise<void>;
}
