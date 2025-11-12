// src/setupTests.ts
import '@testing-library/jest-dom';

// ------------------------------
// mock: window.matchMedia
// ------------------------------
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),            // legacy
      removeListener: jest.fn(),         // legacy
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
}

// ------------------------------
// mock: HTMLCanvasElement.getContext('2d')
// jsdom lo define pero lanza "Not implemented".
// Lo sobreescribimos SIEMPRE para tests.
// ------------------------------
const make2dContext = (canvas: HTMLCanvasElement) => {
  const noop = () => {};
  const ctx = {
    canvas,
    // estado de dibujo
    fillStyle: '#000000',
    strokeStyle: '#000000',
    lineWidth: 1,
    // APIs usadas por tus componentes/tests
    clearRect: noop,
    beginPath: noop,
    arc: noop,
    fill: noop,
    stroke: noop,
    // extras comunes
    rect: noop,
    moveTo: noop,
    lineTo: noop,
    closePath: noop,
    save: noop,
    restore: noop,
    translate: noop,
    scale: noop,
    rotate: noop,
  } as unknown as CanvasRenderingContext2D;

  return ctx;
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  writable: true,
  value: function (this: HTMLCanvasElement, type?: string) {
    // Mockeamos sólo '2d'; cualquier otro contexto devuelve null
    if (type === '2d' || type === undefined) {
      return make2dContext(this);
    }
    return null;
  },
});
