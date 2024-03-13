import React from 'react'
import { View } from '@tarojs/components'
import { ActionSheet, CellGroup, Cell } from '@antmjs/vantui'
import './index.scss'
const { memo, useState } = React;

const Setting = () => {
  const [show, setShow] = useState(false)
  const [theme, setTheme] = useState('');
  const [actions] = useState([
    { name: '浅色模式' },
    { name: '深色模式' },
    { name: '跟随系统' }
  ])

  return (
    <View className='setting-wrap'>

      <CellGroup inset className="cell-group">
        <Cell title="手机号" value="13612345678" />
        <Cell title="微信" value="去绑定" isLink />
        <Cell title="Apple ID" value="去绑定" isLink />
      </CellGroup>

      <CellGroup inset className="cell-group">
        <Cell title="分享给好友" />
        <Cell title="反馈与投诉，帮助我们改进" isLink />
      </CellGroup>

      <CellGroup inset className="cell-group">
        <Cell title="背景设置" value={theme || '浅色模式'} onClick={()=> setShow(true)} isLink />
      </CellGroup>

      <CellGroup inset className="cell-group">
        <Cell title="关于我们" isLink />
        <Cell title="退出登录" />
      </CellGroup>

      <ActionSheet
        show={show}
        actions={actions}
        onClose={() => setShow(false)}
        onSelect={(e) => {
          console.info(e.detail.name);
          setTheme(e.detail.name);
          setShow(false);
        }}
      />

    </View>
  )
}

export default memo(Setting);
