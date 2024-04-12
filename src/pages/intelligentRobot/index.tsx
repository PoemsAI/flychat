import React from 'react'
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components'
import {
  Search,
  Image,
  Icon,
  Tag,
  Cell,
  Loading,
  Skeleton,
  Empty,
  PullToRefresh,
  IPullToRefreshProps,
} from '@antmjs/vantui'
import {useSelector} from 'react-redux';
import { sdk as bff } from '../../utils/index';
import {getAuthData, toQuerystring} from '../../common/utils';
import './index.scss'
import ThemeContainer from '../../components/theme/index'
import IconFont from '../../components/iconfont';
import default_chat from '../../images/default_chat.png'


const { useState, useEffect, memo } = React;

const IntelligentRobot = () => {
  const [keyWord, setKeyWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [tagId, setTagId] = useState('0');
  const [categoryList, setCategoryList] = useState<any>([{ name: '推荐' ,id: '0'}])
  const [listGpts, setListGpts] = useState<any>([]);

  const { apiUrl, T }: any = useSelector((state: any) => {
    const config = state.config
    return {
      apiUrl: config.apiUrl,
      T: config.locales?.data,
    };
  });

  useEffect(() => {
    getListGPTCategory();
  }, []);

  useEffect(() => {
    setListGpts([]);
    onRefresh();
  }, [tagId])

  const getListGPTCategory = async () => {
    const category: any = await bff.listGPTCategory().catch(error => {
      console.warn('getListGPTCategory failed', error);
    });
    const data = category?.GPT?.listGPTCategory || [];
    setCategoryList(categoryList.concat(data));
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const getListGPTs = async () => {
    const authData = getAuthData();
    const category = tagId === '0' ? 'app-is-recommended=true' : `app-category=${tagId}`
    setLoading(true)
    const agentData: any = await bff.listApplications({
      input: {
        labelSelector: `arcadia.kubeagi.k8s.com.cn/${category}`,
        page: 1,
        pageSize: 999,
        namespace: authData?.project,
        keyword: keyWord,
      },
    }).catch(async error => {
      await sleep(500)
      setLoading(false)
      console.warn('getAgent failed', error);
    });
    await sleep(500)
    setLoading(false)
    const { nodes, hasNextPage} = agentData?.Application?.listApplicationMetadata || { nodes: [], hasNextPage: false }
    // setListGpts(data);
    return { nodes, hasNextPage };
  }

  const onRefresh: IPullToRefreshProps['onRefresh'] = () => {
    return new Promise(async (resolve) => {
      const { nodes } = await getListGPTs()
      setListGpts(nodes)
      console.log('onRefresh')
      resolve(undefined)
    })
  }

  const onSearchChange = (e) => {
    console.log(e);
    setKeyWord(e.detail)
  }

  const onToRobotChat = (data) => {
    // const [app_namespace, app_name] = data?.name?.split('/') || [];
    const { name, displayName, namespace } = data || {};
    const params = {
      displayName,
      app_name: name,
      app_namespace: namespace,
    }
    Taro.navigateTo({
      url: `/pages/chat/index?${toQuerystring(params)}`
    });
  }

  // const filterListGpts = listGpts?.filter(item => item?.displayName?.includes(keyWord))

  return (
    <ThemeContainer isTabBar>
      <View className='intelligentRobot'>
        <View>
          <Search value={keyWord} background='transparent' onChange={onSearchChange} onSearch={onRefresh} placeholder={T['search']} />
        </View>

        <View className='tag-wrap'>
          {
            categoryList.map((v) => (
              <Tag
                key={v.id}
                className={tagId === v.id ? 'tag-active' : ''}
                onClick={() => setTagId(v.id)}
              >
                { !v.id && <Icon name='good-job-o' size={30} className='good-icon' /> }
                {v.name}
              </Tag>
            ))
          }
        </View>

        <View className='robot_list'>
          <PullToRefresh onRefresh={onRefresh} touchMinTime={0} key={tagId}>
            <View>
              {
                listGpts?.length ? listGpts?.map((item) => (
                  <Cell
                    key={item.id}
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
                    renderRightIcon={
                      <Icon name='add-o' size={30} className='right_add' />
                    }
                  >
                  </Cell>
                )) : (loading ?
                  <View className='loading'>
                    <Loading size={24}>加载中...</Loading>
                    <Skeleton title avatar row='2' loading={loading} />
                  </View> :
                  <Empty description='暂无数据' />)
              }
            </View>
          </PullToRefresh>
        </View>
      </View>
    </ThemeContainer>
  )
}

export default memo(IntelligentRobot);
