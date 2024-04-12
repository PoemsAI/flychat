import { PropsWithChildren, memo } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import {Provider } from 'react-redux'
import store from './store/index'
import $Api from './common/api';
import { getAuthData, setAuthData } from './common/utils';
import { updateUserInfo, updateLocale } from './actions';
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    console.log('App launched.')
    const lang = Taro.getStorageSync('locales') || 'zh_CN'
    store.dispatch(await updateLocale(lang))
    getUserInfo();
  })

  const getUserInfo = async () => {
    const res = await $Api({
      url: `/bff`,
      method: 'POST',
      data: {
        operationName:"getCurrentUser",
        query: "query getCurrentUser {\n  userCurrent {\n    name\n    email\n    role\n    password\n    description\n    phone\n    creationTimestamp\n  }\n}",
      }
    })

    const user: Record<string, any> = res?.data?.data?.userCurrent || {};
    if (user.name) {
      const authData = getAuthData();
      if (!authData.user) {
        authData.user = {};
      }
      authData.user = user;
      setAuthData(JSON.stringify(authData));
      store.dispatch(await updateUserInfo(user))
    }
  }

  return (<Provider store={store}>{
      children
    }</Provider>
 )
}

export default memo(App)
