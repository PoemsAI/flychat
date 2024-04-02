import React from 'react'
import { Textarea, View,} from '@tarojs/components'
import {Button, Form, FormItem} from '@antmjs/vantui'
import './index.scss'
import { getAuthData } from '../../common/utils';

const { memo } = React;

const Report = () => {

  const authData = getAuthData();
  const fontColor = '#8F1AFF'

  const onFinish = (errs, res) => {
    console.info(errs, res);
  }

  return (
    <View className='report_wrap'>
      <View className='create_form'>
        <Form onFinish={onFinish} initialValues={{ token: authData?.token?.id_token }}>
          <FormItem
            label={' '}
            name='feedback'
            layout='vertical'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
          >
            <Textarea placeholder='可以描述你的举报原因，我们将及时处理。' maxlength={300} style={{ minHeight: 150, maxHeight: 250 }} autoHeight />
          </FormItem>

          <Button style='margin-top: 50rpx;' color={fontColor} block round formType='submit'>
            提交
          </Button>
        </Form>
      </View>
    </View>
  )
}

export default memo(Report);
