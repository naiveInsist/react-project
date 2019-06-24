import React, { Component } from 'react';
import MyButton from '../my-button';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import { getItem,removeItem } from '../../utils/localstorage.tools';
import { reqWeather } from '../../api';
import './index.less';
class HeaderMain extends Component {
  state = {
    currentTime: Date.now(),
    weather: '晴',
    weatherImg:'http://api.map.baidu.com/images/weather/day/qing.png'
  }
  componentWillMount() {
    this.username = getItem().username;
  }
  async componentDidMount() {
    setInterval(() => {
      this.setState({
        currentTime: Date.now()
      })
    },1000)
    const weather = await reqWeather();
    this.setState({...weather});
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
  render() {
    const { currentTime,weather,weatherImg } = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick={this.handleClick}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">用户管理</span>
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