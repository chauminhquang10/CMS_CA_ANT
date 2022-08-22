/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { refreshToken } from '@/services/unicloud-ca-cms/AuthController';
import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import Reqs, { extend } from 'umi-request';
import CodeMessageResponseVi from './Error/error-vi';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};
// let requestOptions = null;

let token = localStorage.getItem('token');
const { cancel } = Reqs.CancelToken.source();

const errorHandler = async (error: ResponseError) => {
  if (Reqs.isCancel(error)) return;
  const { response, data } = error;
  console.log('err', error);

  const status = data?.status >= 400 ? data?.status : response?.status;
  console.log('data', data);

  const errorText = CodeMessageResponseVi[data?.code] || 'Không xác định';
  console.log('errorText', errorText);

  if (status >= 400) {
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and you cannot connect to the server',
      message: 'Network anomaly',
    });
  } else if (
    data?.code !== 0 &&
    data?.code !== 502 &&
    data?.code !== 100 &&
    data?.code !== 1001 &&
    data?.code !== 504
  ) {
    notification.error({
      description: errorText,
      message: 'Đã có lỗi xảy ra!',
    });
  }

  throw error;
};
export const request = extend({
  prefix: `${API_ENDPOINT}`,
  credentials: 'include',
  requestType: 'json',
  method: 'POST',
  responseType: 'json',
  getResponse: true,
  timeout: 20000,
  timeoutMessage: 'Server không phản hồi trong khoảng thời gian dài',
  errorHandler,
});

export const onRefresh = async () => {
  isRefreshing = true;
  const refreshTokenStorage = localStorage.getItem('refresh-token');
  if (!refreshTokenStorage || refreshTokenStorage === '')
    throw new Error('Refresh token is empty ');

  const refreshTokenDecoded: any = jwtDecode(refreshTokenStorage);
  if (
    (refreshTokenDecoded && refreshTokenDecoded && !refreshTokenDecoded?.exp) ||
    refreshTokenDecoded?.exp - Date.now() / 1000 <= 0
  )
    throw new Error('Refresh token was expired');
  const response = await refreshToken({ refreshToken: refreshTokenStorage });

  if (!response || !response.data) throw Error('Request invalid');
  const resultToken = response.data as API.AccessTokenResponseCustom;
  token = resultToken.token as string | null;
  processQueue(null);
  localStorage.setItem('token', token as string);
  localStorage.setItem('refresh-token', resultToken.refreshToken as string);
  isRefreshing = false;
};

const requestInterceptor = (url: string, options: RequestOptionsInit) => {
  //   requestOptions = options;
  const headers: any = {};
  token = localStorage.getItem('token');
  if (!token) {
    token = localStorage.getItem('token');
  }
  if (
    !url.includes('login') &&
    !url.includes('refreshToken') &&
    !url.includes('utility') &&
    !url.includes('checkPhone') &&
    !url.includes('verifyOTP') &&
    !url.includes('register')
  ) {
    headers.Authorization = `Bearer ${token}`;
  }
  return { url, options: { ...options, headers } };
};

const responseInterceptor = async (response: Response, options: RequestOptionsInit) => {
  const { status } = response;
  if (status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return request(options.url, { ...options });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    try {
      await onRefresh();
      return request(options.url, { ...options });
    } catch (err) {
      console.warn(err);
      failedQueue = [];
      token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh-token');
      cancel('Session is invalid');
      processQueue(err);
      isRefreshing = false;
      throw new MyResponseError(response, response.body, { url: response.url, options });
    }
  }

  const body = await response.clone().json();

  if (response.status >= 400 || body.status >= 400) {
    throw new MyResponseError(response, body, { url: response.url, options });
  }
  if (body.code !== 0) {
    throw new MyResponseError(response, body, { url: response?.url, options });
  }

  const { url } = response;
  if (url.includes('login')) {
    const { data } = body;
    localStorage.setItem('token', data?.token);
    localStorage.setItem('refresh-token', data?.refreshToken);
  }

  return { ...body };
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);
class MyResponseError implements ResponseError {
  message!: string;
  stack?: string;
  name!: string;
  data!: any;
  response!: Response;
  request!: {
    url: string;
    options: RequestOptionsInit;
  };
  type!: string;
  constructor(response: any, body: any, { url, options }: { url: any; options: any }) {
    this.response = response;
    this.data = body;
    const _request = { url, options };
    this.request = _request;
  }
}
