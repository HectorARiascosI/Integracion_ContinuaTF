// @ts-ignore - React necesario para JSX en Jest
import React, { useState } from 'react';
import ColorMixer from './components/Arte/ColorMixer/ColorMixer';
import MultiplicationTable from './components/Matematicas/MultiplicationTable/MultiplicationTable';
import WaterCycle from './components/CienciasNaturales/WaterCycle/WaterCycle';

type Page = 'home' | 'colors' | 'multiplication' | 'water';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'colors':
        return <ColorMixer />;
      case 'multiplication':
        return <MultiplicationTable />;
      case 'water':
        return <WaterCycle />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
              <h1 className="text-5xl font-bold text-center text-blue-600 mb-4">
                🎓 Colegio Mentes Creativas
              </h1>
              <p className="text-xl text-center text-gray-600 mb-12">
                Aplicación Educativa Multimedia - 4° y 5° Grado
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setCurrentPage('colors')}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-8 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-5xl mb-3">🎨</div>
                  <div className="text-xl">Arte</div>
                  <div className="text-sm mt-2 opacity-90">
                    Mezclador de Colores
                  </div>
                </button>

                <button
                  onClick={() => setCurrentPage('multiplication')}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-8 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-5xl mb-3">🔢</div>
                  <div className="text-xl">Matemáticas</div>
                  <div className="text-sm mt-2 opacity-90">
                    Tabla de Multiplicar
                  </div>
                </button>

                <button
                  onClick={() => setCurrentPage('water')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-8 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="text-5xl mb-3">🌊</div>
                  <div className="text-xl">Ciencias</div>
                  <div className="text-sm mt-2 opacity-90">Ciclo del Agua</div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Navbar */}
      {currentPage !== 'home' && (
        <nav className="bg-white shadow-md p-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            ← Volver al Inicio
          </button>
        </nav>
      )}

      {/* Contenido */}
      {renderPage()}
    </div>
  );
}

export default App;