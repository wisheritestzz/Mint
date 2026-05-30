import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const HomePage = lazy(() => import('./routes/HomePage'));
const IntroPage = lazy(() => import('./routes/IntroPage'));
const TestPage = lazy(() => import('./routes/TestPage'));
const ResultPage = lazy(() => import('./routes/ResultPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <div key={location.pathname} className="page-enter-active">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}
