import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProvidersType } from './types';
import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

const buildProvidersTree = (componentsWithProps: Array<ProvidersType>) => {
  const initialComponent = ({ children }: PropsWithChildren) => <>{children}</>;
  return componentsWithProps.reduce(
    (
      AccumulatedComponents: React.ElementType,
      [Provider, props = {}]: ProvidersType,
    ) => {
      return ({ children }: PropsWithChildren) => {
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
