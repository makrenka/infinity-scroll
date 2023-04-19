import { QueryClient, QueryClientProvider } from 'react-query';

import { CharList } from './components/CharList';

import './App.css';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CharList />
    </QueryClientProvider>
  );
}

export default App;
