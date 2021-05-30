import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

import { webapi } from "webapi/index";


import ss from "./index.scss";

export default class Login extends React.Component {
  formRef =  React.createRef<FormInstance>();

  onFinish = (val: any) => {
    console.log("onfinish", val);
    webapi("POST", "/users/login",{}).then(res => {
      console.log(res);
    })
  };

  onFinishFailed = (val: any) => {
    console.log("onfinishfailed", val);
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };
  
  render () {
    return (
      <div className={ss.loginWrap}>
        <div className={ss.box}>
          <h3 className={ss.title}>用户登录</h3>
          <Form
            className={ss.formWrap}
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            onReset={this.onReset}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '用户名不能为空!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入账户" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="verificationCode"
                  rules={[{ required: true, message: '验证码不能为空!' }]}
                >
                  <Input
                    prefix={<SafetyCertificateOutlined />}
                    placeholder="请输入五位验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}