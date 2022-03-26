import { wait } from 'ts-retry-promise';

import ReactNativeWaitNavigation, {
  NavigationContainerRefType,
} from './react-native-wait-navigation';
import { mockGetRootState } from './test.utils';

it('emit "initialized" event after navigation initialized', async () => {
  const mockFn = jest.fn();

  const navigationRef: NavigationContainerRefType = {
    current: {},
  };

  const emitter = new ReactNativeWaitNavigation(navigationRef);

  emitter.on('initialized', mockFn);

  await wait(500);

  if (navigationRef.current) {
    navigationRef.current.getRootState = mockGetRootState;
  }

  await wait(500);

  expect(mockFn).toBeCalledTimes(1);
  expect(emitter.isInitialized).toBe(true);
});

it(`don't emit "initialized" event before navigation initialized`, () => {
  const mockFn = jest.fn();

  const navigationRef = {};

  const emitter = new ReactNativeWaitNavigation(navigationRef);

  emitter.on('initialized', mockFn);

  expect(mockFn).not.toHaveBeenCalled();
  expect(emitter.isInitialized).toBe(false);
});
