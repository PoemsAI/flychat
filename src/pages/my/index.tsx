import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import {Button, Image, Tabs, Tab, Cell, Icon} from '@antmjs/vantui'

const { memo } = React;

const My = () => {

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

  return (
    <View className='my_page'>

      <View className="my_avatar">
        <Image round width={110} height={110} src='https://img.yzcdn.cn/vant/cat.jpeg' />

        <View className="at-article__h3 my_nick_name">智慧女孩不秃头</View>

        <Button className="editInfo" type='primary' onClick={onEditUserInfo}>编辑个人资料</Button>

        <Button icon="setting-o" className="setting" onClick={onToSetting} />
      </View>

      <Tabs animated swipeable titleActiveColor="#901aff">
        <Tab title="智能体">
          <View className="robot_list">
            {
              Array(20).fill(1).map(() => (
                <Cell
                  clickable
                  className="robot_wrap"
                  renderIcon={
                    <Image
                      className="list_img"
                      round
                      width={110}
                      height={110}
                      src='https://img.yzcdn.cn/vant/cat.jpeg' />
                  }
                  renderTitle={
                    <View className="list_content">
                      <View className='list-title'>
                        AI 图片生成
                      </View>
                      <View className='list-desc'>
                        巨大的武装机甲，极简设计，背景荒废，真是透视，真实光影，高饱和度，高
                      </View>
                      <View className='list_info'>
                        <View className='list-article-hot-info'>
                          <Icon name="fire-o" size={24} className="icon" />
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

            <Button round className="add-btn" onClick={onCreateRobot}>
              <Icon name="plus" size={50} />
            </Button>
          </View>
        </Tab>
        <Tab title="实验室">
          <View className="laboratory_desc">
            立即升级到AI+，抢先体验我们的实验性功能！
            <Button className="subscribe" round size="small" type='primary'>
              订阅
            </Button>
          </View>
        </Tab>
      </Tabs>
    </View>
  )
}

export default memo(My);
