import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./routes/HomePage'));
const IntroPage = lazy(() => import('./routes/IntroPage'));
const TestPage = lazy(() => import('./routes/TestPage'));
const ResultPage = lazy(() => import('./routes/ResultPage'));

function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#fafafa',
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: '3px solid #e2e8f0',
        borderTopColor: '#4f46e5',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
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
