import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form,Select,Input } from 'antd';
const { Option  } = Select
const Item = Form.Item
class AddCategory extends Component {
  static propTypes = {
    categories:PropTypes.array.isRequired
  }
  validator = (rule,value,callback) => {
    if(!value) {
      callback('输入的名称不能为空');
    }else if(this.props.categories.find((item) => item.name === value)){
      callback('不能添加已存在的分类');
    }else {
      callback();
    }
  }
  render() {
    const { categories,form } = this.props;
    return <Form>
      <Item label="所属分类:">
        {
          form.getFieldDecorator('parentId',{
              initialValue:'0'
            }
          )(
            <Select style={{ width: '100%' }} >
              <Option value="0" key= "0" >一级分类</Option>
              {
                categories.map((item) => {
                  return <Option value={item._id} key= {item._id} >{item.name}</Option>;
                })
              }
            </Select>
          )
        }
      </Item >
      <Item label="分类名称:">
        {
          form.getFieldDecorator('categoryName',{
              rules:[{
                validator:this.validator
              }]
            }
          )(
            <Input placeholder="请输入分类名称" />
          )
        }
      </Item >
    </Form>
  }
}
export default Form.create()(AddCategory);