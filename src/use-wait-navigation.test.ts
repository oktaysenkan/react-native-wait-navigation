/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks';
import * as f from 'fuuu';

import { mockGetRootState } from './test.utils';
import useWaitNavigation, { NavigationContainerRefType } from './use-wait-navigation';

test('emit "initialized" event after navigation initialized', async () => {
  const navigationRef: NavigationContainerRefType = {
    current: {},
  };

  const mockFn = jest.fn();

  const { result } = renderHook(() => useWaitNavigation(navigationRef, mockFn));

  await act(async () => {
    await f.sleep(500);

    if (navigationRef.current) {
      navigationRef.current.getRootState = mockGetRootState;
    }

    await f.sleep(500);
  });

  expect(mockFn).toBeCalledTimes(1);
  expect(result.current.initialized).toBe(true);
});

test(`don't emit "initialized" event before navigation initialized`, async () => {
  const mockFn = jest.fn();

  const navigationRef: NavigationContainerRefType = {};

  const { result } = renderHook(() => useWaitNavigation(navigationRef, mockFn));

  await act(async () => {
    await f.sleep(15000);
  });

  expect(mockFn).not.toHaveBeenCalled();
  expect(result.current.initialized).toBe(false);
});
