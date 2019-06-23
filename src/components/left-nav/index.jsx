import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './index.less';
import menuList from '../../config/menu.config';

const {SubMenu} = Menu;

class Nav extends Component {
  componentWillMount() {
    const Item = Menu.Item;
    console.log(this)
    const {pathname} = this.props.location;
    this.menuList = menuList.map((item) => {
      if (item.children) {
        return <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
          }
        >
          {
            item.children.map((list) => {
              if (list.key === pathname) {
                this.openKey = item.key;
              }
              return createItem(list);
            })
          }
        </SubMenu>
      } else {
        return createItem(item);
      }
      function createItem(item) {
        return <Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon}/>
            <span>{item.title}</span>
          </Link>
        </Item>
      }
    });
    this.pathname = pathname;
  }

  render() {
    const {collapsed} = this.props;
    return (
      <div className="left-nav">
        <Link className="left-logo" to="/home">
          <img src={logo} alt="硅谷logo"/>
          <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" defaultSelectedKeys={[this.pathname]} defaultOpenKeys={[this.openKey]} mode="inline">
          {
            this.menuList
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(Nav);