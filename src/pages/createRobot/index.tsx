import React from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { Form, FormItem, Button, ActionSheet, Icon, Uploader } from '@antmjs/vantui'
import './index.scss'
const { memo, useState } = React;

const CreateRobot = () => {
  const [show, setShow] = useState(false)
  const [audioShow, setAudioShow] = useState(false)
  const [fileList, setFileList] = useState([])
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

  const formIt = Form.useForm()

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

  return (
    <View className='create_robot'>

      <View className="upload-wrap">
        <Uploader
          accept="image"
          uploadIcon="plus"
          deletable
          maxCount={1}
          fileList={fileList}
          onAfterRead={afterRead}
          onDelete={deleteAction}
        />
      </View>

      <Form
        initialValues={{ }}
        form={formIt}
        onFinish={(errs, res) => console.info(errs, res)}
      >
        <FormItem
          label="用户名"
          name="userName"
          labelClassName="labelName"
          className="formItem"
          trigger="onInput"
          validateTrigger="onBlur"
          valueFormat={(e) => e.detail.value}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>

        <FormItem
          label="角色描述"
          name="desc"
          layout="vertical"
          trigger="onInput"
          validateTrigger="onBlur"
          valueFormat={(e) => e.detail.value}
        >
          <Textarea placeholder="我是智能体描述" style="min-height: 80px;" autoHeight />
        </FormItem>

        <Button className="van-button-submit" block round formType="submit">
          <Icon name="gem-o" size={30} /> {' '} 自动生成
        </Button>

        <FormItem
          label="语言"
          name="language"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          onClick={() => setShow(true)}
          renderRight={<Icon name="arrow" />}
        >
          <View className="form-item-info">{
              formIt.getFieldValue('language') ||
              actions[0].name
            }</View>
        </FormItem>

        <FormItem
          label="声音"
          name="audio"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          onClick={() => setAudioShow(true)}
          renderRight={<Icon name="arrow" />}
        >
          <View className="form-item-info">{
            formIt.getFieldValue('audio') ||
            audioActions[0].name
          }</View>
        </FormItem>

        <FormItem
          label={null}
          name="global"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
        >
          <View style="font-size:31rpx;color:#000;margin-left: -150rpx;">
            公开-所有人可对话
          </View>
        </FormItem>
      </Form>

      <ActionSheet
        show={show}
        actions={actions}
        onClose={() => setShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          formIt.setFieldsValue('language', e.detail.name);
          setShow(false);
        }}
      />

      <ActionSheet
        show={audioShow}
        actions={audioActions}
        onClose={() => setAudioShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          formIt.setFieldsValue('audio', e.detail.name);
          setAudioShow(false);
        }}
      />

    </View>
  )
}

export default memo(CreateRobot);
