import React, { Component } from 'react';
import { Card, Button, Table, Radio, Modal,message } from 'antd';
import dayjs from 'dayjs';
import { reqRoles,reqAddRole,reqUpdateRole } from '../../api';
import AddRoleForm from './add-role-form';
import UpdateRoleForm from './update-role-form';
import { getItem } from '../../utils/localstorage.tools';
const RadioGroup = Radio.Group;

export default class Role extends Component {
  state = {
    value: '',  //单选的默认值，也就是选中的某个角色的id值
    roles: [
      // {
      //   "menus": [
      //     "/home",
      //     "/products",
      //     "/category",
      //     "/product",
      //     "/user",
      //     "/role"
      //   ],
      //   "_id": "5d0bb993f8ca7308982fe8ab",
      //   "name": "manager",
      //   "create_time": 1561049491919,
      //   "__v": 0,
      //   "auth_time": 1561049701194,
      //   "auth_name": "admin"
      // }
    ], //权限数组
    isShowAddRoleModal: false, //是否展示创建角色的标识
    isShowUpdateRoleModal: false, //是否展示设置角色的标识
    isDisabled: true
  };
  
  onRadioChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  };

  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  };
  
  //请求角色列表信息
  async componentDidMount() {
    const result = await reqRoles();
    this.setState({
      roles:result.data
    });
  }
  


  //创建角色的回调函数
  addRole = () => {
    const { form } = this.addRoleForm.props;
    form.validateFields(async (err,values) => {
      if(!err) {
        const { name } = values;
        const result = await reqAddRole(name);
        // console.log(result);
        if(result) {
          this.setState({
            roles: [...this.state.roles,result.data],
            isShowAddRoleModal: false
          })
        }
      }
    })
  };
  //设置角色权限的回调函数
  updateRole = async () => {
    const menus = this.updateRoleForm.state.checkedKeys;
    const _id = this.state.value;
    const auth_name = getItem().username;
    const result = await reqUpdateRole({menus,_id,auth_name});
    if(result) {
      message.success('设置权限成功');
      console.log(result);
      this.updateRoleForm.props.form.resetFields();
      this.setState({
        isShowUpdateRoleModal: false,
        roles:this.state.roles.map((role) => {
          if(role._id = _id){
            return result.data;
          }
          return role;
        })
      })
    }
  };
  
  render () {
    const { roles, value, isDisabled, isShowAddRoleModal, isShowUpdateRoleModal } = this.state;
    const role = roles.find((item) => item._id ===value);
    const columns = [
      {
          dataIndex: '_id',
          render: id => <Radio value={id} />
      },
      {
          title: '角色名称',
          dataIndex: 'name',
      },
      {
          title: '创建时间',
          dataIndex: 'create_time',
          render:create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
          title: '授权时间',
          dataIndex: 'auth_time',
          render:auth_time => dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
          title: '授权人',
          dataIndex: 'auth_name',
      }
    ];
    
    return (
      <Card
        title={
          <div>
            <Button type='primary' onClick={this.toggleDisplay('isShowAddRoleModal', true)}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={isDisabled} onClick={this.toggleDisplay('isShowUpdateRoleModal', true)}>设置角色权限</Button>
          </div>
        }
      >
        <RadioGroup onChange={this.onRadioChange} value={value} style={{width: '100%'}}>
          <Table
            columns={columns}
            dataSource={roles}
            bordered
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '15', '20'],
              showQuickJumper: true,
            }}
            rowKey='_id'
          />
        </RadioGroup>
  
        <Modal
          title="创建角色"
          visible={isShowAddRoleModal}
          onOk={this.addRole}
          onCancel={this.toggleDisplay('isShowAddRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddRoleForm wrappedComponentRef={(form) => this.addRoleForm = form}/>
        </Modal>
  
        <Modal
          title="设置角色权限"
          visible={isShowUpdateRoleModal}
          onOk={this.updateRole}
          onCancel={this.toggleDisplay('isShowUpdateRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateRoleForm wrappedComponentRef={(form) => this.updateRoleForm = form} name={role?role.name:''}/>
        </Modal>
        
      </Card>
    )
  }
}
