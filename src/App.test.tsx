// @ts-ignore - React necesario para JSX en Jest
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "./App";

test("renderiza el título principal", () => {
  render(<App />);
  expect(screen.getByText(/Colegio Mentes Creativas/i)).toBeInTheDocument();
});