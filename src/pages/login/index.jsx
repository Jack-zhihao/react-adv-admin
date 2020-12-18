import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ParticlesBg from 'particles-bg'
import { login, register } from '../../api/login'
import { setCookie } from '../../utils/cookie'
import './index.scss'

export default class Login extends Component {
  state = {
    viewRegister: false
  }
  onFinish(values) {
    login({
      ...values
    }).then(res => {
      setCookie('info', res.data);
      window.location.href = '/layout'
    })
  }
  r_onFinish(values) {
    console.log(values)
    register({
      username: values.r_username,
      password: values.r_password
    }).then(res => {
      console.log(res);
      message.success(res.message);
      this.setState({
        viewRegister: false
      })
    })
  }
  register() {
    this.setState({
      viewRegister: true
    })
  }
  viewLogin() {
    this.setState({
      viewRegister: false
    })
  }
  render() {
    return (
      <div className="login">
        <ParticlesBg type="circle" bg={true} />
        {!this.state.viewRegister ? (
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}

          >
            <h2>广告后台系统</h2>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入您的用户名' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入您的密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item><Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button></Form.Item>

            <Form.Item style={{margin: 0, textAlign: 'right'}}><Button type="link" onClick={this.register.bind(this)}> 注册 </Button></Form.Item>
          </Form>) : (
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.r_onFinish.bind(this)}
            >
              <h2>广告后台系统</h2>
              <Form.Item
                name="r_username"
                rules={[{ required: true, message: '请输入您的用户名' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="r_password"
                rules={[{ required: true, message: '请输入您的密码' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item><Button type="primary" htmlType="submit" className="login-form-button"> 注册 </Button></Form.Item>

              <Form.Item style={{margin: 0, textAlign: 'right'}}><Button type="link" onClick={this.viewLogin.bind(this)}> 登录 </Button></Form.Item>
            </Form>
          )}

      </div>
    )
  }
}