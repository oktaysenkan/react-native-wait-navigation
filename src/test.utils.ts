import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';

export const mockGetRootState: NavigationContainerRef<ParamListBase>['getRootState'] = () => ({
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
});
