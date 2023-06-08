import GlobalStyle from './globalStyles';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ObservationsPage from './pages/ObservationsPage';

import Header from './components/Header';

function App() {
  return (
    <>
    <GlobalStyle/>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/observations/:care_recipient_id" element={<ObservationsPage />} />
    </Routes>
    </>
  );
}

export default App;
