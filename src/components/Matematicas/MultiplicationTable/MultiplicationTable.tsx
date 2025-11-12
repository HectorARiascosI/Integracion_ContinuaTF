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

  // Generar ecuaciones para una tabla
  const generateEquations = (table: number): EquationState[] => {
    return Array.from({ length: 10 }, (_, i) => {
      const multiplier = i + 1;
      return {
        equation: `${table} × ${multiplier}`,
        answer: table * multiplier,
        userAnswer: '',
        isCorrect: null,
        showResult: false,
      };
    });
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
    } else {
      // Mostrar respuesta correcta después de 2 segundos
      setTimeout(() => {
        const resetEquations = [...updatedEquations];
        resetEquations[index] = {
          ...resetEquations[index],
          showResult: true,
        };
        setEquations(resetEquations);
      }, 2000);
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
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xl py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              data-testid="start-button"
            >
              🚀 Comenzar Práctica
            </button>
          </div>
        ) : (
          // Pantalla de práctica
          <div>
            {/* Encabezado con puntuación */}
            <div className="flex justify-between items-center mb-8 p-4 bg-indigo-50 rounded-xl">
              <h2 className="text-2xl font-bold text-indigo-700">
                Tabla del {selectedTable}
              </h2>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-700">
                  Puntuación: <span className="text-green-600">{score}</span> /{' '}
                  {totalAnswered}
                </p>
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

            {/* Ecuaciones */}
            <div className="space-y-4 mb-8">
              {equations.map((equation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
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
                      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg transition-all"
                      data-testid={`verify-button-${index}`}
                    >
                      ✓ Verificar
                    </button>
                  ) : (
                    <div className="w-32 text-center">
                      {equation.isCorrect ? (
                        <span className="text-green-600 font-bold text-lg">
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

            {/* Botón de nueva tabla */}
            {totalAnswered === 10 && (
              <div className="text-center">
                <button
                  onClick={() => changeTable(selectedTable)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg mr-4"
                  data-testid="restart-button"
                >
                  🔄 Intentar de Nuevo
                </button>
                <button
                  onClick={() => setIsStarted(false)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xl py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
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
