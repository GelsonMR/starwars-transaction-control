import { useState } from 'react';
import { PlanetSelection } from './components/PlanetSelection';
import { Providers } from './utils/providers';

const App = () => {
  const [planetId, setPlanetId] = useState<string>();
  return (
    <Providers>
      <PlanetSelection
        selected={planetId}
        onChange={(planet) => {
          setPlanetId(planet?.id);
        }}
      />
    </Providers>
  );
};

export default App;
