import { decode, encode } from 'base-64';
import CryptoJS from 'crypto-js';

export const base64Encode = (str: string) => encode(str);

export const base64ToUrlSafe = (v: string) =>
  v.replace(/\//g, '_').replace(/\+/g, '-');

export const base64SafeEncode = (str: string) =>
  base64ToUrlSafe(base64Encode(str));

export const base64Decode = (str: string) => decode(str);

export const hmacSha1Base64 = (encodedFlags: string, secretKey: string) =>
  CryptoJS.HmacSHA1(encodedFlags, secretKey).toString(CryptoJS.enc.Base64);
