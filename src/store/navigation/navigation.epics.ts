import { AnyAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map } from 'rxjs';

import { navigationRef } from '../../navigation/AppNavigationRef';
import { RootState } from '../type';

import { goBackAction, navigateAction } from './navigation.redux';

export type NavigationEpic = Epic<AnyAction, AnyAction, RootState, void>;

const navigationEpic: NavigationEpic = action$ =>
  action$.pipe(
    filter(navigateAction.match),
    map(action => {
      const { screen, params, replace } = action.payload;
      if (navigationRef.current) {
        replace
          ? navigationRef.current.reset({
              index: 0,
              routes: [{ name: screen, params }],
            })
          : navigationRef.current.navigate(screen, params);
      }
      return { type: 'NAVIGATION_COMPLETE' };
    }),
  );

const goBackEpic: NavigationEpic = action$ =>
  action$.pipe(
    filter(goBackAction.match),
    map(() => {
      if (navigationRef.current) {
        navigationRef.current.goBack();
      }
      return { type: 'GO_BACK_COMPLETE' };
    }),
  );

export const navigationEpics = combineEpics(navigationEpic, goBackEpic);
