import ReactNativeWaitNavigation, {
  NavigationContainerRefType,
} from './react-native-wait-navigation'

const navigationStates: Record<string, NavigationContainerRefType> = {
  uninitialized: {
    current: {},
  },
  initialized: {
    current: {
      getRootState: () => ({
        index: 0,
        key: '',
        routeNames: [],
        routes: [
          {
            key: '',
            name: '',
          },
        ],
        stale: false,
        type: '',
        history: [],
      }),
    },
  },
}

const wait = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

describe('test', () => {
  it(`don't emit "initialized" event before navigation initialized`, () => {
    const mockFn = jest.fn()

    const navigationRef = navigationStates.uninitialized

    const emitter = new ReactNativeWaitNavigation(navigationRef)

    emitter.on('initialized', mockFn)

    expect(mockFn).not.toHaveBeenCalled()
    expect(emitter.isInitialized).toBe(false)
  })

  it('emit "initialized" event after navigation initialized', async () => {
    const mockFn = jest.fn()

    const navigationRef = navigationStates.uninitialized

    const emitter = new ReactNativeWaitNavigation(navigationRef)

    emitter.on('initialized', mockFn)

    await wait(500)

    if (navigationRef.current && navigationStates.initialized.current) {
      navigationRef.current.getRootState = navigationStates.initialized.current.getRootState
    }

    await wait(500)

    expect(mockFn).toHaveBeenCalled()
    expect(emitter.isInitialized).toBe(true)
  })
})
