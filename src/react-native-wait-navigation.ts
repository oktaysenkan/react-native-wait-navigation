import { EventEmitter } from 'eventemitter3';
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { RefObject } from 'react';
import { retry } from 'ts-retry-promise';
import { PartialDeep } from 'type-fest';

import { isNavigationReady } from './utils';

interface EventMap {
  initialized: () => void;
}

export type NavigationContainerRefType =
  | PartialDeep<RefObject<NavigationContainerRef<ParamListBase>>>
  | never;

export default class ReactNativeWaitNavigation extends EventEmitter<EventMap> {
  private initialized = false;
  private navigationRef: NavigationContainerRefType;

  constructor(navigationRef: NavigationContainerRefType) {
    super();

    this.navigationRef = navigationRef;

    this.checkNavigation();
  }

  get isInitialized() {
    return this.initialized;
  }

  private async checkNavigation() {
    try {
      await retry(() => isNavigationReady(this.navigationRef), {
        retries: 50,
        delay: 200,
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}

    this.initialized = true;

    this.emit('initialized');
  }
}
