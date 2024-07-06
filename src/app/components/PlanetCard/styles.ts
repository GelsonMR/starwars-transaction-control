import styled from 'styled-components';
import { CardContainerProps } from './types';

export const CardContainer = styled.div<CardContainerProps>`
  border-radius: var(--mantine-radius-sm);
  color: ${({ $selected }) =>
    $selected
      ? 'var(--mantine-color-blue-filled)'
      : 'var(--mantine-color-text)'};
  border: ${({ $selected }) =>
    $selected
      ? '2px solid var(--mantine-color-blue-filled)'
      : '1px solid var(--mantine-color-gray-3)'};
  cursor: pointer;
  box-shadow: ${({ $selected }) =>
    $selected ? 'var(--mantine-shadow-sm)' : 'none'};
  width: 150px;
  height: 150px;
  transition: 200ms ease-in-out;

  &:hover {
    box-shadow: var(--mantine-shadow-sm);
  }
`;
