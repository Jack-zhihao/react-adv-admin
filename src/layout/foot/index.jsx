import React, {Component} from 'react'
import {Layout} from 'antd'
const {Footer}  = Layout
export default class Foot extends Component {
  render() {
    return (
      <Footer className="re-footer">
        <p className="right">
          广州学魁榜信息科技有限公司
        </p>
      </Footer>
    )
  }
}