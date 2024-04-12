import React from 'react'
import Taro from "@tarojs/taro";
import { getCurrentInstance } from '@tarojs/runtime';
import { View, Input, ScrollView } from '@tarojs/components'
import {Toast, Loading, Image} from '@antmjs/vantui'
import {useSelector} from 'react-redux';
import './index.scss'
import IconFont from '../../components/iconfont';
import ThemeContainer from '../../components/theme/index'
import $Api from '../../common/api';
import { sdk as bff } from '../../utils/index';
import {getAuthData, toQuerystring} from '../../common/utils';
import { atob } from '../../utils/base64.min.js';
import default_chat from '../../images/default_chat.png'


const { memo, useEffect, useRef, useState } = React;
const ToastTip = Toast.createOnlyToast()

const Chat = () => {
  const [msgList, setMsgList] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const [isShowWrite, setIsShowWrite] = useState(false)
  const [writingMsg, setWritingMsg] = useState<string>('');
  const [robotInfo, setRobotInfo] = useState<any>({})
  const { id, app_name, displayName, app_namespace }: Record<string, any> = getCurrentInstance().router?.params || {};
  const [scrollTop, setScrollTop] = useState(0)

  const isReceived = useRef(false)
  const writeMsgList = useRef<any>([])
  const writeStatus = useRef({
    status: false,
    index: 0,
  });
  const timer = useRef<any>(null);

  const { apiUrl, T }: any = useSelector((state: any) => {
    const config = state.config
    return {
      apiUrl: config.apiUrl,
      T: config.locales.data,
    };
  });

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: `对话${displayName || app_name || '机器人'}`
    })
    getApplication();
    getMsgList();
    return () => {
      clearTimeout(timer.current);
    }
  }, [])

  useEffect(() => {
    if(!isShowWrite) {
      initData();
    }
  }, [isShowWrite])

  useEffect(() => {
    if (!writeStatus.current.status && writeMsgList.current?.length) {
      console.log('writing', writeMsgList.current);
      writing(writingMsg);
    }
  }, [writeMsgList.current])

  const initData = () => {
    setWritingMsg('')
    setInputMsg('')
    isReceived.current = false;
    writeMsgList.current = []
    writeStatus.current = {
      status: false,
      index: 0,
    };
  }

  const handleScrollBottom = () => {
    const query = Taro.createSelectorQuery()
    query.select('.msg_content').boundingClientRect()
    query.exec((res) => {
      if (res?.[0]) {
        const scrollViewHeight = res[0]?.height;
        Taro.nextTick(() => {
          setScrollTop(scrollViewHeight)
        });
      }
    })
  }

  const writing = (str) => {
    if (writeStatus.current.index < writeMsgList.current?.length) {
      writeStatus.current.status = true;
      str += writeMsgList.current[writeStatus.current.index]?.message || '';
      setWritingMsg(str);
      handleScrollBottom();
      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        writeStatus.current.index += 1
        writing(str);
      }, 100)
    } else if(isReceived.current) {
      addMsgToList(str, writeMsgList.current[0]?.message_id);
      console.log('addMsgToList', msgList);
      setIsShowWrite(false);
    }
  }

  const addMsgToList = (answer = '', msgId = '') => {
    if (answer && msgId) {
      console.log('addMsgToList', answer, msgId, msgList);
      const msgData = msgList.slice();
      msgData[msgData.length - 1].id = msgId
      msgData[msgData.length - 1].answer = answer;
      setMsgList(msgData);
    } else {
      const msgData: Record<string, any> = {
        action: 'CHAT',
        query: inputMsg,
      };
      setMsgList([...msgList, msgData]);
    }
  }

  const getApplication = async () => {
    if (!app_name) {
      return
    }
    const res = await bff.getApplication({
      name: app_name,
      namespace: app_namespace,
    }).catch(error => {
      console.warn('getApplication failed', error);
    });
    const Application: any = res?.Application?.getApplication?.metadata || {};
    setRobotInfo(Application);
    if (!displayName) {
      Taro.setNavigationBarTitle({
        title: `对话${Application.displayName || app_name || '机器人'}`
      })
    }
  }

  const getMsgList = async () => {
    if (!id) {
      return
    }
    const res = await $Api({
      url: `/kubeagi-apis/chat/messages`,
      method: 'POST',
      data: {
        app_name,
        app_namespace,
        conversation_id: id,
      }
    })
    if (res.statusCode === 200) {
      setMsgList(res.data?.messages || []);
    } else {
      ToastTip.fail({
        message: res.errMsg || '查询失败',
      })
    }
    handleScrollBottom();
  }

  const fetchConversation = async () => {
    const body = {
      query: inputMsg,
      response_mode: 'streaming',
      conversation_id: id,
      app_name,
      app_namespace,
    };
    let startStreamStr = '';
    const task = $Api({
      url: '/kubeagi-apis/chat',
      method: 'POST',
      header: {
        Authorization: `bearer ${getAuthData()?.token?.id_token}`,
        'Content-Type': 'text/event-stream',
        Namespace: app_namespace,
      },
      timeout: 30000,
      enableChunked: true,
      data: body,
      success: () => {
        task.abort();
        isReceived.current = true;
        startStreamStr = '';
        console.log('success', writeMsgList.current?.map(msg => msg.message)?.join(''));
      },
      fail: (error) => {
        console.warn(error)
        setLoading(false);
        startStreamStr = '';
        task.abort();
        Taro.showToast({
          title: error.errMsg == 'request:fail timeout' ? '请求超时，请稍后重试' : '网络错误，请稍后重试',
          icon: 'none',
          duration: 1000
        });
      }
    })
    console.log('task', task);
    task?.onChunkReceived((res: any) => {
      setLoading(false)
      let arrayBuffer = res.data;
      let text = Taro.arrayBufferToBase64(new Uint8Array(arrayBuffer));
      text = decodeURIComponent(escape(atob(text)));
      const convertStringToArr = (str) => {
        const arr = str.trim().split('\n\n');
        const strArr: Record<string, any>[] = [];
        console.log('arr', arr)
        arr.forEach(v => {
          if (v.startsWith('event:error\n')) {
            v = v.replace('event:error\n', '');
          }
          if (v.startsWith('data:{')) {
            v = v.replace('data:', '');
          }
          if (/^\{.*}$/.test(v)) {
            try {
              strArr.push(JSON.parse(v))
            } catch (e) {
              startStreamStr = v;
              console.warn(e)
            }
          } else {
            if(v.startsWith('{')) {
              startStreamStr = v;
            } else if (v.endsWith('}')) {
              const val = startStreamStr + v;
              try {
                if (/^\{.*}$/.test(val)) {
                  strArr.push(JSON.parse(val))
                }
              } catch (e) {
                console.warn(val)
                console.warn('endsWith:', e)
              }
              startStreamStr = '';
            }
          }
        });
        return strArr;
      }
      const textArr = convertStringToArr(text);
      writeMsgList.current = [...writeMsgList.current, ...textArr];
    })
  };

  const onSend = async () => {
    const _input = inputMsg?.trim();
    if (!_input) return;
    setIsShowWrite(true);
    setLoading(true);
    handleScrollBottom();
    addMsgToList();
    fetchConversation();
    setInputMsg('');
  }

  const onInputChange = (e) => {
    setInputMsg(e.detail.value);
  }

  const onToRobotDetail = () => {
    const params = {
      app_name,
      app_namespace
    }
    Taro.navigateTo({
      url: `/pages/robotDetail/index?${toQuerystring(params)}`
    });
  }
  const onToPublisherDetail = () => {
    const params = {
      app_name,
      app_namespace
    }
    Taro.navigateTo({
      url: `/pages/publisherDetail/index?${toQuerystring(params)}`
    });
  }

   const formatMsgItem = (msg) => {
     return msg?.replace(/\\n/g, '\n')?.split('\n')?.map((v, i) => (
       <View key={i} className='msg-info'>{ v }</View>)
     )
   }

   const renderRobotAvatar = () => {
     return <Image key={robotInfo?.icon} round lazyLoad width={69} height={69} src={`${apiUrl}${robotInfo?.icon}`} />
   }

  return (
    <ThemeContainer>
      <View className='chat_wrap'>
        <ScrollView scrollY scrollTop={scrollTop} className='chat_list'>
          <View className='msg_content'>
            <View>
              <View className='msg_container msg_left'>
                <View className='msg_avatar' onClick={onToRobotDetail}>
                  { renderRobotAvatar() }
                </View>
                <View className='dis-flex'>
                  <View className='msg_item'>
                    {T['chatSalutation']}{ displayName || robotInfo?.displayName || app_name || '-' }
                  </View>
                  <View className='msg-block' />
                </View>
              </View>
            </View>

            {msgList?.map((msg, i) => (
                <View key={msg?.id || i}>
                  {msg?.query && <View className='msg_container msg_right'>
                    <View className='dis-flex'>
                      <View className='msg-block' />
                      <View className='msg_item'>
                        {msg?.query || ''}
                      </View>
                    </View>
                    <View className='msg_avatar' onClick={onToPublisherDetail}>
                      {/*<IconFont name='yonghu' color='#fff' size={30} />*/}
                      <Image round width={69} height={69} src={default_chat} />
                    </View>
                  </View>}

                  {msg?.answer && <View className='msg_container msg_left'>
                    <View className='msg_avatar' onClick={onToRobotDetail}>
                      { renderRobotAvatar() }
                    </View>
                    <View className='dis-flex'>
                      <View className='msg_item'>
                        { formatMsgItem(msg?.answer) }
                      </View>
                      <View className='msg-block' />
                    </View>
                  </View>}
                </View>
              ))
            }

            {isShowWrite ? <View className='writing_wrap'>
              <View className='msg_container msg_left'>
                <View className='msg_avatar' onClick={onToRobotDetail}>
                  { renderRobotAvatar() }
                </View>
                <View className='dis-flex'>
                  <View className='msg_item'>
                    { loading ? <Loading className='msg-loading' color='#8F1AFF' size={26} /> : formatMsgItem(writingMsg)}
                  </View>
                  <View className='msg-block' />
                </View>
              </View>
            </View> : null }
          </View>

        </ScrollView>

        <View className='chat_toolbar'>
          <Input
            className='chat_input'
            placeholder={`${T['send']}${T['message']}`}
            value={inputMsg}
            onInput={onInputChange}
            onConfirm={onSend}
          />
          <View className='chat_send' onClick={onSend}>
            <IconFont name='fasong' color='#a060ee' size={38} />
          </View>
        </View>

        <ToastTip />
      </View>
    </ThemeContainer>
  )
}

export default memo(Chat);
