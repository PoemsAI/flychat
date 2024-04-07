import React from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro';
import {getCurrentInstance} from '@tarojs/runtime';
import { Form, FormItem, Button, ActionSheet, Uploader, Cell, CellGroup } from '@antmjs/vantui'
import './index.scss'
import IconFont from "../../components/iconfont";
import default_chat from '../../assets/images/default_chat.png'
import {sdk as bff} from '../../utils/index';


const { memo, useEffect, useState } = React;

const UpdateRobot = () => {
  const [show, setShow] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  const [audioShow, setAudioShow] = useState(false)
  const [authShow, setAuthShow] = useState(false)
  const [fileList, setFileList] = useState([{ url: default_chat, type: 'image' }])
  const [robotInfo, setRobotInfo] = useState<any>({})
  const [language, setLanguage] = useState('中文')
  const [audio, setAudio] = useState('温柔')
  const [auth, setAuth] = useState('公开-所有人可对话')
  const [categoryActions, setCategoryActions] = useState<any>([])
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
  const [authActions, setAuthActions] = useState([
    { name: '公开-所有人可对话', color: fontColor},
    { name: '通过链接访问-获得链接的用户可对话',},
    { name: '私密-仅自己可对话',},
  ])

  const { app_name, app_namespace }: Record<string, any> = getCurrentInstance().router?.params || {};

  const formIt = Form.useForm()

  useEffect(() => {
    getApplication()
    getListGPTCategory()
  }, [])

  const getApplication = async () => {
    const res = await bff.getApplication({
      name: app_name,
      namespace: app_namespace,
    }).catch(error => {
      console.warn('getApplication failed', error);
    });
    const Application: any = res?.Application?.getApplication?.metadata || {};
    setRobotInfo(Application);
    const { category, displayName, description } = Application;
    formIt?.setFields({
      name: app_name,
      displayName,
      category: category,
      description,
    })
    if (category) {
      handleActionColor(category, categoryActions, setCategoryActions)
    }
    setFileList([{ url: Application.icon, type: 'image' }])
  }

  const afterRead = (e) => {
    const { file } = e.detail
    setFileList(fileList.concat(file))
  }

  const deleteAction = (e) => {
    const { index } = e.detail
    const valueNew = JSON.parse(JSON.stringify(fileList))
    valueNew.splice(index, 1)
    setFileList(valueNew)
  }

  const createApplication = async ({ name, displayName, description, category }) => {
    const id = categoryActions.find(item => item.name === category)?.id;
    if (!name) {
      Taro.showToast({
        title: '请输入名称',
        icon: 'none'
      })
      return
    }
    if (!displayName) {
      Taro.showToast({
        title: '请输入别名',
        icon: 'none'
      })
      return
    }
    try {
      const icon: any = robotInfo.icon || await getBase64Image(default_chat);
      const result = await bff.updateApplication({
        input: {
          icon,
          category: id,
          name: app_name,
          displayName,
          description,
          namespace: app_namespace,
        }
      })
      const application = result?.Application?.updateApplication || {};
      console.log(application);
      Taro.showToast({
        title: '更新成功',
        duration: 1000
      });
      setTimeout(() => {
        Taro.reLaunch({
          url: '/pages/my/index?isUpdate=true'
        });
      }, 1000)
    } catch(error) {
      console.warn('createApplication failed', error);
      Taro.showToast({
        title: '创建失败',
        duration: 1000
      });
    }
  }

  const getListGPTCategory = async () => {
    const category: any = await bff.listGPTCategory().catch(error => {
      console.warn('getListGPTCategory failed', error);
    });
    const data = category?.GPT?.listGPTCategory || [];
    setCategoryActions(data);
  }

  const onFinish = async (errs, res) =>  {
    console.log('onFinish', errs, res);
    await createApplication(res)
  }

  const getBase64Image = (filePath: string) => {
    return new Promise(async (resolve) => {
      const fileSystemManager = Taro.getFileSystemManager();
      fileSystemManager.readFile({
        filePath,
        encoding: 'base64',
        success: res => {
          const base64Image = res.data;
          const img = `data:image/png;base64,${base64Image}`
          resolve(img)
        },
        fail: err => {
          console.error('读取图片失败', err);
          resolve('')
        }
      });
    })
  }

  const handleActionColor = (v, action, setAction) => {
    setAction(action.map((item) => ({
      ...item,
      color: item.name === v ? fontColor : ''
    })));
  }

  return (
    <View className='create_robot'>

      <View className='upload-wrap'>
        <Uploader
          accept='image'
          uploadIcon='plus'
          deletable
          maxCount={1}
          fileList={fileList}
          onAfterRead={afterRead}
          onDelete={deleteAction}
        />
      </View>

      <View className='create_form'>
        <Form
          form={formIt}
          onFinish={onFinish}
        >
          <FormItem
            label='名称'
            name='name'
            labelClassName='labelName'
            className='formItem'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
          >
            <Input disabled placeholder='请输入名称' style='width: 100%;' />
          </FormItem>

          <FormItem
            label='别名'
            name='displayName'
            labelClassName='labelName'
            className='formItem'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
          >
            <Input focus placeholder='请输入别名' style='width: 100%;' />
          </FormItem>

          <FormItem
            label='分类'
            name='category'
            labelClassName='labelName'
            className='formItem'
            valueFormat={(e) => e.detail.value}
          >
            <Cell
              renderTitle={null}
              style='padding:0;'
              clickable={false}
              border={false}
              onClick={() => setCategoryShow(true)}
              isLink
            >
              {formIt.getFieldValue('category') || '请选择'}
            </Cell>
          </FormItem>

          <FormItem
            label='角色描述'
            name='description'
            layout='vertical'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
          >
            <Textarea placeholder='我是智能体描述' style='min-height: 80px;' autoHeight />
          </FormItem>

          <View className='button-wrap'>
            <View className='button-left' />
            <Button className='van-button-submit' round size='small'>
              <View className='button-container'>
                <IconFont name='mofabang' color={fontColor} size={35} />
                <View className='submit-text'>自动生成</View>
              </View>
            </Button>
          </View>
        </Form>
      </View>

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
        <Cell
          center
          renderIcon={<IconFont name='yuyan' color={fontColor} size={30} />}
          title='公开-所有人可对话'
          onClick={() => setAuthShow(true)}
          value={auth}
          isLink
        />
      </CellGroup>

      <View className='submit-wrap'>
        <Button color={fontColor} block round onClick={() => {
          formIt.submit();
        }}
        >
          完成
        </Button>
      </View>

      <ActionSheet
        show={categoryShow}
        actions={categoryActions}
        onClose={() => setCategoryShow(false)}
        onSelect={(e) => {
          const v = e.detail.name;
          console.info(v);
          formIt?.setFieldsValue('category', v)
          setCategoryShow(false);
          handleActionColor(v, categoryActions, setCategoryActions)
        }}
      />

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

      <ActionSheet
        show={authShow}
        actions={authActions}
        onClose={() => setAuthShow(false)}
        onSelect={(e) => {
          const v = e.detail.name;
          console.info(v);
          setAuth(v);
          setAuthShow(false);
          handleActionColor(v, authActions, setAuthActions)
        }}
      />

    </View>
  )
}

export default memo(UpdateRobot);
