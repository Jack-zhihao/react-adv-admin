import React, {Component} from 'react'
import {Layout} from 'antd'
import Cont from './cont'
import Foot from './foot'
import Head from './head'
import Side from './side'
import './index.scss'
import {BrowserRouter as Router} from 'react-router-dom'
export default class Lay extends Component {
  render() {
    return (
      <Router basename="/layout">
        <Layout className="re-layout">
          <Side></Side>
          <Layout>
            <Head></Head>
            <Cont>
            </Cont>
            <Foot></Foot>
          </Layout>
        </Layout>
      </Router>
    )
  }
}