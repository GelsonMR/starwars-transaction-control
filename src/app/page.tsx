import { useState } from 'react';
import { Providers } from './utils/providers';
import { PlanetSelection } from './components/PlanetSelection';
import { TransactionsList } from './components/TransactionsList';

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
      <TransactionsList planetId={planetId} />
    </Providers>
  );
};

export default App;
