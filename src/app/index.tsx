import { DashboardPage } from './components/DashboardPage';
import { Providers } from './utils/providers';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export const App = () => {
  return (
    <Providers>
      <DashboardPage />
    </Providers>
  );
};
