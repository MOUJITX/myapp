import axios from 'axios';

export interface IResponse {
  code: number | string;
  data: any;
  message: string;
  total: number;
}

const instance = axios.create({
  baseURL: 'http://114.55.245.145:20222/api',
  timeout: 10 * 1000,
});

instance.interceptors.request.use(async config => {
  // const token = await getStorage('token');
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      console.warn('response', response.status, response);
    }
  },
  error => {
    console.error('response error', error);
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

const post = (url: string, params: any): Promise<IResponse> =>
  instance.post(url, params);
