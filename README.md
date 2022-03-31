# React Native Wait Navigation

React Native Navigation initialization handler.

## Installation

```sh
npm i react-native-wait-navigation
yarn add react-native-wait-navigation
```

## Usage

```tsx
import { createRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import ReactNativeWaitNavigation from 'react-native-wait-navigation';

export const navigationRef = createRef<NavigationContainerRef>();

export default function App() {
  const handleNavigationReady = () => {
    const emitter = new ReactNativeWaitNavigation(navigationRef);

    emitter.on('initialized', () => {
      closeSplashScreen();
    });
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={handleNavigationReady}>
        {/* Rest of your app code */}
    </NavigationContainer>
  );
}
```

or

```tsx
  import { createRef } from 'react';
  import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
  import { useWaitNavigation } from 'react-native-wait-navigation';

  export const navigationRef = createRef<NavigationContainerRef>();

  export default function App() {
    useWaitNavigation(navigationRef, () => {
      closeSplashScreen();
    });

    return (
      <NavigationContainer ref={navigationRef}>
          {/* Rest of your app code */}
      </NavigationContainer>
    );
  }
```
