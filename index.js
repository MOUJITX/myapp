/**
 * @format
 */
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { name as appName } from './app.json';
import { persistor, store } from './src/store/store';

import './src/i18n/i18n';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
));
