import React, {useEffect} from 'react'
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { ActionSheet, CellGroup, Cell, ShareSheet, Toast } from '@antmjs/vantui'
import './index.scss'
import ThemeContainer  from '../../components/theme/index';
import IconFont from "../../components/iconfont";
import {updateTheme, updateApiUrl, updateLocale} from "../../actions/index";

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

const themeConfig = {
  'light': '浅色模式',
  'dark': '深色模式',
  'system': '跟随系统',
  '浅色模式': 'light',
  '深色模式': 'dark',
  '跟随系统': 'system',
}

const langConfig = {
  'zh_CN': '中文',
  'zh_EN': 'English',
  '中文': 'zh_CN',
  'English': 'zh_EN',
}

const Setting = () => {
  const [show, setShow] = useState(false)
  const [langShow, setLangShow] = useState(false)
  const [shareShow, setShareShow] = useState(false)
  const [hostShow, setHostShow] = useState(false)
  const fontColor = '#8F1AFF'
  const dispatch = useDispatch();

  const { phone, theme, language, T }: any = useSelector((state: any) => {
    const config = state.config;
    return {
      phone: config?.userInfo?.phone,
      theme: config.theme,
      language: config.locales?.language,
      T: config.locales.data,
    };
  });

  const [langActions, setLangActions] = useState([
    { name: '中文', color: fontColor },
    { name: 'English' }
  ])

  const [actions, setActions] = useState([
    { name: '浅色模式', color: fontColor },
    { name: '深色模式' },
    { name: '跟随系统' }
  ])

  const [hostActions, setHostActions] = useState([
    { name: 'https://gpts.172.22.96.167.nip.io' },
    { name: 'https://gpts.172.40.20.125.nip.io' },
    { name: 'https://gpts.172.22.96.136.nip.io' },
    { name: 'https://portal.kubeagi.com', color: fontColor },
  ])

  useEffect(() => {
    handleActionColor(themeConfig[theme], actions, setActions)
  }, [theme]);

  useEffect(() => {
    handleActionColor(langConfig[language], langActions, setLangActions)
  }, [language]);

  const onToAbout = () => {
    Taro.navigateTo({
      url: '/pages/about/index'
    });
  }

  const onToFeedback = () => {
    Taro.navigateTo({
      url: '/pages/complaint/index'
    });
  }

  const onToUpdateToken = () => {
    Taro.navigateTo({
      url: '/pages/updateToken/index'
    });
  }

  const handleActionColor = (v, action, setAction) => {
    setAction(action.map((item) => ({
      ...item,
      color: item.name === v ? fontColor : ''
    })));
  }

  return (
    <ThemeContainer>
      <View className='setting-wrap'>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          clickable
          renderIcon={
            <IconFont name='shouji' color={fontColor} size={35} />
          }
          title={T['phone']}
          value={phone}
        />
        <Cell
          center
          renderIcon={
            <IconFont name='weixin' color={fontColor} size={35} />
          }
          title={T['wechat']}
          value={T['goToBind']}
          isLink
        />
        <Cell
          center
          renderIcon={
            <IconFont name='apple' color={fontColor} size={35} />
          }
          title={T['appleId']}
          value={T['goToBind']}
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
          title={T['shareWithFriends']}
          isLink
        />
        <Cell
          center
          renderIcon={
            <IconFont name='bianji' color={fontColor} size={35} />
          }
          onClick={onToFeedback}
          title={T['feedbackAndComplaint']}
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={
            <IconFont name='brightj2' color={fontColor} size={35} />
          }
          title={T['backgroundSetting']}
          value={themeConfig[theme || 'light']}
          onClick={()=> setShow(true)}
          isLink
        />
        <Cell
          center
          renderIcon={<IconFont name='yuyan1' color={fontColor} size={35} />}
          title={T['language']}
          onClick={() => setLangShow(true)}
          value={langConfig[language || 'zh_CN']}
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          onClick={onToUpdateToken}
          renderIcon={
            <IconFont name='bianji' color={fontColor} size={35} />
          }
          title={T['updateToken']}
          isLink
        />
        <Cell
          center
          onClick={() => setHostShow(true)}
          renderIcon={
            <IconFont name='bianji' color={fontColor} size={35} />
          }
          title={T['updateApiUrl']}
          isLink
        />
      </CellGroup>

      <CellGroup inset className='cell-group'>
        <Cell
          center
          renderIcon={
            <IconFont name='guanyu_o' color={fontColor} size={40} />
          }
          title={T['about']}
          onClick={onToAbout}
          isLink
        />

        <Cell
          center
          clickable
          renderIcon={
            <IconFont name='tuichu-' color={fontColor} size={30} style={{ marginLeft: 3 }} />
          }
          title={T['logout']}
        />
      </CellGroup>

      <Toast />

      <ActionSheet
        show={hostShow}
        actions={hostActions}
        onClose={() => setHostShow(false)}
        onSelect={async (e) => {
          const v = e.detail.name;
          console.info(v);
          Taro.setStorageSync('apiUrl', v)
          setHostShow(false);
          dispatch(await updateApiUrl(v))
          handleActionColor(v, hostActions, setHostActions)
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
          const v = e.detail.name;
          console.info(v);
          setShow(false);
          dispatch(await updateTheme(themeConfig[e.detail.name]))
          handleActionColor(v, actions, setActions)
        }}
      />

      <ActionSheet
        show={langShow}
        actions={langActions}
        onClose={() => setLangShow(false)}
        onSelect={async (e) => {
          const v = e.detail.name;
          console.info(e.detail.name);
          dispatch(await updateLocale(langConfig[e.detail.name]))
          setLangShow(false);
          handleActionColor(v, langActions, setLangActions);
        }}
      />

      <ShareSheet
        show={shareShow}
        closeOnClickOverlay
        title={T['shareWithFriends']}
        options={options}
        onSelect={(e) => Toast.show(e.detail.name)}
        onClose={() => setShareShow(false)}
      />

    </View>
    </ThemeContainer>
  )
}

export default memo(Setting);
