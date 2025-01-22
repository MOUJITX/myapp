import { AnyAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { RootState } from '../type';

export type ExpireRemindersEpic = Epic<AnyAction, AnyAction, RootState, void>;

export const expireReminderEpics = combineEpics();
