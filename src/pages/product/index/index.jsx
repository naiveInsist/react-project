import React, { Component } from 'react';
import { Card,Input,Select,Button,Table,Icon,message } from 'antd';
import MyButton from '../../../components/my-button';
import './index.less';
import { reqUpdateProductState,reqProducts,reqSearchProduct } from '../../../api';
const { Option } = Select;

export default class Index extends Component {
  state = {
    products:[],
    total:0,
    searchType:'productName',
    searchContent:'',
    pageNum:1,
    pageSize:3
  }
  componentDidMount() {
    this.getProducts(1,3);
  }
  getProducts = async (pageNum, pageSize) => {

    this.setState({
      loading: true
    });

    const { searchContent, searchType } = this.state;

    let promise = null;

    if (this.isSearch && searchContent) {
      console.log(searchType, searchContent, pageSize, pageNum);
      promise = reqSearchProduct({
        searchType, searchContent, pageSize, pageNum
      });
    } else {
      promise = reqProducts(pageNum, pageSize);
    }

    const result = await promise;
    if (result) {
      this.setState({
        total: result.data.total,
        products: result.data.list,
        loading: false,
        pageNum,
        pageSize
      })
    }

  };

  changeState = (product) =>{
    return async () => {
      console.log(this.state.products);
      // console.log(product.status);
      const status = 3 - product.status;
      const productId = product._id;
      const result = reqUpdateProductState(productId,status);
      let products = this.state.products;
      if(result){
        products = products.map((item) => {
          if(item._id === product._id){
            console.log(status);
            item.status = status;
          }
          return item;
        })
      }
      this.setState({
        products
      })
    }
  }


  handleChange = (stateName) => {
    return (e) => {
      let value = '';
      if (stateName === 'searchType') {
        value = e;
      } else {
        // searchContent 一定是输入框的变化
        value = e.target.value;
        if (!value) this.isSearch = false;
      }
      this.setState({[stateName]: value})
    }
  };

  search = async () => {
    // 收集数据
    const { searchContent, pageSize, pageNum } = this.state;
    // 收集pageNum、pageSize
    if (searchContent) {
      // 发送请求，请求数据
      this.isSearch = true;
      this.getProducts(pageNum, pageSize);
    } else {
      message.warn('请输入搜索内容~', 2);
    }
  };

  addProduct = () => {
    this.props.history.push('/product/saveupdate');
  }
  updateProduct = (product) => {
    return () => {
      this.props.history.push('/product/saveupdate',product)
    }
  }
  render() {
    const { products } = this.state
    const columns = [
      {
        title:'商品名称',
        dataIndex:'name'
      },
      {
        title:'商品描述',
        dataIndex:'desc'
      },
      {
        title:'价格',
        dataIndex:'price'
      },
      {
        className:'start-Set',
        title:'状态',
        // dataIndex:'status',
        render: product => {
          return <div>
            {
              product.status === 1
                  ? <div><Button type="primary" onClick={this.changeState(product)}>上架</Button> &nbsp;&nbsp;&nbsp;&nbsp;已下架</div>
                  : <div><Button type="primary" onClick={this.changeState(product)}>下架</Button> &nbsp;&nbsp;&nbsp;&nbsp;在售</div>
            }
          </div>
        }
      },
      {
        className:'start-Set',
        title:'操作',
        // dataIndex:'detail',
        render: product => {
          return <div>
            <MyButton>详情</MyButton>
            <MyButton onClick={this.updateProduct(product)}>修改</MyButton>
          </div>
        }
      }
    ];
    return <Card title={
      <div>
        <Select defaultValue="productName" className="search-select" onChange={this.handleChange('searchType')} >
          <Option key={0} value='productName'>根据商品名称</Option>
          <Option key={1} value='productDesc'>根据商品描述</Option>
        </Select>
        <Input placeholder="请输入关键字" className="search-input" onChange={this.handleChange('searchContent')}/>
        <Button type="primary" htmlType="submit" onClick={this.search}>搜索</Button>
      </div>
    }
       extra={<Button type="primary"  onClick={this.addProduct}><Icon type="plus"/>&nbsp;添加产品</Button>}
    >
      <Table
        columns={columns}
        dataSource={products}
        bordered
        pagination={{
          showQuickJumper:true,
          showSizeChanger:true,
          pageSizeOptions:['3', '6' , '9' , '12'],
          defaultPageSize:3,
          total:this.state.total,
          onChange:this.getProducts,
          onShowSizeChange:this.pageChange
        }}
        rowKey="_id"
      />
    </Card>
  }
}