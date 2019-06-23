import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import logo from '../../assets/images/logo.png';
import './index.less';
import {login} from '../../api'

function Login(props) {
  const validator = (error, content, callback) => {
    const name = error.field === 'username' ? '用户名' : '密码'
    if (!content) {
      callback(`${name}不能为空`);
    } else if (content.length < 4) {
      callback(`${name}不能少于四位`);
    } else if (content.length > 13) {
      callback(`${name}不能大于13位`);
    } else if (!/^[a-zA-Z0-9_]+$/.test(content)) {
      callback(`${name}输入的字符必须是数组字母下划线`);
    } else {
      callback();
    }
  }
  const loginHandle = (e) => {
    e.preventDefault();
    props.form.validateFields(async (error, msg) => {
      if (!error) {
        const {username, password} = msg;
        const result = await login(username, password);
        if (result) {
          props.history.replace('/');
        } else {
          // message.error(2);
          props.form.resetFields(['password']);
        }
      } else {
        console.log('登录校验失败');
      }
    })
  }

  const Item = Form.Item;
  const {getFieldDecorator} = props.form;
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
      <Form className="login-form" onSubmit={loginHandle}>
        <h3>用户登录</h3>
        <Item>
          {
            getFieldDecorator("username", {
                rules: [{
                  validator: validator
                }]
              }
            )(
              <Input prefix={<Icon type="user"/>}
                     placeholder="用户名" className="setWidth"/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator("password", {
                rules: [{
                  validator: validator
                }]
              }
            )(
              <Input prefix={<Icon type="lock"/>}
                     placeholder="密码" className="setWidth" type="password"/>
            )
          }
        </Item>
        <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
      </Form>
    </section>
  </div>;
}

export default Form.create({name: 'normal_login'})(Login);
