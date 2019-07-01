import React, { Component } from 'react';
import { Card, Button, Table, Modal,message } from 'antd';
import dayjs from "dayjs";
import { reqGetUsers,reqAddUser,reqDeleteUser,reqUpdateUser } from '../../api';
import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../../components/my-button';

export default class User extends Component {
  state = {
    users: [
      // {
      //   __v: 0,
      //   _id: "5c7dafe855fb843490b93a49",
      //   create_time: 1551740904866,
      //   email: "aaa@aaa.com",
      //   phone: "123456789",
      //   role_id: "5c7d222c12d5e51908cc0380",
      //   username: "aaa"
      // }
    ], //用户数组
    roles:[],
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  async componentDidMount() {
    const result = await reqGetUsers();
    this.setState({
      users:result.data.users,
      roles:result.data.roles
    })
  }

  //创建用户的回调函数
  addUser = () => {
    const { form } = this.addUserForm.props;
    form.validateFields(async (err,values) => {
      if(!err) {
        const { username,password,email,phone,role_id } = values;
        const result = await reqAddUser({username,password,email,phone,role_id});
        if(result) {
          message.success('创建用户成功');
          form.resetFields();
          this.setState({
            users:[...this.state.users,result.data],
            isShowAddUserModal:false
          })
        }
      }
    }) 
  };
  updateUser = () => {
    const { form } = this.updateUserForm.props;
    form.validateFields(async (err,values) => {
      if(!err) {
        const { username,phone,email,role } = values;
        const result = await reqUpdateUser({username,phone,email,role,_id:this.user._id});
        console.log(result);
        if(result) {
          message.success('修改用户信息成功');
          this.setState({
            isShowUpdateUserModal:false,
            users: this.state.users.map((user) => user._id !== this.user._id ? user:result.data)
          })
        } else {
          message.error('修改用户信息失败');
        }
      }
    })
  }
  showUpdateUser = (user) => {
    return () => {
      this.user = user;
      this.setState({
        isShowUpdateUserModal:true
      })
    }
  };
  deleteUser = (userId) => async () => {
    console.log(userId);
    const result = await reqDeleteUser(userId);
    if(result) {
      message.success('删除用户成功');
      this.setState({
        users:this.state.users.filter((user) => user._id!==userId)
      })
    }
  }
  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  };
  
  render () {
    const {users, isShowAddUserModal, isShowUpdateUserModal} = this.state;

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(role_id) => this.state.roles.find((item) => item._id ===role_id).name
      },
      {
        title: '操作',
        render: user => {
          return <div>
            <MyButton name='修改' onClick={this.showUpdateUser(user)}>修改</MyButton>
            <MyButton name='删除' onClick={this.deleteUser(user._id)}>删除</MyButton>
          </div>
        }
      }
    ];
    
    return (
      <Card
        title={
          <Button type='primary' onClick={this.toggleDisplay('isShowAddUserModal', true)}>创建用户</Button>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />
  
        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.toggleDisplay('isShowAddUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm wrappedComponentRef={(form) => this.addUserForm = form} roles={this.state.roles}/>
        </Modal>
  
        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.toggleDisplay('isShowUpdateUserModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm wrappedComponentRef={(form) => this.updateUserForm = form} user = {this.user} roles={this.state.roles}/>
        </Modal>
        
      </Card>
    )
  }
}
