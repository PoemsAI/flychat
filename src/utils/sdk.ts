import { initSdkWithHooks } from '@yuntijs/arcadia-bff-sdk/dist/esm/taro';
import Taro from '@tarojs/taro';

const host = Taro.getStorageSync('api_url') || 'https://portal.kubeagi.com';

export const sdk = initSdkWithHooks({
  // url: 'https://gpts.172.40.20.125.nip.io/kubeagi-apis/bff',
  // url: 'https://gpts.172.22.96.136.nip.io/kubeagi-apis/bff',
  // url: 'https://gpts.172.22.96.167.nip.io/kubeagi-apis/bff',
  url: `${host}/kubeagi-apis/bff`,
})
