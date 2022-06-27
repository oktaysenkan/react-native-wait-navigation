import { NavigationContainerRefType } from './use-wait-navigation';

export const isNavigationReady = (navigationRef: NavigationContainerRefType) => {
  const state =
    navigationRef &&
    navigationRef.current &&
    navigationRef.current.getRootState &&
    navigationRef.current.getRootState();

  if (state) {
    return Promise.resolve(true);
  }

  throw new Error('Navigation is not ready');
};
