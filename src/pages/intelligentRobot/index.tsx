import React from 'react'
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components'
import {
  Search,
  Image,
  Icon,
  Tag,
  Cell,
  PullToRefresh,
  InfiniteScroll,
  InfiniteScrollInstance,
  IVirtualListInstance,
  InfiniteScrollProps,
  IPullToRefreshProps,
} from '@antmjs/vantui'
import { sdk as bff } from '../../utils/index';
import { toQuerystring } from '../../common/utils';
import './index.scss'
import IconFont from '../../components/iconfont';


const { useState, useEffect, useRef, memo } = React;

const IntelligentRobot = () => {
  const [classify] = useState(['推荐', '游戏动漫', '通用对话', '工作学习', '内容创作', 'AI绘画','影音生成','角色扮演','生活趣味','其他']);
  const [keyWord, setKeyWord] = useState('');
  const [tagIndex, setTagIndex] = useState(0);

  const [listGpts, setListGpts] = useState<any>([]);

  const InfiniteScrollInstance = useRef<InfiniteScrollInstance>()
  const VirtualListInstance = useRef<IVirtualListInstance>()

  const isFirst = useRef(true)
  const isNextPage = useRef(true)

  useEffect(() => {
    if(isFirst.current) {
      isFirst.current = false;
      return;
    }
    onRefresh();
  }, [tagIndex])

  const getListGPTs = async () => {
    const agentData = await bff.listGPTs({
      input: {
        category: classify[tagIndex],
        page: 1,
        pageSize: 99,
      },
    }).catch(error => {
      console.warn('getAgent failed', error);
    });
    const { nodes, hasNextPage} = agentData?.GPT?.listGPT || { nodes: [], hasNextPage: false }
    // setListGpts(data);
    return { nodes, hasNextPage };
  }

  const loadMore: InfiniteScrollProps['loadMore'] = async () => {
    return new Promise(async (resolve) => {
      if(!isNextPage.current) {
        resolve('complete')
        return;
      }
      const { nodes, hasNextPage } = await getListGPTs()
      if(Array.isArray(nodes)) {
        const newData = listGpts.concat(nodes)
        setListGpts(newData)
        isNextPage.current = hasNextPage
        resolve('complete')
      } else {
        resolve('error')
      }
      console.log('loadMore')
    })
  }

  const onRefresh: IPullToRefreshProps['onRefresh'] = () => {
    return new Promise(async (resolve) => {
      isNextPage.current = true;
      InfiniteScrollInstance.current?.reset()
      const { nodes, hasNextPage } = await getListGPTs()
      await VirtualListInstance.current?.reset()
      setListGpts(nodes)
      console.log('onRefresh')
      isNextPage.current = hasNextPage;
      resolve(undefined)
    })
  }

  const onSearchChange = (e) => {
    console.log(e);
    setKeyWord(e.detail)
  }

  const onToRobotChat = (data) => {
    const [app_namespace, app_name] = data?.name?.split('/') || [];
    const params = {
      app_name,
      app_namespace
    }
    Taro.navigateTo({
      url: `/pages/chat/index?${toQuerystring(params)}`
    });
  }

  const filterListGpts = listGpts?.filter(item => item?.displayName?.includes(keyWord))

  return (
    <View className='intelligentRobot'>
      <View>
        <Search value={keyWord} background='transparent' onChange={onSearchChange} placeholder='搜索' />
      </View>

      <View className='tag-wrap'>
        {
          classify.map((v, i) => (
            <Tag
              key={v}
              className={tagIndex === i ? 'tag-active' : ''}
              onClick={() => setTagIndex(i)}
            >
              { !i && <Icon name='good-job-o' size={30} className='good-icon' /> }
              {v}
            </Tag>
          ))
        }
      </View>

      <View className='robot_list'>
        <PullToRefresh onRefresh={onRefresh}>
          <View>
            {
              filterListGpts?.map((item) => (
                <Cell
                  clickable
                  className='robot_wrap'
                  onClick={() => onToRobotChat(item)}
                  renderIcon={
                    <Image
                      className='list_img'
                      round
                      width={110}
                      height={110}
                      src={item?.icon || ''}
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
                          {item?.hot || 0}万
                        </View>
                        <View className='list-article-info'>
                          @{item?.creator || ''}
                        </View>
                      </View>
                    </View>
                  }
                  renderRightIcon={
                    <Icon name='add-o' size={30} className='right_add' />
                  }
                >
                </Cell>
              ))
            }
            <InfiniteScroll loadMore={loadMore} ref={InfiniteScrollInstance} />
          </View>
        </PullToRefresh>
      </View>
    </View>
  )
}

export default memo(IntelligentRobot);
