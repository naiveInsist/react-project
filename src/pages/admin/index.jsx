import React, { Component } from 'react';
import { Layout } from 'antd';
import Nav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Nav collapsed={this.state.collapsed}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0,minHeight:100 }} >
            <HeaderMain />
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              欢迎使用硅谷后台管理系统
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}