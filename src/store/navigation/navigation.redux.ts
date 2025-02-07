import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppNavigationList } from '../../navigation/AppNavigationList';

export type NavigatePayload = {
  screen: keyof AppNavigationList;
  params?: any;
  replace?: boolean;
};

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
