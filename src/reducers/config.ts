import * as ActionTypes from '../actions/index'
import { getAuthData } from '../common/utils';
import Taro from '@tarojs/taro';

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

const config = (
  state = {
    theme: Taro.getStorageSync('theme') || 'light',  // 默认主题
    apiUrl: Taro.getStorageSync('api_url') || 'https://portal.kubeagi.com',
    userInfo: getAuthData()?.user || {},
  },
  action
) => ({
  theme: updateTheme(state.theme, action),
  apiUrl: updateApiUrl(state.apiUrl, action),
  userInfo: updateUserInfo(state.userInfo, action),
});

export default config;