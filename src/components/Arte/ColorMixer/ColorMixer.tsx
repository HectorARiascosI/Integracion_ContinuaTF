import React, { useState, useEffect, useRef } from 'react';
import KidHelper from '../../common/KidHelper';

interface ColorValues {
  red: number;
  yellow: number;
  blue: number;
}

const ColorMixer: React.FC = () => {
  const [colors, setColors] = useState<ColorValues>({
    red: 0,
    yellow: 0,
    blue: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Función para mezclar colores y obtener RGB final
  const getMixedColor = (): { r: number; g: number; b: number } => {
    // Conversión simplificada de RYB (Red-Yellow-Blue) a RGB
    const r = colors.red;
    const y = colors.yellow;
    const b = colors.blue;

    return {
      r: Math.min(255, r + y * 0.5),
      g: Math.min(255, y + b * 0.3),
      b: Math.min(255, b + r * 0.2),
    };
  };

  // Challenge (reto) mode: target color to approximate
  const [challengeMode, setChallengeMode] = useState(false);
  const [targetColor, setTargetColor] = useState<{ r: number; g: number; b: number } | null>(null);

  const distanceToTarget = () => {
    if (!targetColor) return 100;
    const m = getMixedColor();
    const dr = m.r - targetColor.r;
    const dg = m.g - targetColor.g;
    const db = m.b - targetColor.b;
    // simple Euclidean distance normalized to 0-100
    const maxDist = Math.sqrt(255 * 255 * 3);
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    return Math.max(0, Math.round((1 - dist / maxDist) * 100));
  };

  const startChallenge = () => {
    // generate a visible target color
    const pick = () => ({ r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) });
    setTargetColor(pick());
    setChallengeMode(true);
  };

  const stopChallenge = () => {
    setTargetColor(null);
    setChallengeMode(false);
  };

  // Actualizar canvas con el color mezclado
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mixedColor = getMixedColor();
    const fillColor = `rgb(${Math.round(mixedColor.r)}, ${Math.round(mixedColor.g)}, ${Math.round(mixedColor.b)})`;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar círculo con color mezclado
    ctx.beginPath();
    ctx.arc(150, 150, 120, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [colors]);

  // Manejador de cambio de slider
  const handleColorChange = (color: keyof ColorValues, value: number) => {
    setColors((prev) => ({
      ...prev,
      [color]: value,
    }));
  };

  // Presets de colores
  const applyPreset = (preset: 'green' | 'purple' | 'orange') => {
    const presets = {
      green: { red: 0, yellow: 255, blue: 255 },
      purple: { red: 255, yellow: 0, blue: 255 },
      orange: { red: 255, yellow: 128, blue: 0 },
    };
    setColors(presets[preset]);
  };

  // Limpiar colores
  const clearColors = () => {
    setColors({ red: 0, yellow: 0, blue: 0 });
  };

  // Obtener código hexadecimal
  const getHexColor = (): string => {
    const mixedColor = getMixedColor();
    const toHex = (n: number) =>
      Math.round(n).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(mixedColor.r)}${toHex(mixedColor.g)}${toHex(mixedColor.b)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-purple/20 to-kid-yellow/10 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xxl shadow-2xl p-8">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            🎨 Mezclador de Colores
          </h1>
          <p className="text-gray-600 text-lg">
            Mueve los controles para mezclar colores
          </p>
        </div>

        {/* Canvas de color mezclado */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="flex-shrink-0">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className={`border-4 border-gray-300 rounded-2xl shadow-lg transition-transform duration-300 ${challengeMode ? 'scale-105 ring-4 ring-kid-blue/30' : ''}`}
              data-testid="color-canvas"
              aria-label="Lienzo del color mezclado"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <KidHelper name="Pinta" message={challengeMode ? '¡Acércate al color objetivo!' : 'Mueve los controles y mira el color'} />
            </div>

            {/* Target preview when in challenge */}
            {challengeMode && targetColor && (
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full shadow-md" style={{ background: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} aria-hidden />
                <div>
                  <div className="text-sm text-gray-700">Color objetivo</div>
                  <div className="text-lg font-bold">{`#${((1<<24) + (targetColor.r<<16) + (targetColor.g<<8) + targetColor.b).toString(16).slice(1).toUpperCase()}`}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información del color */}
        <div className="text-center mb-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-gray-700 mb-2">{getHexColor()}</p>
          <p className="text-gray-600">
            RGB: ({Math.round(getMixedColor().r)}, {Math.round(getMixedColor().g)},{' '}
            {Math.round(getMixedColor().b)})
          </p>
        </div>

        {/* Challenge controls */}
        <div className="flex items-center gap-3 mb-6">
          {!challengeMode ? (
            <button onClick={startChallenge} className="bg-kid-blue text-white py-2 px-4 rounded-xl">🎯 Iniciar Reto</button>
          ) : (
            <>
              <div className="flex-1">
                <div className="text-sm text-gray-700">Progreso</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                  <div className="bg-green-400 h-3 rounded-full transition-all" style={{ width: `${distanceToTarget()}%` }} />
                </div>
              </div>
              <div className="text-sm font-bold">{distanceToTarget()}%</div>
              <button onClick={stopChallenge} className="bg-gray-400 text-white py-2 px-4 rounded-xl">Detener</button>
            </>
          )}
        </div>

        {/* Controles de colores */}
        <div className="space-y-6 mb-8">
          {/* Rojo */}
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-xl font-semibold text-red-600">🔴 Rojo</span>
              <span className="text-gray-700 font-mono">{colors.red}</span>
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={colors.red}
              onChange={(e) => handleColorChange('red', Number(e.target.value))}
              className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer slider-red"
              data-testid="red-slider"
            />
          </div>

          {/* Amarillo */}
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-xl font-semibold text-yellow-600">🟡 Amarillo</span>
              <span className="text-gray-700 font-mono">{colors.yellow}</span>
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={colors.yellow}
              onChange={(e) => handleColorChange('yellow', Number(e.target.value))}
              className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
              data-testid="yellow-slider"
            />
          </div>

          {/* Azul */}
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-xl font-semibold text-blue-600">🔵 Azul</span>
              <span className="text-gray-700 font-mono">{colors.blue}</span>
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={colors.blue}
              onChange={(e) => handleColorChange('blue', Number(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              data-testid="blue-slider"
            />
          </div>
        </div>

        {/* Botones de presets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => applyPreset('green')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            data-testid="preset-green"
          >
            🟢 Verde
          </button>
          <button
            onClick={() => applyPreset('purple')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            data-testid="preset-purple"
          >
            🟣 Morado
          </button>
          <button
            onClick={() => applyPreset('orange')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            data-testid="preset-orange"
          >
            🟠 Naranja
          </button>
          <button
            onClick={clearColors}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
            data-testid="clear-button"
          >
            🧹 Limpiar
          </button>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
          <p className="text-blue-800">
            <strong>💡 Tip:</strong> Los colores primarios (rojo, amarillo, azul) se
            mezclan para crear colores secundarios. ¡Experimenta y descubre nuevos
            colores!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorMixer;
