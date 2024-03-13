import React from 'react'
import { View, Input } from '@tarojs/components'
import { Form, FormItem, ActionSheet, Icon, Uploader, Popup, DatetimePicker } from '@antmjs/vantui'
import './index.scss'
const { memo, useCallback, useState } = React;

const EditUserInfo = () => {
  const [show, setShow] = useState(false)
  const [popupShow, setPopupShow] = useState(false)
  const [state, setState] = useState({
    minDate: new Date(1950, 0, 1).getTime(),
    currentDate: new Date(2024, 0, 1).getTime(),
  })
  const [fileList, setFileList] = useState([])
  const [actions] = useState([
    { name: '男' },
    { name: '女' }
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

  const formatDate = (value) => {
    const currentDate = new Date(value);
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth() + 1;
    const d = currentDate.getDate();
    return `${y}年${m}月${d}日`;
  }

  const onInput = useCallback(
    function (event) {
      setState({
        ...state,
        currentDate: event.detail,
      })
      formIt.setFieldsValue('birthday', formatDate(event.detail.value));
      setPopupShow(false);
    },
    [state],
  )

  const formatter = useCallback(function (type, value) {
    if (type === 'year') {
      return `${value}年`
    }

    if (type === 'month') {
      return `${value}月`
    }

    return value
  }, [])

  return (
    <View className='edit-user-info'>

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
        initialValues={{userName: '智慧女孩不秃头',}}
        form={formIt}
        onFinish={(errs, res) => console.info(errs, res)}
      >
        <FormItem
          label="昵称"
          name="userName"
          labelClassName="labelName"
          className="formItem"
          trigger="onInput"
          validateTrigger="onBlur"
          valueFormat={(e) => e.detail.value}
        >
          <Input placeholder="请输入用户名" style="text-align: right;width: 100%;" />
        </FormItem>

        <FormItem
          label="性别"
          name="sex"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          onClick={() => setShow(true)}
          renderRight={<Icon name="arrow" />}
        >
          <View className="form-item-info">{
              formIt.getFieldValue('sex') ||
              actions[0].name
            }</View>
        </FormItem>

        <FormItem
          label="生日"
          name="birthday"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          onClick={() => setPopupShow(true)}
          renderRight={<Icon name="arrow" />}
        >
          <View className="form-item-info">{
            formIt.getFieldValue('birthday') || formatDate(state.currentDate)
          }</View>
        </FormItem>

        <FormItem
          label="城市"
          name="city"
          valueFormat={(e) => e.detail.value}
          valueKey="value"
          trigger="onConfirm"
          renderRight={<Icon name="arrow" />}
        >
          <View className="form-item-info">{
            formIt.getFieldValue('city') || '北京'
          }</View>
        </FormItem>

      </Form>

      <ActionSheet
        show={show}
        actions={actions}
        onClose={() => setShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          formIt.setFieldsValue('sex', e.detail.name);
          setShow(false);
        }}
      />

      <Popup show={popupShow} position="bottom" onClose={() => setPopupShow(false)}>
        <DatetimePicker
          type="date"
          value={state.currentDate}
          minDate={state.minDate}
          onCancel={() => setPopupShow(false)}
          onConfirm={onInput}
          formatter={formatter}
        />
      </Popup>

    </View>
  )
}

export default memo(EditUserInfo);
