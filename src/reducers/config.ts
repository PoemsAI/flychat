import Taro from '@tarojs/taro';
import * as ActionTypes from '../actions/index'
import { getAuthData } from '../common/utils';
import { getLocale } from '../utils/locales';

function updateTheme(state, action) {
  console.log(state, action)
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return action.data;
    default:
      return state;
  }
}

function updateApiUrl(state, action) {
  switch (action.type) {
    case ActionTypes.SET_API_URL:
      return action.data;
    default:
      return state;
  }
}

function updateUserInfo(state, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_INFO:
      return action.data;
    default:
      return state;
  }
}

function updateLocale(state, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_LOCALE:
      return {
        ...state,
        language: action.data,
        data: getLocale(action.data),
      };
    default:
      return state;
  }
}

const config = (
  state = {
    theme: Taro.getStorageSync('theme') || 'light',  // 默认主题
    apiUrl: Taro.getStorageSync('apiUrl') || 'https://portal.kubeagi.com',
    userInfo: getAuthData()?.user || {},
    locales: {
      language: Taro.getStorageSync('locales') || 'zh_CN',
      data: {},
    },
  },
  action
) => ({
  theme: updateTheme(state.theme, action),
  apiUrl: updateApiUrl(state.apiUrl, action),
  userInfo: updateUserInfo(state.userInfo, action),
  locales: updateLocale(state.locales, action),
});

export default config;