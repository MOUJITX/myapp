import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const envInfo = {
  env: process.env.NODE_ENV,
  isDev: __DEV__,
  os: Platform.OS,
  osVersion: Platform.Version,
  deviceBrand: DeviceInfo.getBrand(),
  deviceModel: DeviceInfo.getModel(),
};
