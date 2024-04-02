import React, {useEffect} from 'react'
import Taro from '@tarojs/taro';
import {getCurrentInstance} from '@tarojs/runtime';
import { View } from '@tarojs/components'
import {ActionSheet, Image, Cell, CellGroup, Toast, ShareSheet} from '@antmjs/vantui'
import { sdk as bff } from '../../utils/index';
import './index.scss'
import IconFont from "../../components/iconfont"

const { memo, useState } = React;

const options = [
  {
    name: '微信',
    icon: 'wechat',
    openType: 'share',
  },
  {
    name: '微博',
    icon: 'weibo',
  },
  {
    name: '复制链接',
    icon: 'link',
  },
  {
    name: '分享海报',
    icon: 'poster',
  },
  {
    name: '二维码',
    icon: 'qrcode',
  },
]

const RobotDetail = () => {
  const [show, setShow] = useState(false)
  const [audioShow, setAudioShow] = useState(false)
  const [shareShow, setShareShow] = useState(false)
  const [robotInfo, setRobotInfo] = useState<any>({})
  const [language, setLanguage] = useState('中文')
  const [audio, setAudio] = useState('温柔')
  const [actions] = useState([
    { name: '中文' },
    { name: 'English' }
  ])
  const [audioActions] = useState([
    { name: '温柔',},
    { name: '魅力',},
    { name: '文静',},
    { name: '傲娇',},
  ])
  const { app_name, app_namespace }: Record<string, any> = getCurrentInstance().router?.params || {};
  const fontColor = '#8F1AFF'
  
  useEffect(() => {
    getApplication();
  }, [app_name, app_namespace])

  const getApplication = async () => {
    const res = await bff.getApplication({
      name: app_name,
      namespace: app_namespace,
    }).catch(error => {
      console.warn('getApplication failed', error);
    });
    const Application: any = res?.Application?.getApplication || {};
    setRobotInfo(Application);
  }

  const onToReport = () => {
    Taro.navigateTo({
      url: '/pages/report/index'
    });
  }

  return (
    <View className='robot_detail'>
      <View className='my_avatar'>
        <View className='my_avatar_img'>
          <Image round width={230} height={230} src={robotInfo?.metadata?.icon} />
        </View>
        <View className='my_desc'>{robotInfo?.metadata?.description || ''}</View>

        <View className='my_info'>
          <View className='my_hot'>
            <IconFont name='ef-redian-gongju' color='#959595' size={35} />
            0万
          </View>
          <View className='my_nick_name'>@{robotInfo?.metadata?.displayName || ''}</View>
        </View>

      </View>

      <CellGroup inset className='cell-group'>
        <Cell center renderIcon={
          <IconFont name='biaoshimoxing' color={fontColor} size={35} />
        } title='模型服务' value={robotInfo?.llm || ''}
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={<IconFont name='yuyan1' color={fontColor} size={35} />}
          title='语言'
          onClick={() => setShow(true)}
          value={language}
          isLink
        />
        <Cell
          center
          renderIcon={
          <IconFont name='shengyin' color={fontColor} size={35} />}
          title='声音'
          onClick={() => setAudioShow(true)}
          value={audio}
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={
            <IconFont name='fenxiang' color={fontColor} size={35} />
          }
          onClick={() => setShareShow(true)}
          title='分享给好友'
          isLink
        />
        <Cell
          center
          renderIcon={
            <IconFont name='jubao' color={fontColor} size={35} />}
          title='举报'
          onClick={onToReport}
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell center renderIcon={
          <IconFont name='qingchushujuku' color={fontColor} size={35} />
        }  title='清除上下文'
        />
        <Cell
          center
          renderIcon={
            <IconFont name='shanchu' color={fontColor} size={35} />}
          title='删除聊天记录'
        />
      </CellGroup>

      <ActionSheet
        show={show}
        actions={actions}
        onClose={() => setShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          setLanguage(e.detail.name)
          setShow(false);
        }}
      />

      <ActionSheet
        show={audioShow}
        actions={audioActions}
        onClose={() => setAudioShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          setAudio(e.detail.name);
          setAudioShow(false);
        }}
      />

      <ShareSheet
        show={shareShow}
        closeOnClickOverlay
        title='分享给好友'
        options={options}
        onSelect={(e) => Toast.show(e.detail.name)}
        onClose={() => setShareShow(false)}
      />

    </View>
  )
}

export default memo(RobotDetail);
