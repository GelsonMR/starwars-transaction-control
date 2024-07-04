import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <h1
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        Ledn frontend challenge
      </h1>
    </QueryClientProvider>
  );
};

export default App;
