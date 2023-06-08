import GlobalStyle from './globalStyles';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <>
    <GlobalStyle/>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
    </>
  );
}

export default App;
