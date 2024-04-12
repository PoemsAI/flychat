import React, {useEffect} from 'react'
import Taro from '@tarojs/taro';
import {useSelector} from 'react-redux';
import {getCurrentInstance} from '@tarojs/runtime';
import { View } from '@tarojs/components'
import {ActionSheet, Image, Cell, CellGroup, Toast, ShareSheet} from '@antmjs/vantui'
import { sdk as bff } from '../../utils/index';
import './index.scss'
import ThemeContainer from '../../components/theme/index'
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
  const fontColor = '#8F1AFF'
  const [actions, setActions] = useState([
    { name: '中文', color: fontColor },
    { name: 'English' }
  ])
  const [audioActions, setAudioActions] = useState([
    { name: '温柔', color: fontColor},
    { name: '魅力',},
    { name: '文静',},
    { name: '傲娇',},
  ])
  const { app_name, app_namespace }: Record<string, any> = getCurrentInstance().router?.params || {};

  const { apiUrl, T }: any = useSelector((state: any) => {
    const config = state.config
    return {
      apiUrl: config.apiUrl,
      T: config.locales.data,
    };
  });

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

  const handleActionColor = (v, action, setAction) => {
    setAction(action.map((item) => ({
      ...item,
      color: item.name === v ? fontColor : ''
    })));
  }

  return (
    <ThemeContainer>
      <View className='robot_detail'>
        <View className='my_avatar'>
          <View className='my_avatar_img'>
            <Image
              round
              lazyLoad
              key={robotInfo?.metadata?.icon}
              width={230}
              height={230}
              src={`${apiUrl}${robotInfo?.metadata?.icon}`}
            />
          </View>
          <View className='my_desc'>{robotInfo?.metadata?.description || ''}</View>

          <View className='my_info'>
            <View className='my_hot'>
              <IconFont name='ef-redian-gongju' color='#959595' size={35} />
              0w
            </View>
            <View className='my_nick_name'>@{robotInfo?.metadata?.displayName || ''}</View>
          </View>

        </View>

        <CellGroup inset className='cell-group'>
          <Cell center clickable renderIcon={
            <IconFont name='biaoshimoxing' color={fontColor} size={35} />
          } title={T['modelService']} value={robotInfo?.llm || ''}
          />
        </CellGroup>

        <CellGroup inset className='cell-group'>
          <Cell
            center
            renderIcon={<IconFont name='yuyan1' color={fontColor} size={35} />}
            title={T['language']}
            onClick={() => setShow(true)}
            value={language}
            isLink
          />
          <Cell
            center
            renderIcon={
            <IconFont name='shengyin' color={fontColor} size={35} />}
            title={T['audio']}
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
            title={T['shareWithFriends']}
            isLink
          />
          <Cell
            center
            renderIcon={
              <IconFont name='jubao' color={fontColor} size={35} />}
            title={T['report']}
            onClick={onToReport}
            isLink
          />
        </CellGroup>

        <CellGroup inset className='cell-group'>
          <Cell center clickable renderIcon={
            <IconFont name='qingchushujuku' color={fontColor} size={35} />
          }  title={T['clearContext']}
          />
          <Cell
            center
            clickable
            renderIcon={
              <IconFont name='shanchu' color={fontColor} size={35} />}
            title={T['deleteChatHistory']}
          />
        </CellGroup>

        <ActionSheet
          show={show}
          actions={actions}
          onClose={() => setShow(false)}
          onSelect={(e) => {
            const v = e.detail.name;
            console.info(e.detail.name);
            setLanguage(e.detail.name);
            setShow(false);
            handleActionColor(v, actions, setActions);
          }}
        />

        <ActionSheet
          show={audioShow}
          actions={audioActions}
          onClose={() => setAudioShow(false)}
          onSelect={(e) => {
            const v = e.detail.name;
            console.info(v);
            setAudio(v);
            setAudioShow(false);
            handleActionColor(v, audioActions, setAudioActions)
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

export default memo(RobotDetail);
