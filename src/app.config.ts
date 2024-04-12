import { useGlobalIconFont as globalIconFont } from './components/iconfont/helper';

export default defineAppConfig({
  usingComponents: globalIconFont(),
  appId: 'wx7c95a9504d4dc7c5',
  entryPagePath: 'pages/message/index',
  pages: [
    'pages/message/index',
    'pages/intelligentRobot/index',
    'pages/my/index',
    'pages/robotDetail/index',
    'pages/publisherDetail/index',
    'pages/chat/index',
    'pages/createRobot/index',
    'pages/updateRobot/index',
    'pages/complaint/index',
    'pages/setting/index',
    'pages/editUserInfo/index',
    'pages/about/index',
    'pages/report/index',
    'pages/updateToken/index',
  ],
  window: {
    navigationBarTitleText: 'flyChat',
    backgroundTextStyle: '@bgTxtStyle',
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle'
  },
  darkmode: true,
  themeLocation: 'theme.json',
  debug: false,
  permission: {},
  networkTimeout: {
    request: 30000
  },
  tabBar: {
    color: "@tabFontColor",
    selectedColor: "@tabSelectedColor",
    backgroundColor: "@tabBgColor",
    list: [
      {
        pagePath: 'pages/message/index',
        text: '消息',
        iconPath: "@iconPath1",
        selectedIconPath: "@selectedIconPath1"
      },
      {
        pagePath: 'pages/intelligentRobot/index',
        text: '智能体',
        iconPath: "@iconPath2",
        selectedIconPath: "@selectedIconPath2"
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: "@iconPath3",
        selectedIconPath: "@selectedIconPath3"
      }
    ]
  }
})
