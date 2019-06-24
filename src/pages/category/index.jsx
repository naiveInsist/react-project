import React, { Component } from 'react';
import { Card,Button,Icon,Table } from 'antd';
import Mybutton from '../../components/my-button';
import {reqCategories} from '../../api';
import './index.less';
export default class Category extends Component {
  async componentDidMount() {
    const result = await reqCategories('0');
    if( result ) {
      console.log(result);
      this.setState({
          categories:result.data
      });
    }
  }
  state = {
    categories:[]
  }
  render() {
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
        key:'name'
      },
      {
        title: '操作',
        className: 'column-money',
        dataIndex: 'money',
        key:'money',
        className:'category-operation',
        render: text => {
          return <div>
            <Mybutton >修改名称</Mybutton>
            <Mybutton >查看其子类</Mybutton>
          </div>
        }
      },
    ];
    return (
      <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus"></Icon>添加品类</Button>} style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={this.state.categories}
          bordered
          pagination={{
            showSizeChanger:true,
            pageSizeOptions:['3', '6' , '9' , '12'],
            defaultPageSize:3,
            showQuickJumper:true
          }}
        />,
      </Card>
      );
  }
}