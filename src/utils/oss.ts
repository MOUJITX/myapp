import axios from 'axios';
import { base64SafeEncode, base64ToUrlSafe, hmacSha1Base64 } from './encoder';
import {
  ossAccessKey,
  ossBucket,
  ossFolder,
  ossSecretKey,
  ossUploadURL,
} from '../environment';

interface PutPolicy {
  scope: {
    bucket: string;
    key: string;
  };
  expires?: number;
  returnBody?: string;
}

const getFlags = (putPolicy: PutPolicy) => {
  const scope = `${putPolicy.scope.bucket}:${putPolicy.scope.key}`;
  const deadline =
    (putPolicy.expires ? putPolicy.expires : 300) +
    Math.floor(Date.now() / 1000);
  const returnBody = putPolicy.returnBody;

  return {
    scope,
    deadline,
    returnBody,
  };
};

const ossToken = (AK: string, SK: string, bucket: string, key: string) => {
  const flags = getFlags({ scope: { bucket, key } });
  const encodedFlags = base64SafeEncode(JSON.stringify(flags));
  const encoded = hmacSha1Base64(encodedFlags, SK);
  const encodedSign = base64ToUrlSafe(encoded);
  const uploadToken = AK + ':' + encodedSign + ':' + encodedFlags;
  return uploadToken;
};

export const ossUpload = async (
  fileName: string,
  filePath: string,
  fileType?: string,
  fileFolder?: string,
) => {
  const file = {
    uri: filePath,
    type: fileType ?? 'image/jpeg',
    name: fileName,
  };

  const filePathName =
    ossFolder + '/' + `${fileFolder ?? 'default'}` + '/' + fileName;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('key', filePathName);
  formData.append(
    'token',
    ossToken(ossAccessKey!, ossSecretKey!, ossBucket!, filePathName),
  );

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return await axios.post(ossUploadURL, formData, config);
};
