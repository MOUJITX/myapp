import { AnyAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { RootState } from '../type';
import { filter, mergeMap, of } from 'rxjs';
import { addGoodAction } from './expireReminder.redux';
import { navigateAction } from '../navigation/navigation.redux';

export type ExpireRemindersEpic = Epic<AnyAction, AnyAction, RootState, void>;

const addGoodEpic: ExpireRemindersEpic = action$ =>
  action$.pipe(
    filter(addGoodAction.match),
    mergeMap(() => {
      // console.log('addGoodEpic');
      return of(navigateAction({ screen: 'ExpireReminderScreen' }));
    })
  );

export const expireReminderEpics = combineEpics(addGoodEpic);
