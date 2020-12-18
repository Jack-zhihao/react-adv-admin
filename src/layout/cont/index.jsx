import React, {Component} from 'react'
import {Layout} from 'antd'
import { Route, Switch, Redirect } from 'react-router-dom'
import { staticRouter } from '../../router'
const {Content}  = Layout
export default class Cont extends Component {
  render() {
    return (
      <Content>
        <Switch>
          {staticRouter.map((r)=> (<Route key={r.key} exact path={r.path} component={r.component}></Route>))}
          <Redirect form="/" to="/setWechat"></Redirect>
        </Switch>
      </Content>
    )
  }
}