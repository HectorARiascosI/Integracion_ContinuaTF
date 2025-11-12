// @ts-ignore - React necesario para JSX en Jest
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer', () => {
  it('renderiza el elemento de audio', () => {
    render(<AudioPlayer />);
    const audio = screen.getByTestId('audio-element');
    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('controls');
  });

  it('acepta una fuente opcional', () => {
    render(<AudioPlayer src="/audio/test.mp3" />);
    const source = screen.getByRole('application', { hidden: true });
    // Fallback: verificar que el audio exista; validar source por selección DOM
    const audio = screen.getByTestId('audio-element') as HTMLAudioElement;
    expect(audio.querySelector('source')?.getAttribute('src')).toBe('/audio/test.mp3');
  });
});
