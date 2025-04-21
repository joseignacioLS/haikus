import { ERequestStatus } from '@/types';
import { renderHook } from '@testing-library/react';
import { navigate } from 'astro:transitions/client';
import { afterEach, describe } from "node:test";
import { expect, test, vi } from "vitest";
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

  test('Does not navigate on status === LOADING', () => {
    (useHaikuStore as vi.Mock).mockReturnValue({
      status: ERequestStatus.LOADING,
      haikus: [],
    });

    renderHook(() => useHaikuGuard(123));
    expect(navigate).not.toHaveBeenCalled();
  });

  test('Does not navigate if haiku found', () => {
    (useHaikuStore as vi.Mock).mockReturnValue({
      status: ERequestStatus.SUCCESS,
      haikus: [{ id: 123, text: ['Línea 1', 'Línea 2', 'Línea 3'] }],
    })

    renderHook(() => useHaikuGuard(123));
    expect(navigate).not.toHaveBeenCalled();
  });

  test('Navigates if haiku not found and status === SUCCESS', () => {

    (useHaikuStore as vi.Mock).mockReturnValue({
      status: ERequestStatus.SUCCESS,
      haikus: [{ id: 123, text: ['Línea 1', 'Línea 2', 'Línea 3'] }],
    })
    renderHook(() => useHaikuGuard(999));
    expect(navigate).toHaveBeenCalledWith('/');
  });
});