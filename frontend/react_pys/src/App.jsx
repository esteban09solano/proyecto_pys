import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks';
import { LoginPage, CarrosPage, ViajesPage } from './pages';
import TabNavigation from './components/layout/TabNavigation';
import { TABS } from './utils/constants';

const AppContent = () => {
  
  const [currentPage, setCurrentPage] = useState('carros');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div>
      <TabNavigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        tabs={TABS}
      />
      
      {currentPage === 'carros' ? <CarrosPage /> : <ViajesPage />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;