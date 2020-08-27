//姓名
export const isRealName = (str: string): boolean => {
  const reg = /^[\u4E00-\u9FA5]{2,8}$/;
  return reg.test(str.trim());
};
// 密码
export const isPassword = (str: string): boolean => {
  // /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/ //8-20位的数字字母或特殊字符组合
  // 密码由6-18英文字符、数字或下划线组成
  const reg = /^[A-Za-z0-9_-]{6,18}$/;
  return reg.test(str.trim());
};
// 不包含中文字符
export const hasNotCh = (str: string): boolean => {
  const reg = /^[^\u4e00-\u9fa5]{0,}$/;
  return reg.test(str.trim());
};

//金额
export const isMoney = (str: string): boolean => {
  const reg = /(^[0-9]+\.?[0-9]+$)|(^[1-9]$)/;
  return reg.test(str.trim());
};
// 身份证
export const isIdcard = (str: string): boolean => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(str.trim());
};
//手机号
export const isPhoneNo = (str: string): boolean => {
  // 0?(13|14|15|17|18|19)[0-9]{9}
  // /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
  const reg = /^1[0-9]{10}$/;
  return reg.test(str.trim());
};
//座机
export const isTelPhone = (str: string): boolean => {
  const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  return reg.test(str.trim());
};
// 邮箱
export const isEmail = (str: string): boolean => {
  // \w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  return reg.test(str.trim());
};
// URL地址
export const isURL = (str: string): boolean => {
  const reg = /^http[s]?:\/\/.*/;
  return reg.test(str.trim());
};
// IP地址
export const ipAddress = (str: string): boolean => {
  const reg = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
  return reg.test(str.trim());
};
