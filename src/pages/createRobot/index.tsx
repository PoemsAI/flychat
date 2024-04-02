import React, {useEffect} from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { Form, FormItem, Button, ActionSheet, Uploader, Cell, CellGroup } from '@antmjs/vantui'
import './index.scss'
import IconFont from "../../components/iconfont";
import default_chat from '../../assets/images/default_chat.png'
import {sdk as bff} from '../../utils/index';

const { memo, useState } = React;

const CreateRobot = () => {
  const [show, setShow] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  const [audioShow, setAudioShow] = useState(false)
  const [authShow, setAuthShow] = useState(false)
  const [fileList, setFileList] = useState([{ url: default_chat }])
  const [language, setLanguage] = useState('中文')
  const [audio, setAudio] = useState('温柔')
  const [auth, setAuth] = useState('公开-所有人可对话')
  const [categoryActions, setCategoryActions] = useState<any>([])
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
  const [authActions] = useState([
    { name: '公开-所有人可对话',},
    { name: '通过链接访问-获得链接的用户可对话',},
    { name: '私密-仅自己可对话',},
  ])

  const fontColor = '#8F1AFF'

  const formIt = Form.useForm()

  useEffect(() => {
    getListGPTCategory()
  }, [])

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
      await bff.createApplication({
        input: {
          icon: default_chat,
          category: [id],
          name,
          displayName,
          description,
          namespace: 'poemsai',
        }
      })
      Taro.showToast({
        title: '创建成功',
        duration: 1000
      });
      Taro.navigateBack();
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
          initialValues={{ }}
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
            <Input placeholder='请输入名称' />
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
            <Input placeholder='请输入别名' />
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
          console.info(e.detail.name);
          formIt?.setFieldsValue('category', e.detail.name)
          setCategoryShow(false);
        }}
      />

      <ActionSheet
        show={show}
        actions={actions}
        onClose={() => setShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          setLanguage(e.detail.name);
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

      <ActionSheet
        show={authShow}
        actions={authActions}
        onClose={() => setAuthShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          setAuth(e.detail.name);
          setAuthShow(false);
        }}
      />

    </View>
  )
}

export default memo(CreateRobot);
