import { Planet } from '../../types';

export interface PlanetCardProps extends React.HTMLProps<HTMLDivElement> {
  planet?: Planet;
  selected?: boolean;
}

export interface CardContainerProps {
  $selected: boolean;
}
