import { filter, from, mergeMap } from 'rxjs';
import {
  userAddInfoAction,
  userLoginAction,
  userLoginFailureAction,
  userLoginSuccessAction,
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
      userAddInfoAction({ ...loginPayload, uuid }),
      userLoginSuccessAction(uuid),
    ];
  }

  if (userInfo && userInfo.password === loginPayload.password) {
    return [userLoginSuccessAction(userInfo.uuid)];
  }

  return [userLoginFailureAction()];
};

const userLoginEpic: UserProfileEpic = (action$, state$) =>
  action$.pipe(
    filter(userLoginAction.match),
    mergeMap(action => from(preCheck(action.payload, state$.value)))
  );

export const userProfileEpics = combineEpics(userLoginEpic);
