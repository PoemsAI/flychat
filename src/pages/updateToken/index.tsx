import React from 'react'
import {Input, Textarea, View,} from '@tarojs/components'
import Taro from '@tarojs/taro';
import { useDispatch } from 'react-redux';
import {Button, Form, FormItem} from '@antmjs/vantui'
import ThemeContainer from '../../components/theme/index'
import './index.scss'
import $Api from '../../common/api';
import {updateUserInfo} from '../../actions/index';
import { getAuthData, setAuthData } from '../../common/utils';

const { memo } = React;

const Login = () => {

  const authData = getAuthData();
  const fontColor = '#8F1AFF'
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    const res = await $Api({
      url: `/bff`,
      method: 'POST',
      data: {
        operationName:"getCurrentUser",
        query: "query getCurrentUser {\n  userCurrent {\n    name\n    email\n    role\n    password\n    description\n    phone\n    creationTimestamp\n  }\n}",
      }
    })

    const user: Record<string, any> = res?.data?.data?.userCurrent || {};
    if (user.name) {
      if (!authData.user) {
        authData.user = {};
      }
      authData.user = user;
      setAuthData(JSON.stringify(authData));
      dispatch(await updateUserInfo(user))
    }
  }

  const onFinish = (errs, res) => {
    console.info(errs, res);
    if (res.project) {
      authData.project = res.project;
    }
    if (res.token) {
      if (!authData.token) {
        authData.token = {};
      }
      authData.token.token_type = 'bearer';
      authData.token.id_token = res.token;
      setAuthData(JSON.stringify(authData));
      getUserInfo()
      Taro.navigateBack();
      setTimeout(() => {
        Taro.showToast({
          title: '更新成功',
          duration: 1000
        });
      }, 500);
    }
  }

  return (
    <ThemeContainer>
      <View className='login_wrap'>
        <View className='create_form'>
          <Form onFinish={onFinish} initialValues={{ token: authData?.token?.id_token, project: authData?.project || 'poemsai' }}>
            <FormItem
              label='项目'
              name='project'
              labelClassName='labelName'
              className='formItem'
              trigger='onInput'
              validateTrigger='onBlur'
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder='请输入项目' />
            </FormItem>

            <FormItem
              label='Token'
              name='token'
              layout='vertical'
              trigger='onInput'
              validateTrigger='onBlur'
              valueFormat={(e) => e.detail.value}
            >
              <Textarea placeholder='token' showCount maxlength={2000} style={{ minHeight: 150, maxHeight: 250, width: '100%' }} autoHeight />
            </FormItem>

            <Button style='margin-top: 50rpx;' color={fontColor} block round formType='submit'>
              更新Token
            </Button>
          </Form>
        </View>
      </View>
    </ThemeContainer>
  )
}

export default memo(Login);
