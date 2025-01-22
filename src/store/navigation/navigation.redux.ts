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
  },
});

export const { navigateAction } = navigationSlice.actions;
export default navigationSlice.reducer;
