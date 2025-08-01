import { AnyAction, UnknownAction } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { filter, from, mergeMap, of } from 'rxjs';

import { randomUUID } from '../../utils/utils';
import {
  initCategoryAction,
  restoreExpireReminderAction,
} from '../expireReminder/expireReminder.redux';
import { navigateAction } from '../navigation/navigation.redux';
import { ticketCardRestoreAction } from '../ticketCard/ticketCard.redux';
import { RootState } from '../type';

import {
  restoreAction,
  userAddInfoAction,
  userAddLoginHistoryAction,
  userLoginAction,
  userLoginFailureAction,
  userLoginSuccessAction,
  userLogoutAction,
  userRestoreInfoAction,
} from './userProfile.redux';
import { selectUserInfoByUsername } from './userProfile.selectors';
import { LoginPayload } from './userProfile.type';

export type UserProfileEpic = Epic<AnyAction, AnyAction, RootState, void>;

const preCheck = (loginPayload: LoginPayload, state: RootState) => {
  const userInfo = selectUserInfoByUsername(state, loginPayload.username);

  if (!loginPayload.username || !loginPayload.password) {
    return [];
  }

  if (!userInfo) {
    const uuid = randomUUID();
    return [
      userAddInfoAction({ ...loginPayload, uuid, createTime: new Date() }),
      userLoginSuccessAction(uuid),
    ];
  }

  if (userInfo && userInfo.password === loginPayload.password) {
    return [userLoginSuccessAction(userInfo.uuid)];
  }

  return [userLoginFailureAction(userInfo.uuid)];
};

const userLoginEpic: UserProfileEpic = (action$, state$) =>
  action$.pipe(
    filter(userLoginAction.match),
    mergeMap(action => from(preCheck(action.payload, state$.value))),
  );

const userLoginSuccessEpic: UserProfileEpic = action$ =>
  action$.pipe(
    filter(userLoginSuccessAction.match),
    mergeMap(action =>
      of(
        navigateAction({
          screen: 'BottomTab',
          replace: true,
        }),
        userAddLoginHistoryAction({
          uuid: action.payload,
          loginTime: new Date(),
          actionType: 'login',
          isSuccess: true,
          isManual: true,
        }),
      ),
    ),
  );

const userLoginFailureEpic: UserProfileEpic = action$ =>
  action$.pipe(
    filter(userLoginFailureAction.match),
    mergeMap(action =>
      of(
        userAddLoginHistoryAction({
          uuid: action.payload,
          loginTime: new Date(),
          actionType: 'login',
          isSuccess: false,
          isManual: true,
        }),
      ),
    ),
  );

const userLogoutEpic: UserProfileEpic = action$ =>
  action$.pipe(
    filter(userLogoutAction.match),
    mergeMap(action =>
      of(
        userAddLoginHistoryAction({
          uuid: action.payload,
          loginTime: new Date(),
          actionType: 'logout',
          isSuccess: true,
          isManual: true,
        }),
      ),
    ),
  );

const userAddInfoEpic: UserProfileEpic = action$ =>
  action$.pipe(
    filter(userAddInfoAction.match),
    mergeMap(action => of(initCategoryAction(action.payload.uuid))),
  );

const restoreEpic: UserProfileEpic = action$ =>
  action$.pipe(
    filter(restoreAction.match),
    mergeMap(action => {
      const toJSON = JSON.parse(action.payload);
      const actionList: UnknownAction[] = [];

      if (toJSON.userProfile) {
        actionList.push(userRestoreInfoAction(toJSON.userProfile));
      }

      if (toJSON.expireReminder) {
        actionList.push(restoreExpireReminderAction(toJSON.expireReminder));
      }

      if (toJSON.ticketCard) {
        actionList.push(ticketCardRestoreAction(toJSON.ticketCard));
      }

      if (toJSON.assetManagement) {
        actionList.push(restoreExpireReminderAction(toJSON.assetManagement));
      }
      return of(...actionList);
    }),
  );

export const userProfileEpics = combineEpics(
  userLoginEpic,
  userLoginSuccessEpic,
  userLoginFailureEpic,
  userLogoutEpic,
  userAddInfoEpic,
  restoreEpic,
);
