import React, {Component} from 'react';
import {Card, Input, Form, Icon, Button, Cascader, InputNumber} from 'antd';
import './index.less';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PictureWall from './picture-wall';
import {reqCategories, reqAddProduct} from '../../../api'
import RichText from './rich-text';

const {Item} = Form;

class SaveUpdate extends Component {
  async componentDidMount() {
    this.getCategories('0')
    const product = this.props.location.state;
    let categoriesId = [];
    if(product) {
      if(product.pCategoryId !== '0' ) {
        categoriesId.push(product.pCategoryId);
        this.getCategories(product.pCategoryId);
      }
      categoriesId.push(product.categoryId);
    }
    this.categoriesId = categoriesId
  }


  getCategories = async (parentId) => {
    const result = await reqCategories(parentId);
    if (result) {
      if (parentId === '0') {
        this.setState({
          options: result.data.map((item, index) => {
            return {
              value:item._id,
              label:item.name,
              isLeaf:false
            }
          })
        })
      } else {
        this.setState({
          options: this.state.options.map((item) => {
            if (item.value === parentId) {
              item.children = result.data.map((category) => {
                return {
                  value: category._id,
                  label: category.name,
                }
              })
            }
            return item;
          })
        })
      }
    }
  }


  goback = () => {
    this.props.history.goBack();
  }
  loadData = async selectedOptions => {
  console.log(selectedOptions);
  const targetOption = selectedOptions[selectedOptions.length - 1];
  targetOption.loading = true;
  const result = await reqCategories(targetOption.value);
  if (result) {
    targetOption.loading = false;
    targetOption.children = [
      ...result.data.map((item) => {
        return {
          label: item.name,
          value: item._id
        }
      })
    ]
  }
  this.setState({
    options: [...this.state.options]
  })
}
  state = {
    options: [],
  }
  addProduct = async (e) => {
    e.preventDefault();
    const {form} = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const {name, desc, categoriesId, price} = values;
        const {editor} = this.addProductRef.current.state;
        const detail = draftToHtml(convertToRaw(editor.getCurrentContent()));
        let pCategoryId = '0'
        let categoryId = ''
        if (categoriesId.length === 1) {
          categoryId = categoriesId[0];
        } else {
          pCategoryId = categoriesId[0];
          categoryId = categoriesId[1];
        }
        const result = await reqAddProduct({name, desc, price, categoryId, pCategoryId, detail});
        console.log(result);
        this.props.history.push('/product/index');
      }
    })
  }
  addProductRef = React.createRef();
  render() {
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 2},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 10},
    },
  };
  const {getFieldDecorator} = this.props.form;
  const product = this.props.location.state;
  return <Card title={<div className="product-title"><Icon onClick={this.goback} type="arrow-left"
     className="arrow-left"/>&nbsp;添加商品</div>}>
    <Form {...formItemLayout} onSubmit={this.addProduct}>
      <Item label="商品名称">
        {
          getFieldDecorator(
            'name', {
              rules: [{
                required: true,
                message: '商品名称不能为空'
              }],
              initialValue: product ? product.name : ''
            }
          )(
            <Input placeholder="请输入商品名称"/>
          )
        }
      </Item>
      <Item label="商品描述">
        {
          getFieldDecorator(
            'desc', {
              rules: [{
                required: true,
                message: '商品描述不能为空'
              }],
              initialValue: product ? product.desc : ''
            }
          )(
            <Input placeholder="请输入商品描述"/>
          )
        }
      </Item>
      <Item label="商品分类" wrapperCol={{span: 5}}>
        {
          getFieldDecorator(
            'categoriesId', {
              rules: [{
                required: true,
                message: '商品分类不能为空'
              }],
              initialValue: this.categoriesId
            }
          )(
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              changeOnSelect
              placeholder='请输入分类'
            />
          )
        }
      </Item>
      <Item label="商品价格" wrapperCol={{span: 5}}>
        {
          getFieldDecorator(
            'price', {
              rules: [{
                required: true,
                message: '商品价格不能为空'
              }],
              initialValue: product ? product.price : ''
            }
          )(
            <InputNumber
              className="product-money"
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/￥\s?|(,*)/g, '')}
            />
          )
        }
      </Item>
      <Item>
        {product?<PictureWall imgs={product?product.imgs:[]} id={product?product._id:''}/>:null}
      </Item>
      <Item label="商品详情" wrapperCol={{span: 20}}>
        <RichText ref={this.addProductRef} detail={product?product.detail:''}/>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className="add-product-btn">提交</Button>
      </Item>
    </Form>
  </Card>
  }
}
export default Form.create()(SaveUpdate);