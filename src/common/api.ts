import Taro from "@tarojs/taro";
import { getAuthData } from '@/common/utils';
import store from '../store/index';

const interceptor = function (chain) {
  const requestParams = chain.requestParams;
  console.log(requestParams)
  return chain.proceed(requestParams);
}
Taro.addInterceptor(interceptor)

export default (params: Taro.request.Option<any, any>) => {
  const config: Record<string, any> = store.getState()?.config || {};
  console.log('config', config)
  const host = config?.apiUrl
  const header = {
    Authorization: `bearer ${getAuthData()?.token?.id_token}`,
  }
  return Taro.request({
    timeout: 30000,
    ...params,
    header: Object.assign(header, params.header || {}),
    url: `${host}${params.url}`
  });
};