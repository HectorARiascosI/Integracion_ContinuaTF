import React, { useState, useEffect } from 'react';

interface Stage {
  id: string;
  title: string;
  emoji: string;
  description: string;
  example: string;
  position: { top: string; left: string };
}

const stages: Stage[] = [
  {
    id: 'evaporation',
    title: 'Evaporación',
    emoji: '🌊',
    description:
      'El agua líquida de ríos, lagos y océanos se calienta por el sol y se convierte en vapor de agua que sube a la atmósfera.',
    example: 'Como cuando dejas agua en un vaso al sol y desaparece poco a poco.',
    position: { top: '70%', left: '20%' },
  },
  {
    id: 'condensation',
    title: 'Condensación',
    emoji: '☁️',
    description:
      'El vapor de agua en el cielo se enfría y se convierte en pequeñas gotas de agua que forman las nubes.',
    example: 'Como cuando el espejo del baño se empaña después de bañarte con agua caliente.',
    position: { top: '20%', left: '50%' },
  },
  {
    id: 'precipitation',
    title: 'Precipitación',
    emoji: '🌧️',
    description:
      'Las gotas de agua en las nubes se unen y se hacen tan pesadas que caen a la tierra como lluvia, nieve o granizo.',
    example: 'Como cuando llueve o nieva y el agua vuelve al suelo.',
    position: { top: '50%', left: '80%' },
  },
  {
    id: 'runoff',
    title: 'Escorrentía',
    emoji: '💧',
    description:
      'El agua que cae regresa a ríos, lagos y océanos. Parte del agua también se filtra bajo la tierra.',
    example: 'Como cuando llueve y ves el agua corriendo por las calles hacia los desagües.',
    position: { top: '80%', left: '60%' },
  },
];

const WaterCycle: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlayIndex, setCurrentPlayIndex] = useState<number>(0);

  // Reproducción automática del ciclo
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentPlayIndex((prev) => {
        if (prev >= stages.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Actualizar etapa activa durante reproducción
  useEffect(() => {
    if (isPlaying) {
      setActiveStage(stages[currentPlayIndex].id);
    }
  }, [currentPlayIndex, isPlaying]);

  // Iniciar reproducción
  const startPlayback = () => {
    setCurrentPlayIndex(0);
    setIsPlaying(true);
  };

  // Detener reproducción
  const stopPlayback = () => {
    setIsPlaying(false);
    setActiveStage(null);
  };

  // Seleccionar etapa manualmente
  const selectStage = (stageId: string) => {
    if (!isPlaying) {
      setActiveStage(stageId);
    }
  };

  // Obtener información de la etapa activa
  const getActiveStageInfo = (): Stage | null => {
    return stages.find((stage) => stage.id === activeStage) || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            🌊 Ciclo del Agua
          </h1>
          <p className="text-gray-700 text-lg">
            Haz clic en cada etapa para aprender más o reproduce el ciclo completo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagrama interactivo */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8">
            {/* Controles */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={startPlayback}
                disabled={isPlaying}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
                data-testid="play-button"
              >
                ▶️ Reproducir Ciclo
              </button>
              <button
                onClick={stopPlayback}
                disabled={!isPlaying}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
                data-testid="stop-button"
              >
                ⏸️ Detener
              </button>
            </div>

            {/* Diagrama SVG simulado */}
            <div className="relative h-96 bg-gradient-to-b from-blue-100 via-blue-50 to-green-100 rounded-2xl border-4 border-blue-300 overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-400 opacity-50"></div>
              <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60"></div>

              {/* Puntos de etapas */}
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => selectStage(stage.id)}
                  disabled={isPlaying}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all transform hover:scale-110 ${
                    activeStage === stage.id
                      ? 'bg-yellow-300 ring-4 ring-yellow-400 scale-125'
                      : 'bg-white shadow-lg hover:shadow-xl'
                  } ${isPlaying ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{
                    top: stage.position.top,
                    left: stage.position.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                  data-testid={`stage-button-${stage.id}`}
                  title={stage.title}
                >
                  {stage.emoji}
                </button>
              ))}

              {/* Animación de conexiones durante reproducción */}
              {isPlaying && currentPlayIndex < stages.length - 1 && (
                <div
                  className="absolute w-1 bg-blue-500 animate-pulse"
                  style={{
                    height: '50px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}

              {/* Indicador de progreso */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentPlayIndex + 1) / stages.length) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Panel de información */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sticky top-8">
              {activeStage ? (
                <div data-testid="stage-info">
                  <div className="text-6xl text-center mb-4">
                    {getActiveStageInfo()?.emoji}
                  </div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                    {getActiveStageInfo()?.title}
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h3 className="font-bold text-blue-700 mb-2">
                        📖 ¿Qué es?
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getActiveStageInfo()?.description}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h3 className="font-bold text-green-700 mb-2">
                        💡 Ejemplo del día a día
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getActiveStageInfo()?.example}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-5xl mb-4">🌍</p>
                  <p className="text-lg">
                    Selecciona una etapa del ciclo para ver su información
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lista de etapas (móvil) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 lg:hidden">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => selectStage(stage.id)}
              disabled={isPlaying}
              className={`p-4 rounded-xl font-semibold transition-all ${
                activeStage === stage.id
                  ? 'bg-blue-500 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              <div className="text-3xl mb-2">{stage.emoji}</div>
              <div className="text-sm">{stage.title}</div>
            </button>
          ))}
        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-3">
            🎓 Sabías que...
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                El ciclo del agua no tiene principio ni fin, es un proceso continuo.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                El 97% del agua de la Tierra está en los océanos (agua salada).
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                El agua que bebes hoy ¡podría haber sido bebida por un dinosaurio hace
                millones de años!
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaterCycle;
