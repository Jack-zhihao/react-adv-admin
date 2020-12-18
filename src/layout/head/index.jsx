import React, {Component} from 'react'
import {Layout, Avatar, Button, Drawer, Modal } from 'antd'
import './index.scss'
import {getCookie, removeCookie} from '../../utils/cookie'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { logout } from '../../api/login';
const {Header}  = Layout
export default class Head extends Component {
  state = {
    visible: false,
    baseInfo: {}
  }

  showDrawer() {
    this.setState({'visible': true})
  };
  onClose() {
    this.setState({'visible': false})
  };
  logout() {
    const _this = this;
    Modal.confirm({
      title: '确认框',
      icon: <ExclamationCircleOutlined />,
      content: '确认退出登录?',
      okText: '确认',
      cancelText: '取消',
      onOk: function(close) {
        const {userid} = _this.state.baseInfo
        logout({userid}).then(res => {
          removeCookie('info')
          close();
          
          window.location.href="/"
        })
      }
    });
  };
  componentDidMount() {
    const baseInfo = getCookie('info');
    this.setState({
      baseInfo: {
        ...baseInfo
      }
    })
  }
  render() {
    const {baseInfo} = this.state;
    return (
      <Header>
        <div></div>
        <div>
          <Avatar sec={40} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Button className="username" type="link" onClick={this.showDrawer.bind(this)}>{baseInfo.username}</Button>
          <Drawer
            title="工具菜单"
            placement="right"
            width="200px"
            closable={true}
            onClose={this.onClose.bind(this)}
            visible={this.state.visible}
            className="re-right-ant-drawer"
          >
            <div className="system-tool">
              {/* <Button type="text">用户面板</Button> */}
              <Button type="text" onClick={this.logout.bind(this)}>退出登录</Button>
            </div>
          </Drawer>
        </div>
      </Header>
    )
  }
}