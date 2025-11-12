/* istanbul ignore file */

export interface QuizResult {
  aciertos: number;
  porcentaje: number;
  aprobado: boolean;
}

export function calcularPuntaje(
  respuestas: string[],
  correctas: string[]
): QuizResult {
  const aciertos = respuestas.filter((r, i) => r === correctas[i]).length;
  const porcentaje = (aciertos / correctas.length) * 100;
  const aprobado = porcentaje >= 70;

  return {
    aciertos,
    porcentaje,
    aprobado,
  };
}
