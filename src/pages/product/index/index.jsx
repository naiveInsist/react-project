import React, { Component } from 'react';
import { Card,Input,Select,Button,Table,Icon } from 'antd';
import MyButton from '../../../components/my-button';
import './index.less';
import { reqProducts } from '../../../api'
const { Option } = Select;

export default class Index extends Component {
  state = {
    products:[],
    total:0,
    // product:null
  }
  componentDidMount() {
    this.getProducts(1,3);
  }
  getProducts = async (pageNum,pageSize) => {
    const result = await reqProducts(pageNum,pageSize);
    this.setState({
      products:result.data.list,
      total:result.data.total
    })
  }
  pageChange = (pageNum,pageSize) => {
    this.getProducts(pageNum,pageSize);
  }
  addProduct = () => {
    this.props.history.push('/product/saveupdate');
  }
  updateProduct = (product) => {
    return () => {
      // this.setState({
      //   product
      // });
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
        dataIndex:'status',
        render: status => {
          return <div>
            {
              status === 1
                  ? <div><Button type="primary">上架</Button> &nbsp;&nbsp;&nbsp;&nbsp;已下架</div>
                  : <div><Button type="primary">下架</Button> &nbsp;&nbsp;&nbsp;&nbsp;在售</div>
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
        <Select className="search-select" defaultValue="根据商品名称">
          <Option key={0} value={0}>根据商品名称</Option>
          <Option key={1} value={1}>根据商品描述</Option>
        </Select>
        <Input placeholder="请输入关键字" className="search-input"/>
        <Button type="primary" htmlType="submit">搜索</Button>
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
          onChange:this.pageChange,
          onShowSizeChange:this.pageChange
        }}
        rowKey="_id"
      />
    </Card>
  }
}