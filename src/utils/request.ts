import axios from 'axios';

const instance = axios.create({
  timeout: 10 * 1000,
});

instance.interceptors.request.use(async config => {
  return config;
});

instance.interceptors.response.use(
  response => {
    // console.warn('response', response);
    return response.data;
  },
  error => {
    console.error('response error', error);
    return Promise.reject(error);
  },
);

export const request = async (
  method: 'get' | 'post',
  url: string,
  params?: any,
) => {
  if (method === 'get') {
    return await get(url, params);
  } else {
    return await post(url, params);
  }
};

const get = (url: string, params: any) => instance.get(url, params);

const post = (url: string, params: any) => instance.post(url, params);
