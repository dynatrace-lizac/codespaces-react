import { beforeEach, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

const { useBooleanFlagDetailsMock, useOpenFeatureClientStatusMock } = vi.hoisted(() => ({
  useBooleanFlagDetailsMock: vi.fn(),
  useOpenFeatureClientStatusMock: vi.fn(),
}));

vi.mock('@openfeature/react-sdk', () => ({
  OpenFeatureProvider: ({ children }) => children,
  ProviderStatus: { READY: 'READY' },
  useBooleanFlagDetails: useBooleanFlagDetailsMock,
  useOpenFeatureClientStatus: useOpenFeatureClientStatusMock,
}));

beforeEach(() => {
  vi.clearAllMocks();
  useBooleanFlagDetailsMock.mockReturnValue({ value: false, reason: 'DEFAULT' });
  useOpenFeatureClientStatusMock.mockReturnValue('NOT_READY');
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeDefined();
});

test('waits for the provider to be ready before evaluating the flag', () => {
  render(<App />);

  expect(screen.getByText(/waiting for devcycle/i)).toBeDefined();
  expect(useBooleanFlagDetailsMock).not.toHaveBeenCalled();
});

test('evaluates the flag after the provider is ready', () => {
  useOpenFeatureClientStatusMock.mockReturnValue('READY');

  render(<App />);

  expect(screen.getByText(/dynatrace/i)).toBeDefined();
  expect(useBooleanFlagDetailsMock).toHaveBeenCalledWith('my-new-feature', true);
});
