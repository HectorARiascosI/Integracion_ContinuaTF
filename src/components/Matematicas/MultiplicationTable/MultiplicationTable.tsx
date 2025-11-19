import React, { useState } from 'react';

interface EquationState {
  equation: string;
  answer: number;
  userAnswer: string;
  isCorrect: boolean | null;
  showResult: boolean;
}

const MultiplicationTable: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number>(5);
  const [equations, setEquations] = useState<EquationState[]>([]);
  const [score, setScore] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [randomMode, setRandomMode] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(0);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; color: string }>>([]);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  // Generar ecuaciones para una tabla
  const generateEquations = (table: number): EquationState[] => {
    const ops = randomMode ? ['×', '+', '-', '÷'] : ['×'];

    const base = Array.from({ length: 10 }, (_, i) => {
      const multiplier = i + 1;
      const op = ops[Math.floor(Math.random() * ops.length)];
      let eq = '';
      let ans = 0;
      if (op === '×') {
        eq = `${table} × ${multiplier}`;
        ans = table * multiplier;
      } else if (op === '+') {
        eq = `${table} + ${multiplier}`;
        ans = table + multiplier;
      } else if (op === '-') {
        eq = `${table} - ${multiplier}`;
        ans = table - multiplier;
      } else {
        // make a clean divisible pair
        const a = table * multiplier;
        eq = `${a} ÷ ${multiplier}`;
        ans = a / multiplier;
      }

      return {
        equation: eq,
        answer: ans,
        userAnswer: '',
        isCorrect: null,
        showResult: false,
      } as EquationState;
    });

    if (randomMode) {
      for (let i = base.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [base[i], base[j]] = [base[j], base[i]];
      }
    }

    return base;
  };

  // Iniciar práctica
  const startPractice = () => {
    setEquations(generateEquations(selectedTable));
    setScore(0);
    setTotalAnswered(0);
    setIsStarted(true);
  };

  // Verificar respuesta
  const checkAnswer = (index: number) => {
    const equation = equations[index];
    const userAnswerNum = parseInt(equation.userAnswer);
    const isCorrect = userAnswerNum === equation.answer;

    const updatedEquations = [...equations];
    updatedEquations[index] = {
      ...equation,
      isCorrect,
      showResult: true,
    };
    setEquations(updatedEquations);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      // award stars for correct answers
      setStars((s) => Math.min(3, s + 1));
      // spawn confetti pieces
      const pieces = Array.from({ length: 12 }, (_, i) => ({ id: Date.now() + i, left: Math.random() * 100, color: ['#F97316', '#F43F5E', '#60A5FA', '#34D399'][Math.floor(Math.random() * 4)] }));
      setConfettiPieces((p) => [...p, ...pieces]);
      setTimeout(() => setConfettiPieces((p) => p.filter((pp) => !pieces.find((np) => np.id === pp.id))), 1400);
    } else {
      // vibrate / shake UI for a short moment
      setShakeIndex(index);
      setTimeout(() => setShakeIndex(null), 600);
    }

    setTotalAnswered((prev) => prev + 1);
  };

  // Manejar cambio de respuesta
  const handleAnswerChange = (index: number, value: string) => {
    const updatedEquations = [...equations];
    updatedEquations[index] = {
      ...updatedEquations[index],
      userAnswer: value,
    };
    setEquations(updatedEquations);
  };

  // Cambiar de tabla
  const changeTable = (table: number) => {
    setSelectedTable(table);
    if (table === selectedTable) {
      // Si es la misma tabla, reiniciar la práctica
      setEquations(generateEquations(table));
      setScore(0);
      setTotalAnswered(0);
      // Mantener isStarted en true
    } else {
      // Si es una tabla diferente, volver a la pantalla de selección
      setIsStarted(false);
      setEquations([]);
      setScore(0);
      setTotalAnswered(0);
    }
  };

  // Obtener clase CSS según estado
  const getInputClass = (equation: EquationState): string => {
    const baseClass =
      'w-24 px-4 py-2 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2';

    if (equation.isCorrect === null) {
      return `${baseClass} border-gray-300 focus:ring-blue-500`;
    }
    if (equation.isCorrect) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    return `${baseClass} border-red-500 bg-red-50`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            🔢 Tabla de Multiplicar
          </h1>
          <p className="text-gray-600 text-lg">
            Practica tus tablas de multiplicar y mejora tus habilidades
          </p>
        </div>

        {!isStarted ? (
          // Pantalla de selección
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Selecciona una tabla para practicar
            </h2>
            <div className="mb-8">
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(Number(e.target.value))}
                className="px-6 py-3 text-xl font-bold border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                data-testid="table-selector"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Tabla del {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={startPractice}
              className="kid-btn bg-kid-blue text-white"
              data-testid="start-button"
            >
              🚀 Comenzar Práctica
            </button>
          </div>
        ) : (
          // Pantalla de práctica
          <div>
            {/* Encabezado con puntuación y coach */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 bg-indigo-50 rounded-xl gap-3">
              <div className="flex items-center gap-4">
                <div className="kid-avatar bg-kid-yellow/80 text-kid-purple">🤖</div>
                <div>
                  <h2 className="text-2xl font-bold text-indigo-700">Tabla del {selectedTable}</h2>
                  <div className="text-sm text-gray-700">🤖 ¡Tú puedes! Completa todas para ganar 3 estrellas</div>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <div className="mb-2 text-sm text-gray-700">Progreso: {totalAnswered} / 10</div>
                <div className="kid-progress" role="progressbar" aria-valuemin={0} aria-valuemax={10} aria-valuenow={totalAnswered} aria-label="Progreso de preguntas">
                  <div className="fill" style={{ width: `${(totalAnswered / 10) * 100}%` }} />
                </div>
              </div>

              <div className="text-right md:text-left">
                <div className="flex items-center gap-4 justify-end">
                  <div className="text-lg font-semibold text-gray-700">Puntos: <span className="text-green-600">{score}</span></div>
                  <div className="text-lg font-semibold text-gray-700">Respuestas: {totalAnswered}</div>
                  <div className="flex items-center gap-1" aria-hidden>
                    {Array.from({ length: stars }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                    ))}
                  </div>
                </div>

                {/* Compatibilidad con tests antiguos: elemento único con texto 'Puntuación: X / Y' */}
                <div className="font-semibold text-gray-700 sr-only">Puntuación: {score} / {totalAnswered}</div>

                {totalAnswered === 10 && (
                  <p className="text-lg font-bold text-indigo-600 mt-1">
                    {score >= 8
                      ? '🏆 ¡Excelente!'
                      : score >= 6
                        ? '👍 ¡Bien hecho!'
                        : '💪 ¡Sigue practicando!'}
                  </p>
                )}
              </div>
            </div>

                <div className="mb-4 flex items-center gap-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={randomMode} onChange={(e) => setRandomMode(e.target.checked)} />
                    <span className="text-sm">Modo aleatorio</span>
                  </label>
                </div>

            {/* Ecuaciones */}
            <div className="space-y-4 mb-8">
              {equations.map((equation, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${shakeIndex === index ? 'animate-shake' : ''}`}
                  data-testid={`equation-${index}`}
                >
                  <span className="text-2xl font-bold text-gray-800 w-32">
                    {equation.equation} =
                  </span>

                  <input
                    type="number"
                    value={equation.userAnswer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    disabled={equation.showResult}
                    className={getInputClass(equation)}
                    placeholder="?"
                    data-testid={`answer-input-${index}`}
                  />

                  {!equation.showResult ? (
                    <button
                      onClick={() => checkAnswer(index)}
                      disabled={!equation.userAnswer}
                      className="kid-btn bg-kid-blue hover:scale-105 disabled:bg-gray-300 text-white transition-transform"
                      data-testid={`verify-button-${index}`}
                    >
                      ✓ Verificar
                    </button>
                  ) : (
                    <div className="w-32 text-center">
                      {equation.isCorrect ? (
                        <span className="text-green-600 font-bold text-lg" role="status" aria-live="polite">
                          ✓ ¡Correcto! 🎉
                        </span>
                      ) : (
                        <div>
                          <span className="text-red-600 font-bold block">
                            ✗ Respuesta: {equation.answer}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Confetti container */}
            {confettiPieces.length > 0 && (
              <div aria-hidden className="pointer-events-none fixed inset-0 z-50">
                {confettiPieces.map((p) => (
                  <div key={p.id} className="confetti-piece" style={{ left: `${p.left}%`, background: p.color }} />
                ))}
              </div>
            )}

            {/* Botón de nueva tabla */}
            {totalAnswered === 10 && (
              <div className="text-center">
                <button
                  onClick={() => changeTable(selectedTable)}
                  className="kid-btn bg-kid-green text-white mr-4"
                  data-testid="restart-button"
                >
                  🔄 Intentar de Nuevo
                </button>
                <button
                  onClick={() => setIsStarted(false)}
                  className="kid-btn bg-kid-purple text-white"
                  data-testid="new-table-button"
                >
                  📊 Cambiar Tabla
                </button>
              </div>
            )}

            {/* Instrucciones */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
              <p className="text-yellow-800">
                <strong>💡 Tip:</strong> Escribe tu respuesta y presiona "Verificar"
                para ver si es correcta. ¡Intenta conseguir 10/10!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplicationTable;
