import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { staticRouter } from '../../router'
import { Link } from 'react-router-dom'
import './index.scss'
const { Sider } = Layout
export default class Side extends Component {
  state= {
    pathKey: ''
  }
  handleClick = e => {
    this.setState({ pathKey: e.key });
  };
  componentDidMount() {
    const pathKey = window.location.pathname.split('/')[2];
    this.setState({ pathKey });
  }
  render() {
    const {pathKey} = this.state;
    return (
      <Sider className="re-sider">
        <div className="sider-top">
          <h2>广告管理中心</h2>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[pathKey]}
          mode="inline"
        >
          {staticRouter.map((r) => {if(r.show) return <Menu.Item key={r.key}><Link to={r.path}>{r.title}</Link></Menu.Item>})}
        </Menu>
      </Sider>
    )
  }
}