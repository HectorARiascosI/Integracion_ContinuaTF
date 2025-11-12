// @ts-ignore - React necesario para JSX en Jest
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColorMixer from '../../components/Arte/ColorMixer/ColorMixer';

describe('ColorMixer Component', () => {
  test('debe renderizar el componente correctamente', () => {
    render(<ColorMixer />);
    expect(screen.getByText(/Mezclador de Colores/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mueve los controles para mezclar colores/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar el canvas de color', () => {
    render(<ColorMixer />);
    const canvas = screen.getByTestId('color-canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '300');
  });

  test('debe mostrar los 3 sliders de colores', () => {
    render(<ColorMixer />);
    expect(screen.getByTestId('red-slider')).toBeInTheDocument();
    expect(screen.getByTestId('yellow-slider')).toBeInTheDocument();
    expect(screen.getByTestId('blue-slider')).toBeInTheDocument();
  });

  test('debe cambiar el valor del slider rojo', () => {
    render(<ColorMixer />);
    const redSlider = screen.getByTestId('red-slider') as HTMLInputElement;

    fireEvent.change(redSlider, { target: { value: '150' } });

    expect(redSlider.value).toBe('150');
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  test('debe cambiar el valor del slider amarillo', () => {
    render(<ColorMixer />);
    const yellowSlider = screen.getByTestId('yellow-slider') as HTMLInputElement;

    fireEvent.change(yellowSlider, { target: { value: '200' } });

    expect(yellowSlider.value).toBe('200');
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  test('debe cambiar el valor del slider azul', () => {
    render(<ColorMixer />);
    const blueSlider = screen.getByTestId('blue-slider') as HTMLInputElement;

    fireEvent.change(blueSlider, { target: { value: '100' } });

    expect(blueSlider.value).toBe('100');
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('debe mostrar código hexadecimal inicial #000000', () => {
    render(<ColorMixer />);
    expect(screen.getByText('#000000')).toBeInTheDocument();
  });

  test('debe mostrar valores RGB inicial (0, 0, 0)', () => {
    render(<ColorMixer />);
    expect(screen.getByText(/RGB: \(0, 0, 0\)/i)).toBeInTheDocument();
  });

  test('debe aplicar preset verde correctamente', () => {
    render(<ColorMixer />);
    const greenButton = screen.getByTestId('preset-green');

    fireEvent.click(greenButton);

    const redSlider = screen.getByTestId('red-slider') as HTMLInputElement;
    const yellowSlider = screen.getByTestId('yellow-slider') as HTMLInputElement;
    const blueSlider = screen.getByTestId('blue-slider') as HTMLInputElement;

    expect(redSlider.value).toBe('0');
    expect(yellowSlider.value).toBe('255');
    expect(blueSlider.value).toBe('255');
  });

  test('debe aplicar preset morado correctamente', () => {
    render(<ColorMixer />);
    const purpleButton = screen.getByTestId('preset-purple');

    fireEvent.click(purpleButton);

    const redSlider = screen.getByTestId('red-slider') as HTMLInputElement;
    const yellowSlider = screen.getByTestId('yellow-slider') as HTMLInputElement;
    const blueSlider = screen.getByTestId('blue-slider') as HTMLInputElement;

    expect(redSlider.value).toBe('255');
    expect(yellowSlider.value).toBe('0');
    expect(blueSlider.value).toBe('255');
  });

  test('debe aplicar preset naranja correctamente', () => {
    render(<ColorMixer />);
    const orangeButton = screen.getByTestId('preset-orange');

    fireEvent.click(orangeButton);

    const redSlider = screen.getByTestId('red-slider') as HTMLInputElement;
    const yellowSlider = screen.getByTestId('yellow-slider') as HTMLInputElement;
    const blueSlider = screen.getByTestId('blue-slider') as HTMLInputElement;

    expect(redSlider.value).toBe('255');
    expect(yellowSlider.value).toBe('128');
    expect(blueSlider.value).toBe('0');
  });

  test('debe limpiar todos los valores con botón Limpiar', () => {
    render(<ColorMixer />);

    // Primero establecer algunos valores
    const redSlider = screen.getByTestId('red-slider') as HTMLInputElement;
    fireEvent.change(redSlider, { target: { value: '100' } });

    // Luego limpiar
    const clearButton = screen.getByTestId('clear-button');
    fireEvent.click(clearButton);

    expect(redSlider.value).toBe('0');
    expect(screen.getByText('#000000')).toBeInTheDocument();
  });

  test('debe mostrar los 4 botones de acciones', () => {
    render(<ColorMixer />);

    expect(screen.getByTestId('preset-green')).toBeInTheDocument();
    expect(screen.getByTestId('preset-purple')).toBeInTheDocument();
    expect(screen.getByTestId('preset-orange')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
  });

  test('debe mostrar instrucciones educativas', () => {
    render(<ColorMixer />);
    expect(
      screen.getByText(/Los colores primarios.*se mezclan/i)
    ).toBeInTheDocument();
  });

  test('debe actualizar código hexadecimal al cambiar colores', async () => {
    render(<ColorMixer />);

    const redSlider = screen.getByTestId('red-slider') as HTMLInputElement;
    fireEvent.change(redSlider, { target: { value: '255' } });

    await waitFor(() => {
      // El código hex debe haber cambiado de #000000
      const hexText = screen.queryByText('#000000');
      expect(hexText).not.toBeInTheDocument();
    });
  });
});
