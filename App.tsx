import './src/utils/normalize.scss';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './src/components/Footer/Footer';
import { Header } from './src/components/Header/Header';
import { FAB } from './src/components/FAB/FAB';
import { HistoryDrawer } from './src/components/History/HistoryDrawer';

function App() {
  return (
    <>
      <Header />
      <HistoryDrawer />
      <Outlet />
      <FAB />
      <Footer />
    </>
  );
}

export default App;
