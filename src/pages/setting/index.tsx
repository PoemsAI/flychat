import React from 'react'
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { ActionSheet, CellGroup, Cell, ShareSheet, Toast } from '@antmjs/vantui'
import './index.scss'
import IconFont from "../../components/iconfont";
import { updateTheme, updateApiUrl } from "../../actions/index";

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

// const themeConfig = {
//   '浅色模式': 'light',
//   '深色模式': 'dark',
//   '跟随系统': '',
// }

const Setting = () => {
  const [show, setShow] = useState(false)
  const [shareShow, setShareShow] = useState(false)
  const [hostShow, setHostShow] = useState(false)
  const [theme, setTheme] = useState('');
  const [actions] = useState([
    { name: '浅色模式' },
    { name: '深色模式' },
    { name: '跟随系统' }
  ])

  const [hostActions] = useState([
    { name: 'https://gpts.172.22.96.167.nip.io' },
    { name: 'https://gpts.172.40.20.125.nip.io' },
    { name: 'https://gpts.172.22.96.136.nip.io' },
    { name: 'https://portal.kubeagi.com' },
  ])
  const fontColor = '#8F1AFF'
  const dispatch = useDispatch();

  const { phone }: any = useSelector((state: any) => {
    console.log(state);
    return state.config.userInfo;
  });

  const onToAbout = () => {
    Taro.navigateTo({
      url: '/pages/about/index'
    });
  }

  const onToFeedback = () => {
    Taro.navigateTo({
      url: '/pages/feedback/index'
    });
  }

  const onToUpdateToken = () => {
    Taro.navigateTo({
      url: '/pages/updateToken/index'
    });
  }

  return (
    <View className='setting-wrap'>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={
            <IconFont name='shouji' color={fontColor} size={35} />
          }
          title='手机号'
          value={phone}
        />
        <Cell
          center
          renderIcon={
            <IconFont name='weixin' color={fontColor} size={35} />
          }
          title='微信'
          value='去绑定'
          isLink
        />
        <Cell
          center
          renderIcon={
            <IconFont name='apple' color={fontColor} size={35} />
          }
          title='Apple ID'
          value='去绑定'
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
            <IconFont name='bianji' color={fontColor} size={35} />
          }
          onClick={onToFeedback}
          title='反馈与投诉，帮助我们改进'
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={
            <IconFont name='brightj2' color={fontColor} size={35} />
          }
          title='背景设置'
          value={theme || '浅色模式'}
          onClick={()=> setShow(true)}
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={
            <IconFont name='guanyu_o' color={fontColor} size={40} />
          }
          title='关于我们'
          onClick={onToAbout}
          isLink
        />
        <Cell
          center
          onClick={onToUpdateToken}
          renderIcon={
            <IconFont name='bianji' color={fontColor} size={35} />
          }
          title='更新Token'
          isLink
        />
        <Cell
          center
          onClick={() => setHostShow(true)}
          renderIcon={
            <IconFont name='bianji' color={fontColor} size={35} />
          }
          title='切换apiUrl'
          isLink
        />

        <Cell
          center
          renderIcon={
            <IconFont name='tuichu-' color={fontColor} size={30} style={{ marginLeft: 3 }} />
          }
          title='退出登录'
        />
      </CellGroup>

      <Toast />

      <ActionSheet
        show={hostShow}
        actions={hostActions}
        onClose={() => setHostShow(false)}
        onSelect={async (e) => {
          console.info(e.detail.name);
          Taro.setStorageSync('api_url', e.detail.name)
          setHostShow(false);
          dispatch(await updateApiUrl(e.detail.name))
          Taro.showToast({
            title: '更新api成功',
            duration: 1000
          });
        }}
      />

      <ActionSheet
        show={show}
        actions={actions}
        onClose={() => setShow(false)}
        onSelect={async (e) => {
          console.info(e.detail.name);
          Taro.setStorageSync('api_url', e.detail.name)
          setTheme(e.detail.name);
          setShow(false);
          dispatch(await updateTheme(e.detail.name))
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

export default memo(Setting);
