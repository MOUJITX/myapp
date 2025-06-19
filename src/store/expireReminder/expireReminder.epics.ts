import { AnyAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { filter, mergeMap, of } from 'rxjs';

import { RootState } from '../type';

import { addGoodAction } from './expireReminder.redux';

export type ExpireRemindersEpic = Epic<AnyAction, AnyAction, RootState, void>;

const addGoodEpic: ExpireRemindersEpic = action$ =>
  action$.pipe(
    filter(addGoodAction.match),
    mergeMap(() => {
      // console.log('addGoodEpic');
      return of();
    }),
  );

export const expireReminderEpics = combineEpics(addGoodEpic);
