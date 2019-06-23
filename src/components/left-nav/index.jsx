import React, {Component} from 'react';
import { Menu, Icon} from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './index.less';
const {SubMenu} = Menu;
export default class Nav extends Component {
  render() {
    const Item = Menu.Item;
    const { collapsed } = this.props;
    return (
      <div className="left-nav">
        <Link className="left-logo" to="/home">
          <img src={logo} alt="硅谷logo"/>
          <h1 style={{display:collapsed?'none':'block'}}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" defaultSelectedKeys={['/home']} mode="inline">
          <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="/products"
            title={
                <span>
                  <Icon type="appstore" />
                  <span>商品管理</span>
                </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="bars" />
                <span>品类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="tool" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu>
          <Item key="/user">
            <Link to="/user">
              <Icon type="user" />
              <span>用户管理</span>
            </Link>
          </Item>
          <Item key="/role">
            <Link to="/role">
              <Icon type="safety" />
              <span>权限管理</span>
            </Link>
          </Item>
          <SubMenu
            key="charts"
            title={
              <span>
                  <Icon type="area-chart" />
                  <span>图形图表</span>
                </span>
            }
          >
            <Item key="/charts/bar">
              <Link to="/charts/bar">
                <Icon type="bar-chart" />
                <span>柱形图</span>
              </Link>
            </Item>
            <Item key="/charts/line">
              <Link to="/charts/line">
                <Icon type="line-chart" />
                <span>折线图</span>
              </Link>
            </Item>
            <Item key="/charts/pie">
              <Link to="/charts/pie">
                <Icon type="pie-chart" />
                <span>饼图</span>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
