import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@futureverse/auth-react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { MyStable } from './pages/MyStable';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userSession } = useAuth();
  return userSession ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mystable" element={<ProtectedRoute><MyStable /></ProtectedRoute>} />
      <Route path="/callback" element={<div>Authenticating...</div>} />
    </Routes>
  );
}
