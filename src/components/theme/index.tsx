import React, {useEffect} from 'react'
import Taro from '@tarojs/taro';
import {useDispatch, useSelector} from 'react-redux';
import { View } from '@tarojs/components'
import { updateTheme } from '../../actions/index';
import './index.scss'

const { memo } = React;

const ThemeContainer = ({ children, isTabBar = false }) => {

  const dispatch = useDispatch();
  const [themeName, setThemeName ] = React.useState('');

  const { theme, T }: any = useSelector((state: any) => {
    return {
      theme: state.config.theme,
      T: state.config.locales.data,
    };
  });

  Taro.useDidShow(() => {
    handleTabBarChange()
    themeChange(theme);
  })

  useEffect(() => {
    initThemeName(theme)
  }, [theme]);

  useEffect(() => {
    Taro.onThemeChange(systemThemeChange)
    return () => {
      Taro.offThemeChange(systemThemeChange)
    }
  }, []);

  const systemThemeChange = async (res) => {
    console.log(res, 'systemThemeChange');
    handleTabBarChange()
    initThemeName('system')
  }

  const themeChange = async (v) => {
    dispatch(await updateTheme(v))
  }

  const initThemeName = (v) => {
    if(v === 'system') {
      const systemInfo = Taro.getSystemInfoSync();
      setThemeName(systemInfo.theme || 'light')
      themeChange('system');
    } else {
      setThemeName(v)
    }
  }

  const handleTabBarChange = () => {
    let currTheme = theme;
    if (currTheme === 'system') {
      const systemInfo = Taro.getSystemInfoSync();
      currTheme = systemInfo.theme || 'light';
    }
    if (currTheme === 'light') {
      if(isTabBar) {
        Taro.setTabBarStyle({
          backgroundColor: '#f5f6f8',
          color: '#333333',
          selectedColor: '#8F1AFF',
        });
        Taro.setTabBarItem({
          index: 0,
          text: T['message'],
          iconPath: 'images/message.png',
          selectedIconPath: 'images/message_sel.png'
        })
        Taro.setTabBarItem({
          index: 1,
          text: T['robot'],
          iconPath: 'images/intelligent_robot.png',
          selectedIconPath: 'images/intelligent_robot_sel.png'
        })
        Taro.setTabBarItem({
          index: 2,
          text: T['my'],
          iconPath: 'images/my.png',
          selectedIconPath: 'images/my_sel.png'
        })
      }
    } else if(currTheme == 'dark') {
      if(isTabBar) {
        Taro.setTabBarStyle({
          backgroundColor: '#191919',
          color: '#ffffff',
          selectedColor: '#8F1AFF',
        });
        Taro.setTabBarItem({
          index: 0,
          text: T['message'],
          iconPath: 'images/message_dark.png',
          selectedIconPath: 'images/message_sel.png'
        })
        Taro.setTabBarItem({
          index: 1,
          text: T['robot'],
          iconPath: 'images/intelligent_robot_dark.png',
          selectedIconPath: 'images/intelligent_robot_sel.png'
        })
        Taro.setTabBarItem({
          index: 2,
          text: T['my'],
          iconPath: 'images/my_dark.png',
          selectedIconPath: 'images/my_sel.png'
        })
      }
    }
  }

  return (
    <View className={`theme_${themeName}`}>
      <View className='theme_container'>{ children }</View>
    </View>
  )
}

export default memo(ThemeContainer);
