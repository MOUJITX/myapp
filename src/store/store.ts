import {configureStore} from '@reduxjs/toolkit';
import {userProfileRedux} from './userProfile/userProfile.redux';

export default configureStore({
  reducer: {
    userProfile: userProfileRedux.reducer,
  },
});
