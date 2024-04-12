import React from 'react'
import Taro from '@tarojs/taro';
import {getAuthData, toQuerystring} from '@/common/utils';
import {sdk as bff} from '@/utils';
import {getCurrentInstance} from '@tarojs/runtime';
import { View } from '@tarojs/components'
import {Image, Cell, Loading, Skeleton, Empty, PullToRefresh, IPullToRefreshProps} from '@antmjs/vantui'
import {useSelector} from 'react-redux';
import IconFont from "../../components/iconfont"
import ThemeContainer from '../../components/theme/index'
import './index.scss'
import default_chat from '../../images/default_chat.png'

const { memo, useEffect, useState } = React;

const PublisherDetail = () => {

  const [loading, setLoading] = useState(false);
  const [listGpts, setListGpts] = useState<any>([]);
  const { isUpdate }: Record<string, any> = getCurrentInstance().router?.params || {};

  const { name, phone, apiUrl, T }: any = useSelector((state: any) => {
    console.log(state);
    const config = state.config
    return {
      name: config.userInfo?.name,
      phone: config.userInfo?.phone,
      apiUrl: config.apiUrl,
      T: config.locales?.data,
    };
  });


  useEffect(() => {
    onRefresh()
  }, [isUpdate]);

  Taro.useDidShow(() => {
    console.log('componentDidShow')
  })

  const onRefresh: IPullToRefreshProps['onRefresh'] = () => {
    return new Promise(async (resolve) => {
      const nodes = await getListGPTs()
      setListGpts(nodes)
      console.log('onRefresh')
      resolve(undefined)
    })
  }

  const getListGPTs = async () => {
    const authData = getAuthData();
    setLoading(true)
    const agentData: any = await bff.listApplications({
      input: {
        page: 1,
        pageSize: -1,
        namespace: authData?.project,
      },
    }).catch(error => {
      setLoading(false)
      console.warn('listApplications failed', error);
    });
    setLoading(false)
    const nodes = agentData?.Application?.listApplicationMetadata?.nodes || [];
    // setListGpts(nodes.filter(item => item.creator === name));
    return nodes.filter(item => item.creator === name);
  }

  const onToRobotChat = (data) => {
    const params = {
      displayName: data.displayName,
      app_name: data.name,
      app_namespace: data.namespace,
    }
    Taro.navigateTo({
      url: `/pages/chat/index?${toQuerystring(params)}`
    });
  }

  return (
    <ThemeContainer>
      <View className='publisher_detail'>

        <View className='my_avatar'>
          <Image round width={110} height={110} src={default_chat} />

          <View className='my_nick_name'>{name || '-'}</View>
          <View className='my_id'>ID：{phone}</View>
        </View>

        <View className='robot_list'>
          <PullToRefresh onRefresh={onRefresh} touchMinTime={0}>
            {
              listGpts.length ? listGpts.map((item) => (
                <Cell
                  key={item.id}
                  clickable
                  className='robot_wrap'
                  onClick={() => onToRobotChat(item)}
                  renderIcon={
                    <Image
                      className='list_img'
                      key={item?.icon}
                      round
                      lazyLoad
                      width={110}
                      height={110}
                      src={`${apiUrl}${item?.icon}` || default_chat}
                    />
                  }
                  renderTitle={
                    <View className='list_content'>
                      <View className='list-title'>
                        { item.displayName || '' }
                      </View>
                      <View className='list-desc'>
                        { item.description || '' }
                      </View>
                      <View className='list_info'>
                        <View className='list-article-hot-info'>
                          <IconFont name='ef-redian-gongju' color='#959595' size={35} />
                          {item?.hot || 0}w
                        </View>
                        <View className='list-article-info'>
                          @{item?.creator || ''}
                        </View>
                      </View>
                    </View>
                  }
                >
                </Cell>
              )) : (loading ?
                <View className='loading'>
                  <Loading size={24}>{T['loading']}...</Loading>
                  <Skeleton title avatar row='2' loading={loading} />
                </View> :
                <Empty description={T['noData']} />)
            }
          </PullToRefresh>

        </View>

      </View>
    </ThemeContainer>
  )
}

export default memo(PublisherDetail);
