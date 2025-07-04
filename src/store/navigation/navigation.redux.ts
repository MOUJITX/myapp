import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppNavigationList } from '../../navigation/AppNavigationList';

export type NavigatePayload = {
  [K in keyof AppNavigationList]: {
    screen: K;
    params?: AppNavigationList[K];
    replace?: boolean;
  };
}[keyof AppNavigationList];

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {},
  reducers: {
    navigateAction: (_state, _action: PayloadAction<NavigatePayload>) => {},
    goBackAction: (_state, _action: PayloadAction) => {},
  },
});

export const { navigateAction, goBackAction } = navigationSlice.actions;
export default navigationSlice.reducer;
