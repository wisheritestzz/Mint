import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './routes/HomePage';
import IntroPage from './routes/IntroPage';
import TestPage from './routes/TestPage';
import ResultPage from './routes/ResultPage';

export default function App() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter-active">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}
