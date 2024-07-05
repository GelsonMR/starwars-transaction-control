import { PlanetsPage } from './planets/page';
import { Providers } from './utils/providers';

const App = () => {
  return (
    <Providers>
      <PlanetsPage />
    </Providers>
  );
};

export default App;
