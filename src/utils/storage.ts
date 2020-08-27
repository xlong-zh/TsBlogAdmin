import { TOKEN_KEY } from '@/config/consts';
const rememberStatus: boolean = localStorage.getItem('rememberStatus') === 'true' ? true : false;
// 获取本地sessionStorage/localStorage
export const getStore = (key: string) => {
  if (rememberStatus) {
    return localStorage.getItem(key);
  } else {
    return sessionStorage.getItem(key);
  }
};

// 设置本地sessionStorage/localStorage
export const setStore = (key: string, value: string) => {
  if (rememberStatus) {
    return localStorage.setItem(key, value);
  } else {
    return sessionStorage.setItem(key, value);
  }
};
// 移除sessionStorage/localStorage
export const removeStore = (key: string) => {
  if (rememberStatus) {
    return localStorage.removeItem(key);
  } else {
    return sessionStorage.removeItem(key);
  }
};
// 移除全部存储数据
export const removeAll = () => {
  return localStorage.clear();
};
export const removeSession = () => {
  return sessionStorage.clear();
};

// 获取本地token
export const getToken = () => {
  return getStore(TOKEN_KEY);
};
// 设置本地token
export const setToken = (token: string) => {
  return setStore(TOKEN_KEY, token);
};

// 移除本地token
export const removeToken = () => {
  return removeStore(TOKEN_KEY);
};
