// src/components/common/Navbar.tsx
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/matematicas', label: 'Matemáticas' },
  { to: '/naturales', label: 'Ciencias Naturales' },
  { to: '/sociales', label: 'Ciencias Sociales' },
  { to: '/acerca', label: 'Acerca de' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto flex gap-4 p-3">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? 'font-semibold underline' : 'hover:underline'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
        <span className="ml-auto font-medium">UCC · Proyecto Final</span>
      </div>
    </nav>
  );
}
