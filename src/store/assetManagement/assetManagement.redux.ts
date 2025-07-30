import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Asset, AssetManagementState } from './assetManagement.type';

const initialState: AssetManagementState = {
  assets: [],
};

export const assetManagementSlice = createSlice({
  name: 'assetManagement',
  initialState,
  reducers: {
    editAssetAction: (
      state,
      action: PayloadAction<{ asset: Asset; loginUser: string }>,
    ) => {
      const assetIndex = state.assets.findIndex(
        asset => asset.uuid === action.payload.asset.uuid,
      );

      if (assetIndex !== -1) {
        state.assets[assetIndex] = {
          ...action.payload.asset,
          createUser: action.payload.loginUser,
        };
      } else {
        state.assets.push({
          ...action.payload.asset,
          createUser: action.payload.loginUser,
        });
      }
    },
    restoreAssetManagementAction: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.assets = action.payload.assets;
      }
    },
  },
});

export const { editAssetAction, restoreAssetManagementAction } =
  assetManagementSlice.actions;

export default assetManagementSlice.reducer;
