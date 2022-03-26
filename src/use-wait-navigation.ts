import { useEffect, useState } from 'react';
import { retry } from 'ts-retry-promise';

import { NavigationContainerRefType } from './react-native-wait-navigation';
import { isNavigationReady } from './utils';

const useWaitNavigation = (navigationRef: NavigationContainerRefType, handler: () => void) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    checkNavigation();
  }, [navigationRef]);

  const checkNavigation = async () => {
    try {
      await retry(() => isNavigationReady(navigationRef), {
        retries: 50,
        delay: 200,
      });

      setInitialized(true);

      handler();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return { initialized };
};

export default useWaitNavigation;
