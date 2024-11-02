import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdvocateList } from './AdvocateList';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AdvocateList />
    </QueryClientProvider>
  );
};
