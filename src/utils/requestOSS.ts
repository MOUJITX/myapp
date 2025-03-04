import axios from 'axios';
import { ossUploadURL } from '../environment';

export interface IResponse {
  code: number | string;
  data: any;
  message: string;
  total: number;
}

const instance = axios.create({
  baseURL: ossUploadURL,
  timeout: 30 * 1000,
});

instance.interceptors.request.use(async config => {
  // const token = await getStorage('token');
  // config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  console.log('Request config:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data instanceof FormData ? 'FormData' : config.data,
  });
  return config;
});

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      console.warn('Response status not 200:', response.status, response);
    }
  },
  error => {
    console.error('Response error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export const request = async (
  method: string,
  url: string,
  params: any
): Promise<IResponse> => {
  if (method === 'get') {
    return await get(url, params);
  } else {
    return await post(url, params);
  }
};

const get = (url: string, params: any): Promise<IResponse> =>
  instance.get(url, {
    params: params,
  });

const post = (url: string, params: any): Promise<any> =>
  instance.post(ossUploadURL, params);
