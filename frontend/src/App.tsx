import GlobalStyle from './globalStyles';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

import Header from './components/Header';

function App() {
  return (
    <>
    <GlobalStyle/>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </>
  );
}

export default App;
