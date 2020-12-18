import setWechat from '../pages/setWechat'
import addWechat from '../pages/setWechat/addWechat'
import editWechat from '../pages/setWechat/editWechat'
import setBanner from '../pages/setBanner'
import addBanner from '../pages/setBanner/addBanner'
import Avatar from '../pages/upload'
import login from '../pages/login'
import layout from '../layout'
export const staticRouter = [
    {
      path: '/setWechat',
      title: '微信号管理',
      key: 'setWechat',
      show: true,
      component: setWechat
    },
    {
      path: '/addWechat',
      title: '添加广告组',
      key: 'addWechat',
      show: false,
      component: addWechat
    },
    {
      path: '/editWechat',
      title: '修改广告组',
      key: 'editWechat',
      show: false,
      component: editWechat
    },
    {
      path: '/setBanner',
      title: '广告预览管理',
      key: 'setBanner',
      show: true,
      component: setBanner
    },
    {
      path: '/addBanner',
      title: '添加广告预览',
      key: 'addBanner',
      show: false,
      component: addBanner
    },
    {
      path: '/Avatar',
      title: '测试组件',
      key: 'Avatar',
      show: true,
      component: Avatar
    },
]

export const defaultRouter = [
  {
    path: '/login',
    title: '登录',
    key: 'login',
    show: false,
    component: login
  },
  {
    path: '/layout',
    title: '首页',
    key: 'login',
    show: false,
    component: layout
  },
]