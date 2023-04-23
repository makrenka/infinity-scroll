import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { CharList } from './components/CharList';
import { CharInfo } from './components/CharInfo';
import { Pagination } from './components/Pagination';

import './App.css';


const queryClient = new QueryClient();

function App() {

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onModal = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CharList onModal={onModal} />
      <CharInfo
        selectedId={selectedId}
        onModal={modalOpen}
        closeModal={closeModal}
      />
      <Pagination
        onCurrentPage={onCurrentPage}
      />
    </QueryClientProvider>
  );
}

export default App;
