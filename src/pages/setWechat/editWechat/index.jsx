import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { editAdvert } from '../../../api/advert'
import { getCookie } from '../../../utils/cookie'
import './index.scss';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default class EditWechat extends Component {

  formRef = React.createRef();
  state = {
    values: {}
  }

  onFinish(params) {
    const { userid } = getCookie('info')
    params.advertWechats = params.advertWechats.map(wechat => wechat.wx).join(',');
    editAdvert({
      userid,
      advertId: this.state.values.advertId,
      ...params
    }).then(res=> {
      if(res.code !== 1) return;
      message.success(res.message);

      this.props.history.push('/layout/setWechat');
    })
  }

  componentDidMount() {
    const values = this.props.location.state;
    console.log(values.advertWechats)
    values.advertWechats = values.advertWechats.split(',')
    this.setState({
      values: {
        ...values
      }
    })
    const {setFieldsValue} = this.formRef.current;
    console.log(values.advertWechats)
    const wxField = values.advertWechats.map((wx, idx) => {
      return {
        'fieldKey': idx,
        'isListField':true,
        'key': idx,
        'wx': wx
      }
    })
    setFieldsValue({
     advertTitle: values.advertTitle,
     advertDec: values.advertDec,
     advertWechats: wxField
    })
  }

  render() {
    return (
      <div className="addWechat">
        <div className="pane-tool">
          <h3>设置广告</h3>
          <Button type="default"><Link to="/setWechat">返回</Link></Button>
        </div>
        <Form name="form" {...formItemLayout} onFinish={this.onFinish.bind(this)} ref={this.formRef}>
          <Form.Item name="advertTitle" label="广告名称" rules={[{ required: true, message: '请输入广告名称' }]}>
            <Input placeholder="" style={{ width: '60%' }} />
          </Form.Item>
          <Form.Item name="advertDec" label="广告描述" rules={[{ required: false, message: '请输入广告描述' }]}>
            <Input placeholder="" style={{ width: '60%' }} />
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <p style={{borderBottom: '1px dashed #999', width: '60%'}}></p>
          </Form.Item>
          <Form.List
            name="advertWechats"
            rules={[
              {
                validator: async (_, advertWechats) => {
                  if (!advertWechats || advertWechats.length < 1) {
                    return Promise.reject(new Error('请添加微信号'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '微信号' : ''}
                    required={true}
                    key={`wx${field.key}`}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      name={[field.name, 'wx']}
                      fieldKey={[field.fieldKey, 'wx']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入微信号",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="" style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>)
                )}
                <Form.Item { ...formItemLayoutWithOutLabel }>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    添加微信
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item { ...formItemLayoutWithOutLabel }>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
