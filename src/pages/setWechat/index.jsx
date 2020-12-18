import React, { Component } from 'react'
import './index.scss'
import { Table, Button, Modal, message, Input } from 'antd';
import { Link } from 'react-router-dom'
import { findAdverts, findDelete} from '../../api/advert'
import { getCookie } from '../../utils/cookie'
import { ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';
import Config from '../../utils/config'
const { baseUrl, ENV } = Config
const { Column } = Table;
export default class SetWechat extends Component {
  state = {
    userid: getCookie('info').userid,
    data: [],
    loading: true,
    params: {
      current: 1,
      pageSize: 10
    },
    pagination: {
      total: 0
    },
    // model
    isModalVisible: false,
    modalData: {}
  }

  // 跳转到编辑页
  setting(record) {
    this.props.history.push({pathname: '/editWechat', state: {...record}})
  }

  // 删除函数 传入行数据
  del(record) {
    const _this = this;
    Modal.confirm({
      title: '确认框',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认删除?',
      okText: '确认',
      cancelText: '取消',
      onOk: function(close) {
        const advertId = record.advertId
        const userid = _this.state.userid
        findDelete({
          advertId,
          userid
        }).then(res => {
          message.info(res.message)
          _this.findAdvertsHandle({userid, ..._this.state.params})
          close();
        })
      }
    });
  }

  // 监听表格变动 请求触发
  onChange(params) {
    this.findAdvertsHandle(params)
  }

  // 请求数据
  findAdvertsHandle(params) {
    this.setState({
      loading: true,
      params: {...params}
    })
    const {userid} = this.state;
    findAdverts({userid, ...params}).then(res => {
      console.log(',',res)
      const {current, pageSize} = params;
      const data = res.data.map(d => {
        d.id = (d.key+1) + (current-1)*pageSize;
        return d;
      })
      this.setState({data, loading: false, pagination:{total: res.total}})
    })
  }

  // 周期钩子 请求页面数据
  componentDidMount() {
    const {params} = this.state;
    this.findAdvertsHandle(params)
  }

  // 弹出框函数组
  showModal(records) {
    console.log(records)
    this.setState({
      isModalVisible: true,
      modalData: {
        advertTitle: records.advertTitle,
        advertDec: records.advertDec,
        wxApi: `${baseUrl[ENV]}/advert/getAdvertWxs?advertId=${records.advertId}`,
      }
    })
  }

  handleOk() {
    this.setState({isModalVisible: false})
  }

  handleCancel() {
    this.setState({isModalVisible: false})
  }

  render() {
    const {isModalVisible} = this.state
    return (
      <div className="setWechat">
        <div className="pane-tool">
          <h3>微信号管理</h3>
          <Button type="primary"><Link to="/addWechat">添加</Link></Button>
        </div>
        <Table dataSource={this.state.data} loading={this.state.loading} onChange={this.onChange.bind(this)} pagination={this.state.pagination}>
          <Column title="序号" align="center" width={40} dataIndex="id" key="id" />
          <Column title="广告名称" dataIndex="advertTitle" key="advertTitle" />
          <Column title="广告描述" dataIndex="advertDec" key="advertDec" />
          <Column title="上传时间" dataIndex="uploadDate" key="uploadDate" />
          <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
          <Column title="操作" key="action" render={(text, record) =>
            <>
              <Button type="link" onClick={this.setting.bind(this, record)}>设置</Button>
              <Button type="link" onClick={this.showModal.bind(this, record)}>使用</Button>
              <Button type="link" onClick={this.del.bind(this, record)}>删除</Button>
            </>
          }/>
        </Table>

        <Modal
          className="model-default-style"
          title="获取微信组"
          width="50%"
          closable={false}
          visible={isModalVisible}
          footer={[
            <Button key="primary" type="primary" onClick={this.handleOk.bind(this)}>确定</Button>
          ]}
        >
          <div className="modal_wx">
            <h2 style={{'fontWeight': 'bold'}}>{this.state.modalData.advertTitle}</h2>
            <p className="dec">描述: {this.state.modalData.advertDec}</p>
            <Input className="address" addonAfter={<SettingOutlined />} value={this.state.modalData.wxApi} defaultValue="mysite" />
            <p className="tips">使用方法: 复制链接, 请求使用</p>
          </div>
      </Modal>
      </div>
    )
  }
}