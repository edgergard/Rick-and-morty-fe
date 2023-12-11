import './utils/normalize.scss';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { FAB } from './components/FAB/FAB';
import { HistoryDrawer } from './components/History/HistoryDrawer';

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
