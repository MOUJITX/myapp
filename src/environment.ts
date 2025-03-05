import RNFS from 'react-native-fs';

export const ossUploadURL = 'https://upload.qiniup.com/';

export const ossAccessKey = 'ac6g1GmKe43O_7ZBF26jdts61pEN6wUofL3MK603';

export const ossSecretKey = 'Px8m-84T1lmLuV0gkdhGzmjz7dYBdB7mb9GyvlqE';

export const ossBucket = 'moujitx-cloud';

export const ossFolder = __DEV__ ? 'app-myapp-dev' : 'app-myapp';

export const ossDomain = `https://cloudfiles.moujitx.cn/${ossFolder}/`;

const bundleID = 'com.moujitx.myapp';

export const realBundleID = __DEV__ ? `${bundleID}.dev` : bundleID;

export const localFileFolder = `file://${RNFS.DocumentDirectoryPath}/`;
