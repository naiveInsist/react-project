import React, { Component } from 'react';
import { Card,Button,Icon,Table,Modal,message } from 'antd';
import Mybutton from '../../components/my-button';
import { reqCategories,reqAddCategory,reqUpdateCategory } from '../../api';
import './index.less';
import UpdateCategoryName from './update-category';
import AddCategory from './add-category';
export default class Category extends Component {
    async componentDidMount() {
    const result = await this.fetchRequest('0');
    if( result ) {
      this.setState({
          categories:result.data
      });
    }
  }
  fetchRequest = async (parentId) => {
    this.setState({
      loading:true
    })
    const result = await reqCategories(parentId);
    this.setState({
      loading:false
    })
    return result;
  }
  state = {
    categories:[],
    showAddCategory: false,
    showUpdateCategory:false,
    isShowSubCategory:false,
    subCategories:[],
    loading:false
  }
  category = {};
  toggleShowAddCategory = (key,value) => {
    return () => {
      this.setState({
        [key]:value
      })
    }
  }
  toAddCategory = () => {
    this.setState({
      showAddCategory:true
    })
  }
  // cancelAddCategory = () => {
  //   this.setState({
  //     showAddCategory:false
  //   })
  // }
  addCategory = () => {
    const {form} = this.addCategoryForm.props;
    form.validateFields(async (err,values) => {
      if(!err) {
        const { parentId,categoryName } = values;
        const result = await reqAddCategory(parentId,categoryName);
        // this.setState({
        //   loading:false
        // })
        if(result) {
          const updateContent = {
            showAddCategory: false
          }
          message.success('添加分类成功',2);
          form.resetFields(['parentId','categoryName']);
          if(result.data.parentId === '0'){
            updateContent.categories = [...this.state.categories,result.data];
          }else if(this.state.isShowSubCategory && result.data.parentId === this.parentCategory._id ){
            updateContent.subCategories = [...this.state.subCategories,result.data];
          }
          this.setState(updateContent);
        }
      }
    })
  }
  toUpdateCategoryName = (text) => {
    return () => {
      this.category = text
      this.setState({
        showUpdateCategory:true,
      })
    }
  }
  updateCategoryName = () => {
    const { form } = this.updateCategory.props;
    form.validateFields(async (err,values) => {
      if(!err) {
        const result = await reqUpdateCategory(this.category._id,values.categoryName);
        if(result){
          let stateName = 'categories';
          if(this.category.parentId !== '0') {
            stateName = 'subCategories';
          }
          const categories = this.state[stateName].map((item) => {
            if(item._id === this.category._id) {
              return {
                name: values.categoryName,
                _id:item._id,
                parentId:item.parentId
              }
            }
            return item;
          })
          form.resetFields(['categoryName']);
          console.log(stateName);
          message.success('更新分类名称成功~', 2);
          this.setState({
            showUpdateCategory: false,
            [stateName]:categories
          })
        }
      }
    })
  }
  cancelUpdateCategory = () => {
    this.setState({
      showUpdateCategory:false
    });
    const { form } = this.updateCategory.props;
    form.resetFields(['categoryName']);
  }
  showSubCategory =  (text) => {
    return async () => {
      this.parentCategory = text;
      const result = await this.fetchRequest(text._id);
      this.setState({
        subCategories:result.data,
        isShowSubCategory:true
      })
    }
  }
  render() {
    const { isShowSubCategory,categories,subCategories,loading } = this.state
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
        key:'name'
      },
      {
        title: '操作',
        // dataIndex: 'money',
        key:'money',
        className:'category-operation',
        render: text => {
          return isShowSubCategory?
          <div>
            <Mybutton onClick={this.toUpdateCategoryName(text)}>修改名称</Mybutton>
          </div>
            :
          <div>
            <Mybutton onClick={this.toUpdateCategoryName(text)}>修改名称</Mybutton>
            <Mybutton onClick={this.showSubCategory(text)}>查看其子类</Mybutton>
          </div>
        }
      },
    ];
    return (
      <Card title={ isShowSubCategory? <div><Mybutton onClick={this.toggleShowAddCategory('isShowSubCategory',false)}>一级分类</Mybutton><Icon type="arrow-right"/>&nbsp;手机</div>:"一级分类列表" } extra={<Button type="primary" onClick={this.toggleShowAddCategory('showAddCategory',true)}><Icon type="plus"></Icon>添加品类</Button>} style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={isShowSubCategory?subCategories:categories}
          bordered
          pagination={{
            showSizeChanger:true,
            pageSizeOptions:['3', '6' , '9' , '12'],
            defaultPageSize:3,
            showQuickJumper:true,
          }}
          rowKey= "_id"
          loading={loading}
        />
        <Modal
          visible={this.state.showAddCategory}
          title="添加分类"
          onOk={this.addCategory}
          onCancel={this.toggleShowAddCategory('showAddCategory',false)}
          okText="确定"
          cancelText="取消"
        >
          <AddCategory categories={this.state.categories} wrappedComponentRef={(form) => this.addCategoryForm = form} />
        </Modal>
        <Modal
          visible={this.state.showUpdateCategory}
          title="修改名称"
          onOk={this.updateCategoryName}
          onCancel={this.cancelUpdateCategory}
          okText="确定"
          cancelText="取消"
        >
          <UpdateCategoryName categoryName ={this.category.name} wrappedComponentRef={(form) => this.updateCategory = form} />
        </Modal>
      </Card>
      );
  }
}