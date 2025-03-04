import { base64SafeEncode, base64ToUrlSafe, hmacSha1Base64 } from './encoder';

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

export const ossToken = (
  AK: string,
  SK: string,
  bucket: string,
  key: string
) => {
  const flags = getFlags({ scope: { bucket, key } });
  const encodedFlags = base64SafeEncode(JSON.stringify(flags));
  const encoded = hmacSha1Base64(encodedFlags, SK);
  const encodedSign = base64ToUrlSafe(encoded);
  const uploadToken = AK + ':' + encodedSign + ':' + encodedFlags;
  return uploadToken;
};
