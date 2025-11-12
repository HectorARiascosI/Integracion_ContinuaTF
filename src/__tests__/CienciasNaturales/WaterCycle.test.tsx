// src/__tests__/CienciasNaturales/WaterCycle.test.tsx
// @ts-ignore - React necesario para JSX en Jest
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import WaterCycle from '../../components/CienciasNaturales/WaterCycle/WaterCycle';

describe('WaterCycle Component', () => {
  test('debe renderizar el componente correctamente', () => {
    render(<WaterCycle />);

    // Evita choque con el bullet "El ciclo del agua..."
    expect(
      screen.getByRole('heading', { name: /Ciclo del Agua/i, level: 1 })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Haz clic en cada etapa para aprender más/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar botón Reproducir Ciclo', () => {
    render(<WaterCycle />);
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
    expect(screen.getByText(/Reproducir Ciclo/i)).toBeInTheDocument();
  });

  test('debe mostrar botón Detener', () => {
    render(<WaterCycle />);
    expect(screen.getByTestId('stop-button')).toBeInTheDocument();
    expect(screen.getByText(/Detener/i)).toBeInTheDocument();
  });

  test('debe mostrar las 4 etapas del ciclo', () => {
    render(<WaterCycle />);
    expect(screen.getByTestId('stage-button-evaporation')).toBeInTheDocument();
    expect(screen.getByTestId('stage-button-condensation')).toBeInTheDocument();
    expect(screen.getByTestId('stage-button-precipitation')).toBeInTheDocument();
    expect(screen.getByTestId('stage-button-runoff')).toBeInTheDocument();
  });

  test('debe mostrar mensaje inicial en panel de información', () => {
    render(<WaterCycle />);
    expect(
      screen.getByText(/Selecciona una etapa del ciclo/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar información al hacer clic en Evaporación', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-evaporation'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Evaporación/i)).toBeInTheDocument();
    expect(
      within(info).getByText(/El agua líquida.*se calienta por el sol/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar información al hacer clic en Condensación', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-condensation'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Condensación/i)).toBeInTheDocument();
    expect(within(info).getByText(/El vapor de agua.*se enfría/i)).toBeInTheDocument();
  });

  test('debe mostrar información al hacer clic en Precipitación', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-precipitation'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Precipitación/i)).toBeInTheDocument();
    expect(
      within(info).getByText(/Las gotas de agua.*caen a la tierra/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar información al hacer clic en Escorrentía', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-runoff'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Escorrentía/i)).toBeInTheDocument();
    expect(
      within(info).getByText(/El agua que cae regresa a ríos/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar emoji correcto para cada etapa', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-evaporation'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText('🌊')).toBeInTheDocument();
  });

  test('debe mostrar sección "Qué es" en información de etapa', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-evaporation'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/¿Qué es\?/i)).toBeInTheDocument();
  });

  test('debe mostrar sección "Ejemplo del día a día" en información de etapa', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-condensation'));

    const info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Ejemplo del día a día/i)).toBeInTheDocument();
    expect(within(info).getByText(/espejo del baño se empaña/i)).toBeInTheDocument();
  });

  test('debe cambiar entre etapas correctamente', () => {
    render(<WaterCycle />);

    fireEvent.click(screen.getByTestId('stage-button-evaporation'));
    let info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Evaporación/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('stage-button-condensation'));
    info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Condensación/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('stage-button-precipitation'));
    info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Precipitación/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('stage-button-runoff'));
    info = screen.getByTestId('stage-info');
    expect(within(info).getByText(/Escorrentía/i)).toBeInTheDocument();
  });

  test('debe iniciar reproducción automática', () => {
    render(<WaterCycle />);
    const playButton = screen.getByTestId('play-button');
    fireEvent.click(playButton);
    expect(playButton).toBeDisabled();
  });

  test('debe habilitar botón Detener durante reproducción', () => {
    render(<WaterCycle />);
    const playButton = screen.getByTestId('play-button');
    const stopButton = screen.getByTestId('stop-button');

    expect(stopButton).toBeDisabled();
    fireEvent.click(playButton);
    expect(stopButton).not.toBeDisabled();
  });

  test('debe detener reproducción con botón Detener', async () => {
    render(<WaterCycle />);
    const playButton = screen.getByTestId('play-button');
    const stopButton = screen.getByTestId('stop-button');

    fireEvent.click(playButton);
    expect(playButton).toBeDisabled();

    fireEvent.click(stopButton);
    await waitFor(() => {
      expect(playButton).not.toBeDisabled();
    });
  });

  test('debe deshabilitar botones de etapas durante reproducción', () => {
    render(<WaterCycle />);
    const playButton = screen.getByTestId('play-button');
    const stageButton = screen.getByTestId('stage-button-evaporation');

    expect(stageButton).not.toBeDisabled();
    fireEvent.click(playButton);
    expect(stageButton).toBeDisabled();
  });

  test('debe mostrar información educativa "Sabías que..."', () => {
    render(<WaterCycle />);
    expect(screen.getByText(/Sabías que.../i)).toBeInTheDocument();
    expect(
      screen.getByText(/El ciclo del agua no tiene principio ni fin/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar dato sobre océanos', () => {
    render(<WaterCycle />);
    expect(
      screen.getByText(/97% del agua.*está en los océanos/i)
    ).toBeInTheDocument();
  });

  test('debe mostrar dato sobre dinosaurios', () => {
    render(<WaterCycle />);
    expect(
      screen.getByText(/bebida por un dinosaurio/i)
    ).toBeInTheDocument();
  });

  test('debe tener panel de información visible al seleccionar', () => {
    render(<WaterCycle />);
    fireEvent.click(screen.getByTestId('stage-button-evaporation'));
    const infoPanel = screen.getByTestId('stage-info');
    expect(infoPanel).toBeInTheDocument();
  });

  test('debe mostrar todos los emojis de etapas en los botones', () => {
    render(<WaterCycle />);
    expect(screen.getByTestId('stage-button-evaporation')).toHaveTextContent('🌊');
    expect(screen.getByTestId('stage-button-condensation')).toHaveTextContent('☁️');
    expect(screen.getByTestId('stage-button-precipitation')).toHaveTextContent('🌧️');
    expect(screen.getByTestId('stage-button-runoff')).toHaveTextContent('💧');
  });

  test('debe marcar botón activo visualmente', () => {
    render(<WaterCycle />);
    const button = screen.getByTestId('stage-button-evaporation');
    fireEvent.click(button);
    expect(button).toHaveClass('bg-yellow-300');
  });
});
