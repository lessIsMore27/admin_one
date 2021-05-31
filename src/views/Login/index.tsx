import React from "react";
import { Form, Input, Button, Row, Col, notification, message as antdMessage } from "antd";
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

import { webapi, RegularConfig } from "webapi/index";
import { getRule } from "webapi/tool";
import { lsSetItem } from "utils/webStore";

import ss from "./index.scss";

interface LoginState {
  regularConfig: RegularConfig
}

export default class Login extends React.Component<{}, LoginState> {
  formRef =  React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    this.state = {
      regularConfig: {}
    };
  }

  componentDidMount() {
    webapi("GET", "/users/login", {}).then(({ status, result }) => {
      if (status === 200) {
        this.setState({
          regularConfig: result.regularConfig
        });
      } else {
        notification.open({
          message: "",
          description: "请求出错啦，请稍后刷新页面重试",
          duration: 3
        });
      }
    });
  }

  onFinish = (val: any) => {
    webapi("POST", "/users/login",{...val}).then(({ status, result: { token, menu_tree }, message = "请求失败" }) => {
      if (status === 200) {
        lsSetItem("token", token);
        lsSetItem("menuTree", JSON.stringify(menu_tree));

      } else {
        antdMessage.error(message);
      }
    })
  };

  onFinishFailed = (val: any) => {
    console.log("onfinishfailed", val);
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };
  
  render () {
    const { regularConfig } = this.state;
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
              rules={getRule(regularConfig?.username)}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入账户" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={getRule(regularConfig?.password)}
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