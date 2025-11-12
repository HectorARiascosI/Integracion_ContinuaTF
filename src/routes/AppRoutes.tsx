// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';


import Navbar from '../components/common/Navbar';
const Home = lazy(() => import('../pages/Home'));
const Matematicas = lazy(() => import('../pages/Matematicas'));
const Naturales = lazy(() => import('../pages/Naturales'));
const Sociales = lazy(() => import('../pages/Sociales'));
const About = lazy(() => import('../pages/About'));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="p-4">Cargando…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matematicas" element={<Matematicas />} />
          <Route path="/naturales" element={<Naturales />} />
          <Route path="/sociales" element={<Sociales />} />
          <Route path="/acerca" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
