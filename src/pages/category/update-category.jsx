import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input,Form } from 'antd';
class UpdateCategoryName extends Component {
  static propTypes = {
    categoryName:PropTypes.string.isRequired
  }
  validator = (rule,values,callback) => {
    if(!values) {
      callback('名称不能为空')
    } else if(values.categoryName ===this.props.categoryName){
      callback('请不要输入相同的名称')
    }else {
      callback();
    }
  }
  render() {
    const { form } = this.props
    return <Form>
      <Form.Item>
        {
          form.getFieldDecorator('categoryName',{
            initialValue:this.props.categoryName,
            rules:[{
              validator:this.validator
            }]
            }
          )(
            <Input />
          )
        }
      </Form.Item>
    </Form>
  }
}
export default Form.create()(UpdateCategoryName);