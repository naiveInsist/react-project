import React, { Component } from 'react';
import MyButton from '../my-button';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import { getItem,removeItem } from '../../utils/localstorage.tools';
import { reqWeather } from '../../api';
import './index.less';
import menuList from '../../config/menu.config';
class HeaderMain extends Component {
  state = {
    currentTime: Date.now(),
    weather: '晴',
    weatherImg:'http://api.map.baidu.com/images/weather/day/qing.png'
  }
  componentWillMount() {
    this.username = getItem().username;
    this.showMessage(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.showMessage(nextProps);
  }

  async componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: Date.now()
      })
    },1000)
    const { promise,cancel } = reqWeather();
    this.cancel = cancel;
    const weather = await promise;
    this.setState({...weather});
  }
componentWillUnmount() {
    clearInterval(this.timer);
    this.cancel();
}

  handleClick = () => {
    Modal.confirm({
      title:'你确认要退出吗',
      okText:'确定',
      cancelText:'取消',
      onOk: () => {
        removeItem();
        this.props.history.replace('/login');
      }
    })
  }
  showMessage = (props) => {
    let { pathname } = props.location;
    const testReg = /^\/product\//;
    if(testReg.test(pathname)){
      pathname = '/product';
    }
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if(menu.children) {
        for( let j = 0; j < menu.children.length; j++) {
          const item = menu.children[j];
          if(item.key === pathname) {
            this.content = item.title;
            return ;
          }
        }
      } else {
        if(menu.key === pathname) {
          this.content = menu.title;
          return ;
        }
      }
    }
  }
  render() {
    const { currentTime,weather,weatherImg } = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.handleClick}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">{this.content}</span>
        <div className="header-main-right">
          <span>{dayjs(currentTime).format('YYYY-MM-DD hh:mm:ss')}</span>
          <img src={weatherImg} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}
export default withRouter(HeaderMain);