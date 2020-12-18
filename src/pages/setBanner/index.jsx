import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Button,Table} from 'antd'
const { Column } = Table

export default class SetBanner extends Component {
  state= {
    data:[
      {
        key: 0,
        id: 0,
        advertTitle: '高中数学',
        advertDec: '数学想得高分?',
        uploadDate: '',
        updateTime: ''
      },
      {
        key: 1,
        id: 1,
        advertTitle: '高中数学',
        advertDec: '数学想得高分?',
        uploadDate: '',
        updateTime: ''
      },
      {
        key: 2,
        id: 2,
        advertTitle: '高中数学',
        advertDec: '数学想得高分?',
        uploadDate: '',
        updateTime: ''
      }
    ],
    loading: false,

    pagination: {
      total: 0
    },
  }
  onchange(records) {
    console.log(this, records)
  }
  setting(records) {
    console.log(records)
  }
  del(records) {
    console.log(records)
  }
  render() {
    return(
      <div className="setBanner">
        <div className="pane-tool">
          <h3>广告管理</h3>
          <Button type="primary"><Link to="/addBanner">添加</Link></Button>
        </div>
        <Table dataSource={this.state.data} loading={this.state.loading} onChange={this.onChange} pagination={this.state.pagination}>
          <Column title="序号"  width={40} align="center" dataIndex="id" key="id" />
          <Column title="广告名称" dataIndex="advertTitle" key="advertTitle" />
          <Column title="广告描述" dataIndex="advertDec" key="advertDec" />
          <Column title="上传时间" dataIndex="uploadDate" key="uploadDate" />
          <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
          <Column title="操作" key="action" render={(text, record) =>
            <>
              <Button type="link" onClick={this.setting.bind(this, record)}>设置</Button>
              <Button type="link" onClick={this.del.bind(this, record)}>删除</Button>
            </>
          }/>
        </Table>
      </div>
    )
  }
}