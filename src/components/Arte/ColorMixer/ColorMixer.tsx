import React, { useState, useEffect, useRef } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
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
        <div className="flex justify-center mb-8">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border-4 border-gray-300 rounded-2xl shadow-lg"
            data-testid="color-canvas"
          />
        </div>

        {/* Información del color */}
        <div className="text-center mb-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-gray-700 mb-2">{getHexColor()}</p>
          <p className="text-gray-600">
            RGB: ({Math.round(getMixedColor().r)}, {Math.round(getMixedColor().g)},{' '}
            {Math.round(getMixedColor().b)})
          </p>
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
