import React, {useEffect, useState} from 'react'
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components'
import {SwipeCell, CellGroup, Button, Cell, Image, Row, Col,
  PullToRefresh,
  VirtualList,
  InfiniteScroll,
  InfiniteScrollInstance,
  IVirtualListInstance,
  InfiniteScrollProps,
  IPullToRefreshProps,
} from '@antmjs/vantui'
import './index.scss'
import IconFont from '../../components/iconfont';
import $Api from '../../common/api';
import { toQuerystring } from '../../common/utils';
import default_chat from '../../assets/images/default_chat.png'

const { memo, useRef } = React;

const Message = () => {

  const [conversations, setConversations] = useState<Record<string, any>[]>([]);

  const InfiniteScrollInstance = useRef<InfiniteScrollInstance>()
  const VirtualListInstance = useRef<IVirtualListInstance>()

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
      InfiniteScrollInstance.current?.reset()
      const result = await getConversations()
      await VirtualListInstance.current?.reset()
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
    <View className='message_list'>

      <PullToRefresh onRefresh={onRefresh} touchMinTime={200}>
        <VirtualList
          height='100vh'
          dataSource={conversations}
          showCount={10}
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
                        <IconFont name='zhiding' color='#fff' size={55} />
                      </Button>
                    </Col>
                    <Col span={12} className='h100'>
                      <Button square block size='large' className='swipe-cell-btn' color='#E81F1F' >
                        <IconFont name='shanchu' color='#fff' size={50} />
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
                        width={108}
                        height={108}
                        src={item?.icon || default_chat}
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
  )
}

export default memo(Message);
