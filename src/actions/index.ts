import Taro from '@tarojs/taro';

export const SET_THEME = 'SET_THEME';
export const updateTheme = async (theme: string) => {

  let currTheme = theme;
  if (currTheme === 'system') {
    const systemInfo = Taro.getSystemInfoSync();
    console.log('systemInfo', systemInfo);
    currTheme = systemInfo.theme || currTheme;
  }

  if (currTheme === 'light') {
    Taro.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f5f6f8',
    })
  } else if(currTheme == 'dark'){
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#191919',
    })
  }
  Taro.setStorageSync('theme', theme);
  return {
    type: SET_THEME,
    data: theme,
  };
}

export const SET_API_URL = 'SET_API_URL';
export const updateApiUrl = async (url: string) => {
  return {
    type: SET_API_URL,
    data: url,
  };
}

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const updateUserInfo = async (data: object) => {
  return {
    type: UPDATE_USER_INFO,
    data,
  };
}

export const UPDATE_LOCALE = 'UPDATE_LOCALE';
export const updateLocale = async (lang: string) => {
  Taro.setStorageSync('locales', lang)
  return {
    type: UPDATE_LOCALE,
    data: lang,
  };
}