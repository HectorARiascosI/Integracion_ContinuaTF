// @ts-ignore - React necesario para JSX en Jest
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultiplicationTable from '../../components/Matematicas/MultiplicationTable/MultiplicationTable';

describe('MultiplicationTable Component', () => {
  test('debe renderizar el componente correctamente', () => {
    render(<MultiplicationTable />);
    expect(screen.getByText(/Tabla de Multiplicar/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Practica tus tablas de multiplicar/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar pantalla de selección inicial', () => {
    render(<MultiplicationTable />);
    expect(
      screen.getByText(/Selecciona una tabla para practicar/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('table-selector')).toBeInTheDocument();
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
  });

  test('debe tener selector con tablas del 1 al 10', () => {
    render(<MultiplicationTable />);
    const selector = screen.getByTestId('table-selector') as HTMLSelectElement;

    // Verificar que hay 10 opciones
    expect(selector.options.length).toBe(10);
    expect(selector.options[0].value).toBe('1');
    expect(selector.options[9].value).toBe('10');
  });

  test('debe cambiar tabla seleccionada', () => {
    render(<MultiplicationTable />);
    const selector = screen.getByTestId('table-selector') as HTMLSelectElement;

    fireEvent.change(selector, { target: { value: '7' } });

    expect(selector.value).toBe('7');
  });

  test('debe iniciar práctica al hacer clic en Comenzar', () => {
    render(<MultiplicationTable />);
    const startButton = screen.getByTestId('start-button');

    fireEvent.click(startButton);

    // Debe mostrar la tabla del 5 (valor por defecto)
    expect(screen.getByText(/Tabla del 5/i)).toBeInTheDocument();
  });

  test('debe generar 10 ecuaciones al iniciar', () => {
    render(<MultiplicationTable />);
    const startButton = screen.getByTestId('start-button');

    fireEvent.click(startButton);

    // Verificar que hay 10 ecuaciones (equation-0 a equation-9)
    for (let i = 0; i < 10; i++) {
      expect(screen.getByTestId(`equation-${i}`)).toBeInTheDocument();
    }
  });

  test('debe mostrar ecuaciones correctas para tabla del 3', () => {
    render(<MultiplicationTable />);

    // Cambiar a tabla del 3
    const selector = screen.getByTestId('table-selector') as HTMLSelectElement;
    fireEvent.change(selector, { target: { value: '3' } });

    // Iniciar práctica
    fireEvent.click(screen.getByTestId('start-button'));

    // Verificar algunas ecuaciones
    expect(screen.getByText(/3 × 1 =/i)).toBeInTheDocument();
    expect(screen.getByText(/3 × 5 =/i)).toBeInTheDocument();
    expect(screen.getByText(/3 × 10 =/i)).toBeInTheDocument();
  });

  test('debe permitir escribir respuesta en input', () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5' } });

    expect(input.value).toBe('5');
  });

  test('debe validar respuesta correcta', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Tabla del 5: 5 × 1 = 5
    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5' } });

    const verifyButton = screen.getByTestId('verify-button-0');
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText(/¡Correcto!/i)).toBeInTheDocument();
    });
  });

  test('debe validar respuesta incorrecta', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Tabla del 5: 5 × 1 = 5, pero poner respuesta incorrecta
    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '10' } });

    const verifyButton = screen.getByTestId('verify-button-0');
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText(/Respuesta: 5/i)).toBeInTheDocument();
    });
  });

  test('debe incrementar puntuación con respuesta correcta', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Responder correctamente la primera ecuación
    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(screen.getByTestId('verify-button-0'));

    await waitFor(() => {
      const scoreElements = screen.getAllByText((_content, element) => {
        const text = element?.textContent || '';
        return !!(element?.className?.includes('font-semibold') && text.includes('Puntuación:'));
      });
      expect(scoreElements[0]).toHaveTextContent(/1\s*\/\s*1/);
    });
  });

  test('debe no incrementar puntuación con respuesta incorrecta', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Responder incorrectamente
    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '999' } });
    fireEvent.click(screen.getByTestId('verify-button-0'));

    await waitFor(() => {
      const scoreElements = screen.getAllByText((_content, element) => {
        const text = element?.textContent || '';
        return !!(element?.className?.includes('font-semibold') && text.includes('Puntuación:'));
      });
      expect(scoreElements[0]).toHaveTextContent(/0\s*\/\s*1/);
    });
  });

  test('debe deshabilitar input después de verificar', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(screen.getByTestId('verify-button-0'));

    await waitFor(() => {
      expect(input).toBeDisabled();
    });
  });

  test('debe mostrar botón Intentar de Nuevo al completar todas las ecuaciones', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Responder todas las 10 ecuaciones
    for (let i = 0; i < 10; i++) {
      const input = screen.getByTestId(`answer-input-${i}`) as HTMLInputElement;
      const answer = (5 * (i + 1)).toString(); // Tabla del 5
      fireEvent.change(input, { target: { value: answer } });
      fireEvent.click(screen.getByTestId(`verify-button-${i}`));
    }

    await waitFor(() => {
      expect(screen.getByTestId('restart-button')).toBeInTheDocument();
      expect(screen.getByTestId('new-table-button')).toBeInTheDocument();
    });
  });

  test('debe mostrar mensaje de felicitación con 8+ respuestas correctas', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Responder 10/10 correctamente
    for (let i = 0; i < 10; i++) {
      const input = screen.getByTestId(`answer-input-${i}`) as HTMLInputElement;
      const answer = (5 * (i + 1)).toString();
      fireEvent.change(input, { target: { value: answer } });
      fireEvent.click(screen.getByTestId(`verify-button-${i}`));
    }

    await waitFor(() => {
      expect(screen.getByText(/¡Excelente!/i)).toBeInTheDocument();
    });
  });

  test('debe reiniciar práctica con botón Intentar de Nuevo', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Completar una ecuación
    const input = screen.getByTestId('answer-input-0') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(screen.getByTestId('verify-button-0'));

    await waitFor(() => {
      const scoreElements = screen.getAllByText((_content, element) => {
        const text = element?.textContent || '';
        return !!(element?.className?.includes('font-semibold') && text.includes('Puntuación:'));
      });
      expect(scoreElements[0]).toHaveTextContent(/1/);
    });

    // Completar todas las demás para poder reiniciar
    for (let i = 1; i < 10; i++) {
      const inp = screen.getByTestId(`answer-input-${i}`) as HTMLInputElement;
      const answer = (5 * (i + 1)).toString();
      fireEvent.change(inp, { target: { value: answer } });
      fireEvent.click(screen.getByTestId(`verify-button-${i}`));
    }

    await waitFor(() => {
      const restartButton = screen.getByTestId('restart-button');
      fireEvent.click(restartButton);
    });

    // Después de reiniciar, debe volver a puntuación 0
    await waitFor(() => {
      const scoreElements = screen.getAllByText((_content, element) => {
        const text = element?.textContent || '';
        return !!(element?.className?.includes('font-semibold') && text.includes('Puntuación:'));
      });
      expect(scoreElements[0]).toHaveTextContent(/0\s*\/\s*0/);
    });
  });

  test('debe volver a pantalla de selección con botón Cambiar Tabla', async () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    // Completar todas las ecuaciones
    for (let i = 0; i < 10; i++) {
      const input = screen.getByTestId(`answer-input-${i}`) as HTMLInputElement;
      const answer = (5 * (i + 1)).toString();
      fireEvent.change(input, { target: { value: answer } });
      fireEvent.click(screen.getByTestId(`verify-button-${i}`));
    }

    await waitFor(() => {
      const newTableButton = screen.getByTestId('new-table-button');
      fireEvent.click(newTableButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Selecciona una tabla para practicar/i)
      ).toBeInTheDocument();
    });
  });

  test('debe mostrar instrucciones educativas', () => {
    render(<MultiplicationTable />);
    fireEvent.click(screen.getByTestId('start-button'));

    expect(
      screen.getByText(/Escribe tu respuesta y presiona "Verificar"/i)
    ).toBeInTheDocument();
  });
});
