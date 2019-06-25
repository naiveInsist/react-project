import React, { Component } from 'react';
import { Layout } from 'antd';
import Nav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/localstorage.tools';
import { Switch,Route,Redirect } from 'react-router-dom';
import User from '../user';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import Role from '../role';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Bar from '../charts/bar';
import { reqValidate } from '../../api'
const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

export default class Admin extends Component {
  state = {
    collapsed: false,
    isLoading:true,
    success:false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  async componentWillMount() {
    const data = getItem();
    if( data && data._id) {
       const result = await reqValidate(data._id);
       if (result) return this.setState({
         isLoading:false,
         success:true
       });
    }
    this.setState({
      isLoading:false,
      success:false
    })
  }

  render() {
    if(this.state.isLoading) return null;
    return this.state.success? <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Nav collapsed={this.state.collapsed}/>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0,minHeight:100 }} >
          <HeaderMain />
        </Header>
        <Content style={{ margin: '25px 16px' }}>
          <div style={{ background: '#fff', minHeight: 360 }}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/product' component={Product}/>
              <Route path='/category' component={Category}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          推荐使用谷歌浏览器，可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout> : <Redirect to="/login"/>
  }
}