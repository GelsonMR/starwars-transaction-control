import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChildrenType, ProvidersType } from './types';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const buildProvidersTree = (componentsWithProps: Array<ProvidersType>) => {
  const initialComponent = ({ children }: ChildrenType) => <>{children}</>;
  return componentsWithProps.reduce(
    (
      AccumulatedComponents: React.ElementType,
      [Provider, props = {}]: ProvidersType,
    ) => {
      return ({ children }: ChildrenType) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent,
  );
};

const queryClient = new QueryClient();
const theme = createTheme({});

export const Providers = buildProvidersTree([
  [MantineProvider, { theme }],
  [QueryClientProvider, { client: queryClient }],
]);
