import React, {useEffect, useState} from 'react'
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components'
import {useSelector} from 'react-redux';
import {SwipeCell, CellGroup, Button, Cell, Image, Row, Col,
  PullToRefresh,
  VirtualList,
  InfiniteScroll,
  IVirtualListInstance,
  InfiniteScrollProps,
  IPullToRefreshProps,
} from '@antmjs/vantui'
import './index.scss'
import $Api from '../../common/api';
import { toQuerystring } from '../../common/utils';
import default_chat from '../../images/default_chat.png'
import ThemeContainer from '../../components/theme/index'
// import IconFont from '../../components/iconfont';

const { memo, useRef } = React;

const Message = () => {

  const [conversations, setConversations] = useState<Record<string, any>[]>([]);

  const showCount = useRef(7);
  const InfiniteScrollInstance = useRef()
  const VirtualListInstance = useRef<IVirtualListInstance>()

  const { apiUrl, T }: any = useSelector((state: any) => {
    const config = state.config
    return {
      apiUrl: config.apiUrl,
      T: config.locales?.data,
    };
  });

  const loadMore: InfiniteScrollProps['loadMore'] = async () => {
    console.log('loadMore')
    return new Promise(async (resolve) => {
      const result = await getConversations()
      if(Array.isArray(result)) {
        const newData = conversations.concat(result)
        setConversations(newData)
        resolve('complete')
      } else {
        resolve('error')
      }
    })
  }

  const onRefresh: IPullToRefreshProps['onRefresh'] = () => {
    return new Promise(async (resolve) => {
      const result = await getConversations()
      // InfiniteScrollInstance.current?.reset()
      VirtualListInstance.current?.reset()
      setConversations(result)
      resolve(undefined)
    })
  }

  useEffect(() => {
    // getConversations();

  }, [])

  const getConversations = async () => {
    const res = await $Api({
      url: `/kubeagi-apis/chat/conversations`,
      method: 'POST',
    })
    const data = res.data || [];
    if (res.statusCode === 200) {
      // setConversations(data);
    }
    console.log(res);
    return data;
  }

  const deleteConversation = async (id) => {
    if (!id) {
      return
    }
    const res = await $Api({
      url: `/kubeagi-apis/chat/conversations/${id}`,
      method: 'DELETE',
    })
    if(res.data?.message === 'ok') {
      setConversations(conversations.filter(item => item.id !== id))
    }
  }

  const onToRobotChat = (data) => {
    const { id, app_name, app_namespace } = data;
    const params = {
      id,
      app_name,
      app_namespace
    }
    Taro.navigateTo({
      url: `/pages/chat/index?${toQuerystring(params)}`
    });
  }


  return (
    <ThemeContainer isTabBar>
      <View className='message_list'>
        <PullToRefresh onRefresh={onRefresh} touchMinTime={0}>
          <VirtualList
            height='100vh'
            dataSource={conversations}
            showCount={showCount.current}
            ref={VirtualListInstance}
            renderBackToTop={null}
            footer={
              <InfiniteScroll
                parentClassName='van-virtual-list'
                loadMore={loadMore}
                ref={InfiniteScrollInstance}
              />
            }
            ItemRender={memo(({ item }) => {
              return (
                <SwipeCell
                  key={item?.id}
                  rightWidth={140}
                  renderRight={
                    <Row gutter={0} className='h100'>
                      <Col span={12} className='h100'>
                        <Button square block size='large' className='swipe-cell-btn' color='#8F1AFF' >
                          {/*<IconFont name='zhiding' color='#fff' size={55} />*/}
                          {T['pinned']}
                        </Button>
                      </Col>
                      <Col span={12} className='h100'>
                        <Button
                          square
                          block
                          size='large'
                          className='swipe-cell-btn'
                          color='#E81F1F'
                          onClick={() => deleteConversation(item.id)}
                        >
                          {/*<IconFont name='shanchu' color='#fff' size={50} />*/}
                          {T['delete']}
                        </Button>
                      </Col>
                    </Row>
                  }
                >
                  <CellGroup>
                    <Cell
                      clickable
                      onClick={() => onToRobotChat(item)}
                      renderIcon={
                        <Image
                          className='list_img'
                          round
                          lazyLoad
                          width={108}
                          height={108}
                          src={`${apiUrl}${item?.icon}` || default_chat}
                        />
                      }
                      renderTitle={
                        <View className='list_content'>
                          <View className='list_title van-ellipsis'>{ item?.messages?.reverse()?.[0]?.query || item?.app_name || '' }</View>
                          <View className='list_desc van-multi-ellipsis--l2'>{ item?.messages?.reverse()?.[0]?.answer || '' }</View>
                        </View>
                      }
                    />
                  </CellGroup>

                </SwipeCell>
              )})}
          />
        </PullToRefresh>
      </View>
    </ThemeContainer>
  )
}

export default memo(Message);
