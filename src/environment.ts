import RNFS from 'react-native-fs';

const bundleID = 'com.moujitx.myapp';
export const realBundleID = __DEV__ ? `${bundleID}.dev` : bundleID;

export const localFileFolder = `file://${RNFS.DocumentDirectoryPath}/`;

export const ossUploadURL = 'https://upload.qiniup.com/';
export const ossAccessKey = process.env.OSS_ACCESS_KEY;
export const ossSecretKey = process.env.OSS_SECRET_KEY;
export const ossBucket = process.env.OSS_BUCKET;
export const ossFolder = __DEV__ ? 'app-myapp-dev' : 'app-myapp';
export const ossDomain = `https://cloudfiles.moujitx.cn/${ossFolder}/`;

export const pubApiAppID = process.env.PUB_API_APP_ID;
export const pubApiAppSecret = process.env.PUB_API_APP_SECRET;
export const pubApiUrl_barcode = (key: string) =>
  `https://www.mxnzp.com/api/barcode/goods/details?barcode=${key}&app_id=${pubApiAppID}&app_secret=${pubApiAppSecret}`;
