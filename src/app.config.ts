export default defineAppConfig({
  pages: [
    'pages/message/index',
    'pages/intelligentRobot/index',
    'pages/my/index',
    'pages/createRobot/index',
    'pages/setting/index',
    'pages/editUserInfo/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#333',
    selectedColor: '#901aff',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: './assets/images/message.png',
        selectedIconPath: './assets/images/message_sel.png'
      },
      {
        pagePath: 'pages/intelligentRobot/index',
        text: '智能体',
        iconPath: './assets/images/intelligent_robot.png',
        selectedIconPath: './assets/images/intelligent_robot_sel.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/images/my.png',
        selectedIconPath: './assets/images/my_sel.png'
      }
    ]
  }
})
