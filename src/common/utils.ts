import Taro from "@tarojs/taro";

export function toQuerystring(obj, options = {}) {
  let { sep, eq, encode }: any = options;
  sep = sep || '&';
  eq = eq || '=';
  if (!obj) {
    return '';
  }
  const stringifyPrimitive = v => {
    switch (typeof v) {
      case 'string':
        return encode ? encodeURIComponent(v) : v;
      case 'boolean':
        return v ? 'true' : 'false';
      case 'number':
        return isFinite(v) ? v : '';
      default:
        return '';
    }
  };
  for (const k in obj) {
    if (obj[k] === null || obj[k] === '' || obj[k] === undefined) {
      delete obj[k];
    }
  }
  const queryString = Object.keys(obj)
    .sort()
    .map(k => {
      const ks = stringifyPrimitive(k) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k]
          .map(v => {
            return ks + stringifyPrimitive(v);
          })
          .join(sep);
      }
      return ks + stringifyPrimitive(obj[k]);
    })
    .join(sep);
  if (!queryString) {
    return '';
  }
  return queryString;
}

export const AUTH_DATA = 'authData';

export const setAuthData = (data: string): void => {
  try {
    Taro.setStorageSync(AUTH_DATA, data || {})
  } catch (e) {
    console.error(e);
  }
}

export const getAuthData: any = (): {} => {
  try {
    const data =  Taro.getStorageSync(AUTH_DATA) || {};
    if (typeof data === 'string') {
      return JSON.parse(data || '{}');
    }
    return data;
  } catch (e) {
    console.error(e);
    return  {};
  }
}

export const removeAuthData = () => {
  Taro.removeStorageSync(AUTH_DATA);
}