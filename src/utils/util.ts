// 简单深拷贝
export function SimpleDeepCopy(val: any): any {
  return JSON.parse(JSON.stringify(val));
}
// 过滤对象中为空的属性
interface IOriginObj {
  [key: string]: any;
}
export function filterObj(obj: IOriginObj): boolean | IOriginObj {
  if (!(Object.keys(obj) && Object.keys(obj).length)) {
    return false;
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
}

// 时间格式化
export function formatDate(value: any, fmt: string = 'YYYY/MM/DD hh:mm:ss'): string {
  if (!value) {
    return '-';
  }
  const getDate = new Date(value);
  const opt: { [key: string]: string } = {
    'Y+': getDate.getFullYear().toString(),
    'M+': (getDate.getMonth() + 1).toString(),
    'D+': getDate.getDate().toString(),
    'h+': getDate.getHours().toString(),
    'm+': getDate.getMinutes().toString(),
    's+': getDate.getSeconds().toString()
  };
  for (let k in opt) {
    const ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
    }
  }
  return fmt;
}
// 生成随机ID
function seededRandom(max: number, min: number, seed: number): number {
  max = max || 1;
  min = min || 0;
  seed = (seed * 9301 + 49297) % 233280;
  const rnd = seed / 233280.0;
  return min + rnd * (max - min);
}
export function makeId(): string {
  const seed = new Date().getTime();
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(seededRandom(0, possible.length, seed)));
  }
  return text;
}
//解决小数运算浮点数函数（2个数字的(+,-,*,/,%)可用）;
export function cleanFloatingNum(numa: string | number, numb: string | number, oper: string): number {
  const lena = String(numa).split('.').length > 1 ? String(numa).split('.')[1].length : 0;
  const lenb = String(numb).split('.').length > 1 ? String(numb).split('.')[1].length : 0;
  const lenMax = Math.max(lena, lenb);
  const times = Number('1e' + lenMax);
  let result = 0;
  if (oper === '*') {
    result = (Number(numa + 'e' + lenMax) * Number(numb + 'e' + lenMax)) / times / times;
  } else if (oper === '+') {
    result = (Number(numa + 'e' + lenMax) + Number(numb + 'e' + lenMax)) / times;
  } else if (oper === '-') {
    result = (Number(numa + 'e' + lenMax) - Number(numb + 'e' + lenMax)) / times;
  } else if (oper === '/') {
    result = Number(numa + 'e' + lenMax) / Number(numb + 'e' + lenMax);
  } else if (oper === '%') {
    result = (Number(numa + 'e' + lenMax) % Number(numb + 'e' + lenMax)) / times;
  }
  return result;
}

//将base64转换为文件对象
export function dataURLtoFile(dataurl: string, filename: string, type: string = 'file') {
  const arr = dataurl.split(',');
  const mimeArr = arr[0].match(/:(.*?);/);
  const mime = (mimeArr && mimeArr[1]) || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (type === 'file') {
    //转换成file对象
    return new File([u8arr], filename, { type: mime });
  } else {
    //转换成成blob对象
    return new Blob([u8arr], { type: mime });
  }
}

// window.addEventListener("resize", onWindowResize, false);

// // 兼容的事件绑定方法(兼容ie)
// export const addEvent = (element: any, event: string, handler: any):void => {
//   if (document.addEventListener) {
//     if (element && event && handler) {
//       element.addEventListener(event, handler, false);
//     }
//   } else {
//     if (element && event && handler) {
//       element.attachEvent('on' + event, handler);
//     }
//   }
// };
// // 兼容的事件移除方法(兼容ie)
// export const removeEvent = (element: any, event: string, handler: any):void => {
//   if (document.addEventListener) {
//     if (element && event && handler) {
//       element.removeEventListener(event, handler, false);
//     }
//   } else {
//     if (element && event && handler) {
//       element.detachEvent('on' + event, handler);
//     }
//   }
// };
