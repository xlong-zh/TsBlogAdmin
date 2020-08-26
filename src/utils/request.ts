import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/storage';
import { Message, MessageBox } from 'element-ui';
const baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API;
const request = axios.create({
  timeout: 10000,
  baseURL,
});
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers['X-Access-Token'] = getToken() || '';
    if (config.method === 'get') {
      config.params = {
        _t: new Date().getTime() / 1000,
        ...config.params,
      };
    }
    // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    // if (config.url.includes('pur/contract/export')) {
    //   config.headers['responseType'] = 'blob'
    // }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    // if (config.url.includes('pur/contract/upload')) {
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // }
    //
    return config;
  },
  (err: any) => {
    console.error('error:', err); // for debug
    Promise.reject(err);
  }
);
request.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 200 || response.data.code === 0) {
      return Promise.resolve(response.data || []);
    } else if (response.data.code === -1) {
      MessageBox.alert('很抱歉，登录已过期，请重新登录', '登录已过期', {
        confirmButtonText: '重新登录',
        callback: () => {
          // store.dispatch('loginOut');
        },
      });
    } else {
      Message({
        message: response.data.msg || response.data.message,
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(response.data || response.data || 'Error');
    }
  },
  (error: any) => {
    // error.response
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default request;
/* 统一封装get请求 */
export const get = (url: string, params: any = {}, config: any = {}) => {
  // params = { token: getToken(),...params };
  return new Promise((resolve, reject) =>
    request({ method: 'get', url, params, ...config }).then(resolve, reject)
  );
};
/* 统一封装delete请求 */
export const deleteAction = (url: string, params: any = {}, config: any = {}) => {
  // params = { token: getToken(),...params };
  return new Promise((resolve, reject) =>
    request({ method: 'post', url, params, ...config }).then(resolve, reject)
  );
};

/* 统一封装post请求  */
export const post = (url: string, data: any = {}, config: any = {}) => {
  return new Promise((resolve, reject) =>
    request({ method: 'post', url, data, ...config }).then(resolve, reject)
  );
};
export const put = (url: string, data: any = {}, config: any = {}) => {
  return new Promise((resolve, reject) =>
    request({ method: 'put', url, data, ...config }).then(resolve, reject)
  );
};
