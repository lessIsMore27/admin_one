import React from "react";
import { Layout, Breadcrumb} from "antd";
import Sidebar from "../Siderbar";
import ss from "./index.scss";

const { Header, Content } = Layout;

export default class App extends React.Component {
  componentDidMount() {
    console.log("app component");
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout className={ss.siteLayout}>
          <Header className={ss.headerBox} style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className={ss.renderBody}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}