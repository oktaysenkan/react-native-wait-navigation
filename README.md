# React Native Wait Navigation
React Native Wait Navigation is an efficient solution to handle the initial navigation in your React Native applications.

## Installation

You can install this package using npm or yarn as per your preference. 

```bash
npm i react-native-wait-navigation
```

```bash
yarn add react-native-wait-navigation
```

## Usage

Start by importing the necessary modules:

```jsx
import { createRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { useWaitNavigation } from 'react-native-wait-navigation';
```

Next, create a reference for the NavigationContainer:

```jsx
export const navigationRef = createRef<NavigationContainerRef>();
```

In your App component, use the `useWaitNavigation()` hook to delay the navigation until certain conditions are met (e.g. closing the SplashScreen, handling deeplinks):

```jsx
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

By employing this library, you can manage your navigation in the application effectively, ensuring a smoother user experience.
