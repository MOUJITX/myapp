import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../type';

export const selectAllManagementAsset = createSelector(
  (state: RootState) => state.userProfile.loginUser,
  (state: RootState) => state.assetManagement.assets,
  (loginUser, assets) => assets.filter(asset => asset.createUser === loginUser),
);
