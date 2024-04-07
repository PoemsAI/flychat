import React, {useEffect, useRef, useState} from 'react'
import Taro from "@tarojs/taro";
import { getCurrentInstance } from '@tarojs/runtime';
import { View, Input, ScrollView } from '@tarojs/components'
import {Toast, Loading, Image} from '@antmjs/vantui'
import { TextDecoder } from "text-encoding/lib/encoding";
import './index.scss'
import IconFont from '../../components/iconfont';
import $Api from '../../common/api';
import { sdk as bff } from '../../utils/index';
import {getAuthData, toQuerystring} from '../../common/utils';
import default_chat from '../../assets/images/default_chat.png'


const { memo } = React;
const ToastTip = Toast.createOnlyToast()

const Chat = () => {
  const [msgList, setMsgList] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const [isShowWrite, setIsShowWrite] = useState(false)
  const [writingMsg, setWritingMsg] = useState<string>('');
  const [robotInfo, setRobotInfo] = useState<any>({})
  const { id, app_name, app_namespace }: Record<string, any> = getCurrentInstance().router?.params || {};
  const [scrollTop, setScrollTop] = useState(0)

  const isReceived = useRef(false)
  const writeMsgList = useRef<any>([])
  const writeStatus = useRef({
    status: false,
    index: 0,
  });
  const timer = useRef<any>(null);

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: `对话${app_name || '机器人'}`
    })
    getApplication();
    getMsgList();
  }, [])

  useEffect(() => {
    if(!isShowWrite) {
      initData();
    }
  }, [isShowWrite])

  useEffect(() => {
    console.log('writing', writeMsgList.current);
    if (writeMsgList.current?.length) {
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
    const res = await bff.getApplication({
      name: app_name,
      namespace: app_namespace,
    }).catch(error => {
      console.warn('getApplication failed', error);
    });
    const Application: any = res?.Application?.getApplication || {};
    setRobotInfo(Application);
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
      // console.log(res);
      setLoading(false)
      // 对返回的数据进行操作，这个逻辑仅供参考，有不同的需要自行修改
      let arrayBuffer = res.data; // 接收持续返回的数据
      let uint8Array = new Uint8Array(arrayBuffer);
      let text = Taro.arrayBufferToBase64(uint8Array);
      const base64ToUtf8 = (base64String) => {
        // base64转utf8 这个方法可以提出去 我这里方便展示
        // new TextDecoder() 小程序真机中没有这个方法，得下载一个这个 text-encoding
        // npm install text-encoding --save-dev
        // 引入import { TextDecoder } from "text-encoding/lib/encoding";
        const bytes = Taro.base64ToArrayBuffer(base64String);
        return new TextDecoder().decode(bytes);
      }
      text = base64ToUtf8(text);
      // console.log(text);
      // // 持续的转译 最后会变成类似这样的
      const convertStringToArr = (str) => {
        // 格式化返回的流式数据 这个方法也可以提出去 我这里方便展示
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
     // <IconFont name='jiqiren' color='#fff' size={35} />
     return <Image round width={69} height={69} src={robotInfo?.metadata?.icon} />
   }

  return (
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
                  您好，我是 { app_name || '' }
                </View>
                <View className='msg-block' />
              </View>
            </View>
          </View>

          {msgList?.map((msg) => (
              <View key={msg?.id}>
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
          placeholder='发送消息'
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
  )
}

export default memo(Chat);
