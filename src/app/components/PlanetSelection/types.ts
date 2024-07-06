import { Planet } from '../../types';

export interface PlanetSelectionProps {
  selected?: string;
  onChange?: (planet?: Planet) => void;
}
