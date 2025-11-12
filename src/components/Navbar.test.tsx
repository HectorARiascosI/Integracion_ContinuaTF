// src/components/Navbar.test.tsx
// @ts-ignore - React necesario para JSX en Jest
import React from 'react';
import { render, screen} from "@testing-library/react";
import Navbar from "./Navbar";

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'UCC : Prácticas Desarrollo'", () => {
    render(<Navbar />);
    expect(screen.getByText(/UCC : Prácticas Desarrollo/i)).toBeInTheDocument();
  });

  test("renderiza el botón con el texto 'Tema'", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /Tema/i })).toBeInTheDocument();
  });
});

