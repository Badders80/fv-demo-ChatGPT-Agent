import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { MyStable } from './pages/MyStable';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mystable" element={<MyStable />} />
      <Route path="/callback" element={<div>Authenticating...</div>} />
    </Routes>
  );
}
