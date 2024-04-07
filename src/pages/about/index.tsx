import React from 'react'
import { View, } from '@tarojs/components'
import {  } from '@antmjs/vantui'
import './index.scss'

const { memo } = React;

const About = () => {

  return (
    <View className='about_wrap'>
      <View className='title'>用户协议</View>
      <View className='title_h3'>1、导言</View>
      <View className='content-p'>
        欢迎你使用“xxx”软件及相关服务！
      </View>
      <View className='content-p'>
        “xxxx”软件及相关服务，系指北京xxxx科技有限公司及/或关联方（下称“公司”）以网页、应用程序（可能含不同版本）、小程序、供第三方网站和应用程序使用软件开发工具包（SDK）、应用程序编程接口（API）以及随技术发展出现的创新形态方式向你提供的产品与服务，包括但不限于以“AI交互对话”为核心功能以及其他功能的平台。本用户协议是你与公司之间就注册、登录、使用（以下统称“使用”）本软件及相关服务所订立的协议（以下简称“本协议”）。
        为了更好地为你提供服务，请你在开始使用
      </View>
    </View>
  )
}

export default memo(About);
