import { QueryClient, QueryClientProvider } from 'react-query';
import { UsersPage } from './pages';

import './app.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>
  );
}

export default App;
