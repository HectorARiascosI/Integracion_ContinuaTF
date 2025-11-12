import { calcularPuntaje } from "../../components/Matematicas/quizLogic";

describe("calcularPuntaje", () => {
  const correctas = ["a", "b", "c", "d", "a", "b", "c", "d", "a", "b"]; // 10

  it("retorna 100% y aprobado cuando todas son correctas", () => {
    const respuestas = [...correctas];
    const r = calcularPuntaje(respuestas, correctas);
    expect(r.aciertos).toBe(10);
    expect(r.porcentaje).toBe(100);
    expect(r.aprobado).toBe(true);
  });

  it("retorna 0% y no aprobado cuando todas son incorrectas", () => {
    const respuestas = correctas.map(() => "x");
    const r = calcularPuntaje(respuestas, correctas);
    expect(r.aciertos).toBe(0);
    expect(r.porcentaje).toBe(0);
    expect(r.aprobado).toBe(false);
  });

  it("aprueba exactamente con 70%", () => {
    // 7 correctas de 10
    const respuestas = correctas.map((v, i) => (i < 7 ? v : "x"));
    const r = calcularPuntaje(respuestas, correctas);
    expect(r.aciertos).toBe(7);
    expect(r.porcentaje).toBe(70);
    expect(r.aprobado).toBe(true);
  });

  it("calcula porcentajes no enteros con precisión razonable", () => {
    // 2 de 3
    const corr = ["a", "b", "c"];
    const resp = ["a", "b", "x"];
    const r = calcularPuntaje(resp, corr);
    expect(r.aciertos).toBe(2);
    expect(r.porcentaje).toBeCloseTo(66.666, 2);
    expect(r.aprobado).toBe(false);
  });
});
