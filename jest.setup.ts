import "@testing-library/jest-dom";

Object.defineProperty(window, 'alert', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window, 'confirm', {
  writable: true,
  value: jest.fn(),
});

// Mock crypto.randomUUID
Object.defineProperty(global.crypto, 'randomUUID', {
  writable: true,
  value: jest.fn(() => '123e4567-e89b-12d3-a456-426614174000'),
});
