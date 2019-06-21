import React, { Component } from 'react';
import logo from './logo.png';
import './index.less';
export default class Login extends Component {
  render() {
    return <div className="login">
      <header className="login-header">
        <h1><img src={logo} alt="logo图" className="logo"/></h1>
        <h2 className="title">React项目: 后台管理系统</h2>
      </header>
      <section>
        <form className="login-form">
          <h3>用户登录</h3>
          <input type="text" placeholder="用户名"/>
          <input type="password" placeholder="密码"/>
          <input type="submit" value="登录" className="login-btn"/>
        </form>
      </section>
    </div>;
  }
}