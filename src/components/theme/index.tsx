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

  const { theme }: any = useSelector((state: any) => {
    return state.config;
  });

  Taro.useDidShow(() => {
    let currTheme = theme;
    if (currTheme === 'system') {
      const systemInfo = Taro.getSystemInfoSync();
      currTheme = systemInfo.theme || 'light';
    }
    if (currTheme === 'light') {
      isTabBar && Taro.setTabBarStyle({
        backgroundColor: '#f5f6f8',
        color: '#333333',
        selectedColor: '#8F1AFF',
      });
    } else if(currTheme == 'dark') {
      isTabBar && Taro.setTabBarStyle({
        backgroundColor: '#191919',
        color: '#ffffff',
        selectedColor: '#8F1AFF',
      });
    }
    themeChange(theme);
  })

  useEffect(() => {
    if(theme === 'system') {
      const systemInfo = Taro.getSystemInfoSync();
      setThemeName(systemInfo.theme || 'light')
      themeChange('system');
    } else {
      setThemeName(theme)
    }
  }, [theme]);

  const themeChange = async (v) => {
    dispatch(await updateTheme(v))
  }


  return (
    <View className={`theme_${themeName}`}>
      <View className='theme_container'>{ children }</View>
    </View>
  )
}

export default memo(ThemeContainer);
