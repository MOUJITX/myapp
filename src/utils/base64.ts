import { decode, encode } from 'base-64';

export const base64Encode = (str: string) => encode(str);

export const base64SafeEncode = (str: string) =>
  encode(str).replace(/\+/g, '-').replace(/\//g, '_');

export const base64Decode = (str: string) => decode(str);
