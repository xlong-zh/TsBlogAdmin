import { formatDate } from '@/utils/util';

// 千位逗号过滤器
export const NumberFormatFilter = (value: string | number): string => {
  if (!value) {
    return '-';
  }
  const intPartFormat = String(value).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
  return intPartFormat;
};

// 时间过滤器
export const dateFilter = (date: any, pattern?: string): string => {
  if (pattern) {
    return formatDate(date, pattern);
  } else {
    return formatDate(date);
  }
};
// 省略过滤器
export const ellipsisFilter = (value: string, vlength: number = 25): string => {
  if (!value) {
    return '-';
  }
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...';
  }
  return value;
};
