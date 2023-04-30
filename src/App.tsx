import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { CharList } from './components/CharList';
import { CharInfoInfinite } from './components/CharInfo';
import { Pagination } from './components/Pagination';

import './App.css';


const queryClient = new QueryClient();

function App() {

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(false);

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

  const togglePagination = (pagination: boolean) => {
    setPagination(pagination)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CharList
        onModal={onModal}
        isPagination={togglePagination}
        currentPage={currentPage}
      />
      <CharInfoInfinite
        selectedId={selectedId}
        onModal={modalOpen}
        closeModal={closeModal}
      />
      <Pagination
        onCurrentPage={onCurrentPage}
        pagination={pagination}
      />
    </QueryClientProvider>
  );
}

export default App;
