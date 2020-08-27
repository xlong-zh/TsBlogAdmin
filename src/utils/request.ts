import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/storage';
import { TOKEN_HEADER_KEY, SUCCESS_STATUS, UNAUTHORIZED_STATUS } from '@/config/consts';
import { Message, MessageBox } from 'element-ui';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API;
const request = axios.create({
  timeout: 10000,
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers[TOKEN_HEADER_KEY] = getToken() || '';
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
    console.error(err);
    Promise.reject(err);
  }
);
request.interceptors.response.use(
  (response: AxiosResponse) => {
    if (SUCCESS_STATUS.includes(response.data.code)) {
      return Promise.resolve(response.data);
    } else if (UNAUTHORIZED_STATUS.includes(response.data.code)) {
      MessageBox.alert('登录已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        callback: () => {
          // store.dispatch('loginOut');
        },
      });
    } else {
      Message.error(response.data.msg || response.data.message);
      return Promise.reject(response.data || response.data || 'Error');
    }
  },
  (error: any) => {
    console.error(error);
    if (error && error.response) {
      if (UNAUTHORIZED_STATUS.includes(error.response.status)) {
        // window.location.replace(window.location.origin + '/index.html#/login');
        MessageBox.alert('登录已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          callback: () => {
            // store.dispatch('loginOut');
          },
        });
      } else {
        Message.error(error.response.message);
      }
    }
    return Promise.reject(error);
  }
);

export default request;
// /* 统一封装get请求 */
// export const get = (url: string, params: any = {}, config: any = {}) => {
//   // params = { token: getToken(),...params };
//   return new Promise((resolve, reject) =>
//     request({ method: 'get', url, params, ...config }).then(resolve, reject)
//   );
// };
// /* 统一封装delete请求 */
// export const deleteAction = (url: string, params: any = {}, config: any = {}) => {
//   // params = { token: getToken(),...params };
//   return new Promise((resolve, reject) =>
//     request({ method: 'post', url, params, ...config }).then(resolve, reject)
//   );
// };

// /* 统一封装post请求  */
// export const post = (url: string, data: any = {}, config: any = {}) => {
//   return new Promise((resolve, reject) =>
//     request({ method: 'post', url, data, ...config }).then(resolve, reject)
//   );
// };
// export const put = (url: string, data: any = {}, config: any = {}) => {
//   return new Promise((resolve, reject) =>
//     request({ method: 'put', url, data, ...config }).then(resolve, reject)
//   );
// };
