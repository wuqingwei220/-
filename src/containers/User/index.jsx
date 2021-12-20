import React, { Component } from 'react'
import moment from 'moment'
import {reqUserList,reqUserAdd,reqUserUpdate,reqUserDelete} from '../../api'
import {Button, Card,Icon,Table,Modal,Input,message,Form,Select } from 'antd'
const {Option} =Select
const {confirm} =Modal
@Form.create()
class Role extends Component {
    state = {
         visible: false,
         userList:[],
         roleList:[],
         title:"add",
        //  修改用户
         username:"",
         password:"",
         phone:"",
         email:'',
         role_id:"",
         _id:''
    };
    // 添加用户-修改用户
    userAdd_update=()=>{
        this.props.form.validateFields(async(err, values) => {
            console.log(values);
            if (err) message.error("校验表单失败请检查",1)
            else{
                let result; 
                const {username,password,phone,email,role_id}=values;
                const {_id}=this.state;
                if(this.state.title==="add"){
                    result = await reqUserAdd({username,phone,email,role_id,password})
                }else{
                    result = await reqUserUpdate({username,phone,email,role_id,_id})
                } 
                const {status,data} =result ;
                if(status===0){
                    message.success("操作成功 ",1)
                    if(this.state.title==="add"){
                        this.setState({
                            userList:[data,...this.state.userList]
                        });
                    }else{
                        this.getUserList()
                    }
                    this.setState({
                        visible: false,
                    })
                    this.props.form.resetFields()
                }else{
                    message.error("操作失败",1)
                }
            }
          });
    }
    // 获取用户列表
    getUserList= async()=>{
      let result = await reqUserList()
      const {status,data} =result ;
      if(status===0){
        this.setState({
            userList:data.users.reverse(),
            roleList:data.roles
        })
      }else{
          message.error("获取用户列表失败！",1)
      }
    }
    // 删除用户列表
    userDelete=(items)=>{
         confirm({
            title: '确定要删除此用户吗？',
            cancelText:"取消",
            okText:"确定",
            onOk:async()=>{
                let result = await reqUserDelete({userId:items._id})
                const {status} =result;
                if(status===0){
                    message.success("删除用户成功",1)
                    this.getUserList()
                }else{
                    message.error("删除列表失败",1)
                }
            }
        });
      
    }
    changePage=(page)=>{
      this.getUserList(page)
    }
    componentDidMount(){
        this.getUserList()
    }
    showModal = (type,data) => {
      this.setState({
        visible: true,
        title:type,
        ...data
      });
    };
    handleOk = e => {
       this.userAdd_update()
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };

    render() {
        const {getFieldDecorator} =this.props.form;
        const dataSource = this.state.userList;
        const {username,password,phone,email,role_id}=this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                key: 'role_id',
                render:(data)=>{
                   const HtmlData=this.state.roleList.find((item)=>{
                        return item._id===data
                    })
                   return <span>{HtmlData.name}</span>
                }
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(time)=>{
                    return time?<span>{moment(time).format('YYYY-MM-DD  h:mm:ss')}</span>:''
                  }
            },
            {
                title: '操作',
                render:(data)=>{
                    return(
                        <div>
                            <Button type='link' onClick={()=>this.showModal("update",data)}>修改</Button>
                            <Button type='link' onClick={()=>this.userDelete(data)}>删除</Button>
                        </div>
                    )
                }
            }
          ];
        return (
            <Card title={
                <Button type="primary" onClick={()=>this.showModal("add")}>
                    <Icon type="plus"></Icon>新增用户
                </Button>
            }>
            <Table 
               rowKey="_id"
               dataSource={dataSource}
               columns={columns}
               bordered
            //    pagination={{total:this.state.total,pageSize:PAGE_SIZE,onChange:this.changePage}}
            />;
            <Modal
                    title={this.state.title==="add"?"添加用户":"修改用户"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确认"
                >
                 <Form labelCol={{span:4}} wrapperCol={{span:20}}  onSubmit={this.handleSubmit}>
                        <Form.Item label="用户名:">
                        {getFieldDecorator('username', {
                            initialValue:username?username:"",
                            rules: [
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                            ],
                        })(<Input  placeholder='请输入用户名' />)}
                        </Form.Item> 
                        <Form.Item label="密码:" style={{display:this.state.title==="add"?"block":"none"}}>
                        {getFieldDecorator('password', {
                            initialValue:password?password:"",
                            rules: [
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                            ],
                        })(<Input  placeholder='请输入密码' />)}
                        </Form.Item> 
                        <Form.Item label="手机号:">
                        {getFieldDecorator('phone', {
                            initialValue:phone?phone:"",
                            rules: [
                            {
                                required: true,
                                message: '手机号不能为空',
                            },
                            ],
                        })(<Input  placeholder='请输入手机号' />)}
                        </Form.Item> 
                        <Form.Item label="邮箱:">
                        {getFieldDecorator('email', {
                            initialValue:email?email:"",
                            rules: [
                            {
                                required: true,
                                message: '邮箱不能为空',
                            },
                            ],
                        })(<Input  placeholder='请输入邮箱' />)}
                        </Form.Item> 
                        <Form.Item label="角色：">
                        {getFieldDecorator('role_id', {
                            initialValue:role_id?role_id:"",
                            rules: [
                            {
                                required: true,
                                message: '请选择角色',
                            },
                            ],
                        })(
                            <Select>
                                <Option value="">
                                    请选择一个角色
                                </Option>
                                {
                                    this.state.roleList.map((item)=>{
                                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                        </Form.Item> 
                    </Form>    
            </Modal>
          </Card>
        )
    }
}
export default Role