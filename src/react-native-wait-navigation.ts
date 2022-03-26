import { EventEmitter } from 'eventemitter3'
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native'
import { RefObject } from 'react'
import { retry } from 'ts-retry-promise'
import { PartialDeep } from 'type-fest'

interface EventMap {
  initialized: () => void
}

export type NavigationContainerRefType =
  | PartialDeep<RefObject<NavigationContainerRef<ParamListBase>>>
  | never

export default class ReactNativeWaitNavigation extends EventEmitter<EventMap> {
  private initialized = false
  private navigationRef: NavigationContainerRefType

  constructor(navigationRef: NavigationContainerRefType) {
    super()

    this.navigationRef = navigationRef

    this.checkNavigation()
  }

  get isInitialized() {
    return this.initialized
  }

  private isNavigationReady() {
    const state =
      this.navigationRef &&
      this.navigationRef.current &&
      this.navigationRef.current.getRootState &&
      this.navigationRef.current.getRootState()

    if (state) {
      return Promise.resolve(true)
    }

    throw new Error('Navigation is not ready')
  }

  private async checkNavigation() {
    try {
      await retry(() => this.isNavigationReady(), {
        retries: 50,
        delay: 200,
      })
      // eslint-disable-next-line no-empty
    } catch (error) {}

    this.initialized = true

    this.emit('initialized')
  }
}
