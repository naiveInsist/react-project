import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './index.less';
import menuList from '../../config/menu.config';
import { getItem } from '../../utils/localstorage.tools';
const {SubMenu} = Menu;
const Item = Menu.Item;

class Nav extends Component {
  createItem = (item) => {
    return <Item key={item.key}>
      <Link to={item.key}>
        <Icon type={item.icon}/>
        <span>{item.title}</span>
      </Link>
    </Item>
  }
  componentWillMount() {
    let {pathname} = this.props.location;
    const testReg = /^\/product\//;
    if(testReg.test(pathname)){
      pathname = '/product';
    }
    const menus = getItem().role.menus;
    let isHome = true;
    // this.menuList = menuList.map((item) => {
    //   if (item.children) {
    //     return <SubMenu
    //       key={item.key}
    //       title={
    //         <span>
    //           <Icon type={item.icon}/>
    //           <span>{item.title}</span>
    //         </span>
    //       }
    //     >
    //       {
    //         item.children.map((list) => {
    //           if (list.key === pathname) {
    //             this.openKey = item.key;
    //             isHome = false;
    //           }
    //           return this.createItem(list);
    //         })
    //       }
    //     </SubMenu>
    //   } else {
    //     if(item.key === pathname) isHome = false;
    //     return this.createItem(item);
    //   }
    // });
    this.menuList = menuList.reduce((prev,list) => {
      if(list.children) {
        let isShowSubMenu = false;
        const subMenu =
          <SubMenu
            key={list.key}
            title={
              <span>
                <Icon type={list.icon}/>
                <span>{list.title}</span>
              </span>
            }
          >
            {
              list.children.reduce((prev,curr) => {
                const result = menus.find((item) => item ===curr.key);
                if(result) {
                  isHome = false;
                  if(curr.key === pathname) this.openKey = list.key;
                  isShowSubMenu = true;
                  return [...prev,this.createItem(curr)]
                } else {
                  return [...prev]
                }
              },[])
            }
          </SubMenu>
        return isShowSubMenu? [...prev,subMenu] : [...prev];
      } else {
        const result =  menus.find((item) => item === list.key);
        if(result ) {
          isHome = false;
          if(list.key === pathname) this.openKey = list.key;
          return [...prev,this.createItem(list)]
        } else {
          return [...prev];
        }
      }
    },[])
    this.pathname = isHome?'/home':pathname;
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