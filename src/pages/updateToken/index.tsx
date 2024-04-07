import React from 'react'
import { Textarea, View,} from '@tarojs/components'
import Taro from '@tarojs/taro';
import {Button, Form, FormItem} from '@antmjs/vantui'
import './index.scss'
import { getAuthData, setAuthData } from '../../common/utils';

const { memo } = React;

const Login = () => {

  const authData = getAuthData();
  const fontColor = '#8F1AFF'

  const onFinish = (errs, res) => {
    console.info(errs, res);
    if (res.token) {
      if (!authData.token) {
        authData.token = {};
      }
      authData.token.id_token = res.token;
      setAuthData(authData);
      Taro.showToast({
        title: '更新成功',
        duration: 1000
      });
      Taro.navigateBack();
    }
  }

  return (
    <View className='login_wrap'>
      <View className='create_form'>
        <Form onFinish={onFinish} initialValues={{ token: authData?.token?.id_token }}>
          <FormItem
            label='Token'
            name='token'
            layout='vertical'
            trigger='onInput'
            validateTrigger='onBlur'
            valueFormat={(e) => e.detail.value}
          >
            <Textarea placeholder='token' maxlength={2000} style={{ minHeight: 150, maxHeight: 250 }} autoHeight />
          </FormItem>

          <Button style='margin-top: 50rpx;' color={fontColor} block round formType='submit'>
            更新Token
          </Button>
        </Form>
      </View>
    </View>
  )
}

export default memo(Login);
