import React, { Component } from 'react';
import './index.scss';
import { Button, Input, Form, Upload, message } from 'antd'; // Upload, message,
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { baseUrl, ENV } from '../../../utils/config'

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class addBanner extends Component {

  state = {
    loading: false
  }

  handleChange = info => {
    console.log('handleChange', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {

      const res = info.file.response;
      if (res.code !== 1) { message.info(res.message) }
      else {
        this.setState({
          imageUrl: res.data.coverUrl,
          loading: false,
        })
      }
    }
  }

  onFinish(values) {
    console.log(values)
  }
  

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <div className="pane-tool">
          <h3>添加广告预览</h3>
          <Button type="text"><Link to="/setBanner">返回</Link></Button>
        </div>
        <div className="contant">
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            data={() => ({
              userid: 'userid-01230101010'
            })}
            action={`${baseUrl[ENV]}/common/uploadFile`}
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          <Form
            name="basic"
            onFinish={this.onFinish.bind(this)}
            style={{ 'marginTop': '0.16rem' }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入广告标题!',
                },
              ]}
            >
              <Input placeholder="广告标题" />
            </Form.Item>

            <Form.Item
              name="dec"
              rules={[
                {
                  required: true,
                  message: '请输入广告描述!',
                },
              ]}
            >
              <Input placeholder="广告描述" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">保存</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
