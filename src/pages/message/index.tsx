import React from 'react'
import { View } from '@tarojs/components'
import {SwipeCell, CellGroup, Button, Cell, Image, Row, Col} from '@antmjs/vantui'
import './index.scss'
const { memo } = React;

const Message = () => {

  return (
    <View className='message_list'>
      {Array(10).fill(1).map((_v, i) => (
        <SwipeCell
          rightWidth={140}
          renderRight={
            <Row gutter={0}>
              <Col span={12}>
                <Button square block size="large" icon="back-top" className="swipe-cell-btn" color="#8F1AFF" />
              </Col>
              <Col span={12}>
                <Button square block size="large" icon="delete-o" className="swipe-cell-btn" color="#E81F1F" />
              </Col>
            </Row>
          }
        >
          <CellGroup>
            <Cell
              clickable
              key={i}
              renderIcon={
                <Image
                  className="list_img"
                  round
                  width={108}
                  height={108}
                  src='https://img.yzcdn.cn/vant/cat.jpeg' />
              }
              renderTitle={
                <View>
                  <View className="list_title">KubeAGI({i+1})</View>
                  <View className="list_desc">官方问答</View>
                </View>
              }
            />
          </CellGroup>
        </SwipeCell>
       ))
      }
    </View>
  )
}

export default memo(Message);
