import React from 'react'
import { View, Input } from '@tarojs/components'
import {Form, FormItem, ActionSheet, Icon, Uploader, Popup, DatetimePicker, Button, Area } from '@antmjs/vantui'
import { useSelector } from 'react-redux';
import { areaList } from '@vant/area-data'
import ThemeContainer from '../../components/theme/index'
import './index.scss'
import default_chat from '../../images/default_chat.png'

const { memo, useCallback, useState } = React;

const EditUserInfo = () => {
  const [show, setShow] = useState(false)
  const [popupShow, setPopupShow] = useState(false)
  const [cityShow, setCityShow] = useState(false)
  const [city, setCity] = useState('')
  const [state, setState] = useState({
    minDate: new Date(1950, 0, 1).getTime(),
    currentDate: new Date(2024, 0, 1).getTime(),
  })
  const [fileList, setFileList] = useState([{ url: default_chat }])
  const fontColor = '#8F1AFF'
  const [actions, setActions] = useState([
    { name: '男', color: fontColor },
    { name: '女' }
  ])

  const { name, T }: any = useSelector((state: any) => {
    console.log(state);
    const config = state.config
    return {
      name: config.userInfo?.name,
      T: config.locales?.data,
    };
  });

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

  const onCloseCityPopup = () => {
    setCityShow(false)
  }
  const cityChange = (e) => {
    console.log(e.detail.value);
    const data = e.detail.value.pop() || {};
    setCity(data.code);
    formIt.setFieldsValue('city', data.name)
    onCloseCityPopup()
  }

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
    <ThemeContainer>
      <View className='edit-user-info'>

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

        <Form
          initialValues={{userName: name,}}
          form={formIt}
          onFinish={(errs, res) => console.info(errs, res)}
        >
          <FormItem
            label={T['nickName']}
            name='userName'
            labelClassName='labelName'
            className='formItem'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
          >
            <Input focus placeholder='请输入昵称' style='text-align: right;width: 100%;' />
          </FormItem>

          <FormItem
            label={T['sex']}
            name='sex'
            valueFormat={(e) => e.detail.value}
            valueKey='value'
            trigger='onConfirm'
            onClick={() => setShow(true)}
            renderRight={<Icon name='arrow' />}
          >
            <View className='form-item-info'>{
                formIt.getFieldValue('sex') ||
                actions[0].name
              }</View>
          </FormItem>

          <FormItem
            label={T['birthday']}
            name='birthday'
            valueFormat={(e) => e.detail.value}
            valueKey='value'
            trigger='onConfirm'
            onClick={() => setPopupShow(true)}
            renderRight={<Icon name='arrow' />}
          >
            <View className='form-item-info'>{
              formIt.getFieldValue('birthday') || formatDate(state.currentDate)
            }</View>
          </FormItem>

          <FormItem
            label={T['city']}
            name='city'
            valueFormat={(e) => e.detail.value}
            valueKey='value'
            onClick={() => setCityShow(true)}
            trigger='onConfirm'
            renderRight={<Icon name='arrow' />}
          >
            <View className='form-item-info'>{
              formIt.getFieldValue('city') || '北京市'
            }</View>
          </FormItem>

          <View className='submit-wrap'>
            <Button color={fontColor} block round onClick={() => {
              formIt.submit();
            }}
            >
              {T['submit']}
            </Button>
          </View>

        </Form>

        <ActionSheet
          show={show}
          actions={actions}
          onClose={() => setShow(false)}
          onSelect={(e) => {
            const v = e.detail.name
            console.info(v);
            formIt.setFieldsValue('sex', v);
            setShow(false);
            setActions(actions.map((item) => ({
              ...item,
              color: item.name === v ? fontColor : ''
            })));
          }}
        />

        <Popup show={popupShow} position='bottom' onClose={() => setPopupShow(false)}>
          <DatetimePicker
            type='date'
            value={state.currentDate}
            minDate={state.minDate}
            onCancel={() => setPopupShow(false)}
            onConfirm={onInput}
            formatter={formatter}
          />
        </Popup>

        <Popup show={cityShow} position='bottom' onClose={onCloseCityPopup}>
          <Area
            areaList={areaList}
            value={city}
            columnsNum={2}
            onCancel={onCloseCityPopup}
            onConfirm={cityChange}
            title={T['selectCity']}
          />
        </Popup>

      </View>
    </ThemeContainer>
  )
}

export default memo(EditUserInfo);
