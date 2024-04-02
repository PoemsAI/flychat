import React from 'react'
import { View } from '@tarojs/components'
import {Image, Cell} from '@antmjs/vantui'
import {useSelector} from 'react-redux';
import IconFont from "../../components/iconfont"
import './index.scss'
import default_chat from '../../assets/images/default_chat.png'

const { memo } = React;

const PublisherDetail = () => {

  const { name, phone }: any = useSelector((state: any) => {
    console.log(state);
    return state.config.userInfo;
  });

  const onToRobotChat = () => {
    // Taro.navigateTo({
    //   url: '/pages/chat/index'
    // });
  }

  return (
    <View className='publisher_detail'>

      <View className='my_avatar'>
        <Image round width={110} height={110} src={default_chat} />

        <View className='my_nick_name'>{name || '-'}</View>
        <View className='my_id'>ID号：{phone}</View>
      </View>

      <View className='robot_list'>
        {
          Array(5).fill(1).map(() => (
            <Cell
              clickable
              className='robot_wrap'
              onClick={onToRobotChat}
              renderIcon={
                <Image
                  className='list_img'
                  round
                  width={110}
                  height={110}
                  src='https://img.yzcdn.cn/vant/cat.jpeg'
                />
              }
              renderTitle={
                <View className='list_content'>
                  <View className='list-title'>
                    AI 图片生成
                  </View>
                  <View className='list-desc'>
                    巨大的武装机甲，极简设计，背景荒废，真是透视，真实光影，高饱和度，高
                  </View>
                  <View className='list_info'>
                    <View className='list-article-hot-info'>
                      <IconFont name='ef-redian-gongju' color='#959595' size={35} />
                      1.2万
                    </View>
                    <View className='list-article-info'>
                      @智慧女孩不秃头
                    </View>
                  </View>
                </View>
              }
            >
            </Cell>
          ))
        }

      </View>

    </View>
  )
}

export default memo(PublisherDetail);
