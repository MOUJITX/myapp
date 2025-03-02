import { base64SafeEncode } from './base64';
import { hmacSHA1 } from 'react-native-hmac';

const accessKey = 'ac6g1GmKe43O_7ZBF26jdts61pEN6wUofL3MK603';
const secretKey = 'Px8m-84T1lmLuV0gkdhGzmjz7dYBdB7mb9GyvlqE';
const bucket = 'moujitx-cloud';
const fileName = 'testFile.jpg';

// https://upload.qiniup.com/

export const generalUploadToken = async () => {
  const putPolicy = {
    scope: `${bucket}:${fileName}`,
    deadline: Math.ceil(new Date().getTime() / 1000) + 3600,
    returnBody: JSON.stringify({
      name: '$(fname)',
      size: '$(fsize)',
      w: '$(imageInfo.width)',
      h: '$(imageInfo.height)',
      hash: '$(etag)',
    }),
  };
  const putPolicyStr = JSON.stringify(putPolicy);
  const encodedPutPolicy = base64SafeEncode(putPolicyStr);
  let uploadToken = '';
  await hmacSHA1(encodedPutPolicy, secretKey).then(sign => {
    const encodedSign = base64SafeEncode(sign);
    uploadToken = accessKey + ':' + encodedSign + ':' + encodedPutPolicy;
    console.log('uploadToken', uploadToken);
  });
  return uploadToken;
};

export const OSS = () => {
  const token = generalUploadToken();
  console.log('token', token);
};
