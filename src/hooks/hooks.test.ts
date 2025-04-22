import { renderHook } from '@testing-library/react';
import { navigate } from 'astro:transitions/client';
import { afterEach, describe } from "node:test";
import { expect, test, vi, type Mock } from "vitest";
import { useHaikuGuard } from './useHaikuGuard';
import { useHaikuStore } from './useHaikuStore';

vi.mock('astro:transitions/client', () => ({
  navigate: vi.fn(),
}));

vi.mock("./useHaikuStore", () => ({
  useHaikuStore: vi.fn()
}))

describe('useHaikuGuard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Does not navigate if haiku found', () => {
    (useHaikuStore as Mock).mockReturnValue({
      haikus: [{ id: 123, text: ['Línea 1', 'Línea 2', 'Línea 3'] }],
    })

    renderHook(() => useHaikuGuard(123));
    expect(navigate).not.toHaveBeenCalled();
  });

  test('Does not navigate if empty array of haikus', () => {
    (useHaikuStore as Mock).mockReturnValue({
      haikus: [],
    })

    renderHook(() => useHaikuGuard(999));
    expect(navigate).not.toHaveBeenCalled();
  });

  test('Navigates if haiku not found', () => {
    (useHaikuStore as Mock).mockReturnValue({
      haikus: [{ id: 123, text: ['Línea 1', 'Línea 2', 'Línea 3'] }],
    })

    renderHook(() => useHaikuGuard(999));
    expect(navigate).toHaveBeenCalledWith('/');
  });
});