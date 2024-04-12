import React from 'react'
import Taro from '@tarojs/taro'
import {
  Button,
  Image,
  Tabs,
  Tab,
  SwipeCell,
  Cell,
  Icon,
  Loading,
  Skeleton,
  Empty,
  Row,
  Col,
  PullToRefresh,
  IPullToRefreshProps
} from '@antmjs/vantui'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux';
import {getCurrentInstance} from '@tarojs/runtime';
import { getAuthData, toQuerystring } from '../../common/utils';
import {sdk as bff} from '../../utils';
import './index.scss'
import IconFont from '../../components/iconfont';
import ThemeContainer from '../../components/theme/index'
import default_chat from '../../images/default_chat.png'


const { memo, useEffect, useState } = React;

const My = () => {
  const [loading, setLoading] = useState(false);
  const [listGpts, setListGpts] = useState<any>([]);
  const { isUpdate }: Record<string, any> = getCurrentInstance().router?.params || {};

  const { name, apiUrl, T }: any = useSelector((state: any) => {
    const config = state.config
    return {
      name: config.userInfo?.name,
      apiUrl: config.apiUrl,
      T: config.locales?.data,
    };
  });

  console.log(T)

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
    return nodes.filter(item => item.creator === name)
  }

  const onDeleteRobot = async (item) => {
    if (!item.name) {
      return
    }
    const authData = getAuthData();
    const result: any = await bff.deleteApplication({
      input: {
        name: item.name,
        namespace: authData?.project,
      },
    }).catch(error => {
      console.warn('listApplications failed', error);
    });
    const application = result?.Application?.deleteApplication;
    if (application === 'ok') {
      Taro.showToast({
        title: '智能体删除成功',
        duration: 1000
      });
      setListGpts(listGpts.filter(gpt => gpt.name !== item.name))
    }
  }

  const onUpdateRobot = (data) => {
    const params = {
      app_name: data.name,
      app_namespace: data.namespace,
    }
    Taro.navigateTo({
      url: `/pages/updateRobot/index?${toQuerystring(params)}`,
    });
  }

  const onCreateRobot = () => {
    Taro.navigateTo({
      url: '/pages/createRobot/index'
    });
  }

  const onToSetting = () => {
    Taro.navigateTo({
      url: '/pages/setting/index'
    });
  }

  const onEditUserInfo = () => {
    Taro.navigateTo({
      url: '/pages/editUserInfo/index'
    });
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
    <ThemeContainer isTabBar>
      <View className='my_page'>

        <View className='my_avatar'>
          <Image round width={110} height={110} src={default_chat} />

          <View className='at-article__h3 my_nick_name'>{ name || '-' }</View>

          <Button className='editInfo' type='primary' onClick={onEditUserInfo}>{ T['editPersonalData'] }</Button>

          <Button icon='setting-o' className='setting' onClick={onToSetting} />
        </View>

        <Tabs animated titleActiveColor='#901aff'>
          <Tab title={T['robot']}>
            <View className='robot_list'>
              <PullToRefresh onRefresh={onRefresh} touchMinTime={0}>
                {
                  listGpts.length ? listGpts.map((item) => (
                    <SwipeCell
                      key={item?.id}
                      rightWidth={140}
                      renderRight={
                        <Row gutter={0} className='h100'>
                          <Col span={12} className='h100'>
                            <Button
                              square
                              block
                              size='large'
                              className='swipe-cell-btn'
                              color='#8F1AFF'
                              onClick={() => onUpdateRobot(item)}
                            >
                              {/*<IconFont name='bianji' color='#fff' size={55} />*/}
                              { T['edit'] }
                            </Button>
                          </Col>
                          <Col span={12} className='h100'>
                            <Button
                              square
                              block
                              size='large'
                              className='swipe-cell-btn'
                              color='#E81F1F'
                              onClick={() => onDeleteRobot(item)}
                            >
                              {/*<IconFont name='shanchu' color='#fff' size={50} />*/}
                              { T['delete'] }
                            </Button>
                          </Col>
                        </Row>
                      }
                    >
                      <Cell
                        clickable
                        className='robot_wrap'
                        onClick={() => onToRobotChat(item)}
                        renderIcon={
                          <Image
                            className='list_img'
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
                    </SwipeCell>
                  )) : (loading ?
                    <View className='loading'>
                      <Loading size={24}>{T['loading']}...</Loading>
                      <Skeleton title avatar row='2' loading={loading} />
                    </View> :
                    <Empty description={T['noData']} />)
                }
              </PullToRefresh>

              <Button round className='add-btn' onClick={onCreateRobot}>
                <Icon name='plus' size={50} />
              </Button>
            </View>
          </Tab>
          <Tab title={T['laboratory']}>
            <View className='laboratory_desc'>
              <View>{T['upgradeToAi']}</View>
              <View>{T['earlyAccess']}</View>
              <Button className='subscribe' round size='small' type='primary'>
                {T['subscribe']}
              </Button>
            </View>
          </Tab>
        </Tabs>
      </View>
    </ThemeContainer>
  )
}

export default memo(My);
