import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { RefObject, useEffect, useState } from 'react';
import { PartialDeep } from 'type-fest';
import * as f from 'fuuu';

import { isNavigationReady } from './utils';

export type NavigationContainerRefType =
  | PartialDeep<RefObject<NavigationContainerRef<ParamListBase>>>
  | never;

const useWaitNavigation = (navigationRef: NavigationContainerRefType, handler: () => void) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    checkNavigation();
  }, [navigationRef]);

  const checkNavigation = async () => {
    const result = await f.safe(() => isNavigationReady(navigationRef), {
      retries: 1600,
      retryDelay: 10,
      timeout: 15000,
    });

    if (result.error) return;

    setInitialized(true);

    handler();
  };

  return { initialized };
};

export default useWaitNavigation;
