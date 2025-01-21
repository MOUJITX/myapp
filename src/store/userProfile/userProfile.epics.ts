import { filter, from, mergeMap, of } from 'rxjs';
import {
  userAddInfoAction,
  userAddLoginHistoryAction,
  userLoginAction,
  userLoginFailureAction,
  userLoginSuccessAction,
  userLogoutAction,
} from './userProfile.redux';
import { randomUUID } from '../../utils/utils';
import { combineEpics, Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { RootState } from '../type';
import { LoginPayload } from './userProfile.type';
import { selectUserInfoByUsername } from './userProfile.selectors';

export type UserProfileEpic = Epic<AnyAction, AnyAction, RootState, void>;

const preCheck = (loginPayload: LoginPayload, state: RootState) => {
  const userInfo = selectUserInfoByUsername(state, loginPayload.username);

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
    mergeMap(action => from(preCheck(action.payload, state$.value)))
  );

const userLoginSuccessEpic: UserProfileEpic = action$ =>
  action$.pipe(
    filter(userLoginSuccessAction.match),
    mergeMap(action =>
      of(
        userAddLoginHistoryAction({
          uuid: action.payload,
          loginTime: new Date(),
          actionType: 'login',
          isSuccess: true,
          isManual: true,
        })
      )
    )
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
        })
      )
    )
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
        })
      )
    )
  );

export const userProfileEpics = combineEpics(
  userLoginEpic,
  userLoginSuccessEpic,
  userLoginFailureEpic,
  userLogoutEpic
);
