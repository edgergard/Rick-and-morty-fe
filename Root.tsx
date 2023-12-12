import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { Home } from './src/components/Home/Home';
import { CharacterPage } from './src/components/CharacterPage/CharacterPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Route>
    </Routes>
  </Router>
);
