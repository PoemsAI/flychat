import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import {Provider, useDispatch} from 'react-redux'
import store from './store/index'
import $Api from './common/api';
import { getAuthData, setAuthData } from './common/utils';
import { updateUserInfo } from './actions';
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
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
      const dispatch = useDispatch();
      dispatch(await updateUserInfo(user))
      setAuthData(authData);
    }
  }

  return (<Provider store={store}>{
    children
  }</Provider>)
}

export default App
