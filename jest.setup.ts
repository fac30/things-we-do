import "@testing-library/jest-dom";

Object.defineProperty(window, 'alert', {
  writable: true,
  value: jest.fn(),
});
