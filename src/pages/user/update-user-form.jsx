import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const Item = Form.Item;
const Option = Select.Option;

class UpdateUserForm extends Component {
  

  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
              {initialValue: this.props.user.username}
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
              {initialValue: this.props.user.phone}
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',
              {initialValue: this.props.user.email}
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role',{
                initialValue:this.props.user.role_id
              }
            )(
              <Select placeholder='请选择分类'>
                {
                  this.props.roles.map((item) =>{
                    return <Option value={item._id} key={item._id}>{item.name}</Option>
                  })
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateUserForm);