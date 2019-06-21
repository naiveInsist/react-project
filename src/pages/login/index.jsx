import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import logo from './logo.png';
import './index.less';
class Login extends Component {
  render() {
    const Item = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return <div className="login">
      <header className="login-header">
        <h1><img src={logo} alt="logo图" className="logo"/></h1>
        <h2 className="title">React项目: 后台管理系统</h2>
      </header>
      <section>
        {/*<form className="login-form">*/}
        {/*  <h3>用户登录</h3>*/}
        {/*  <input type="text" placeholder="用户名"/>*/}
        {/*  <input type="password" placeholder="密码"/>*/}
        {/*  <input type="submit" value="登录" className="login-btn"/>*/}
        {/*</form>*/}
        <Form className="login-form" >
          <h3>用户登录</h3>
          <Item>
            {
              getFieldDecorator("username"

              )(
                <Input prefix={<Icon type="user"  />}
                       placeholder="用户名" className="setWidth"/>
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator("password"

              )(
                <Input prefix={<Icon type="lock"  />}
                       placeholder="密码" className="setWidth"/>
              )
            }
          </Item>
          <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
        </Form>
      </section>
    </div>;
  }
}
export default Form.create({ name: 'normal_login' })(Login);
