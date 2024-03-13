import React from 'react'
import { View } from '@tarojs/components'
import { Search, Image, Icon, Tag, Cell } from '@antmjs/vantui'
import './index.scss'
const { useState, memo } = React;

const IntelligentRobot = () => {
  const [keyWord, setKeyWord] = useState('');
  const [tagIndex, setTagIndex] = useState(0);

  const onSearchChange = (v) => {
    console.log(v);
    setKeyWord(v)
  }

  return (
    <View className='intelligentRobot'>
      <View>
        <Search value={keyWord} onChange={(e) => onSearchChange(e.detail.value)} placeholder="搜索" />
      </View>

      <View className="tag-wrap">
        {
          ['推荐', '游戏动漫', '内容创作', '工作', '学习','旅游','旅游1','旅游2'].map((v, i) => (
            <Tag
              key={v}
              className={tagIndex === i ? 'tag-active' : ''}
              onClick={() => setTagIndex(i)}>
              { !i && <Icon name="good-job-o" size={30} className="good-icon" /> }
              {v}
            </Tag>
          ))
        }
      </View>

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
              renderRightIcon={
                <Icon name="add-o" size={30} className='right_add' />
              }
            >
            </Cell>
          ))
        }
      </View>
    </View>
  )
}

export default memo(IntelligentRobot);
