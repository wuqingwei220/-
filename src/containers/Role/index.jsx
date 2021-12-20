import React, { Component } from 'react'
import moment from 'moment'
import {PAGE_SIZE} from '../../config'
import {connect} from 'react-redux'
import {reqRoleList,reqRoleAdd,reqRoleAuth} from '../../api'
import  menuList from '../../config/menuConfig'
import {Button, Card,Icon,Table,Modal,Input,message,Form,Tree } from 'antd'
const { TreeNode } = Tree;



@connect(
    state=>({user:state.saveUserInfo})
)
@Form.create()
class Role extends Component {
    state = {
         visible: false,
         roleList:[],
         total:'',
         jurisdictionVisible:false,
        // 树形菜单
        checkedKeys: [],
        authData:{}
    };
    // 新增角色
    roleAdd=()=>{
        this.props.form.validateFields(async(err, values) => {
            if (err) message.error("校验表单失败请检查",1)
            else{
                let result = await reqRoleAdd(values)
                const {status,data} =result ;
                if(status===0){
                    message.success("添加角色成功！ ",1)
                    this.setState({
                        visible: false,
                        roleList:[data,...this.state.roleList]
                    });
                    this.props.form.resetFields()
                }else{
                    message.error("获取角色列表失败！",1)
                }
            }
          });
       
    }
    // 获取角色列表
    getRoleList= async(pageNum=1)=>{
      let result = await reqRoleList({pageNum,pageSize:PAGE_SIZE})
      const {status,data} =result ;
      if(status===0){
        this.setState({
            roleList:data.list,
            total:data.total
        })
      }else{
          message.error("获取角色列表失败！",1)
      }
    }
    changePage=(page)=>{
      this.getRoleList(page)
    }
    componentDidMount(){
        this.getRoleList()
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      this.roleAdd()
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };
    // 树形菜单
    jurisdictionHandleOk=async()=>{
      const {_id}=this.state.authData;
      if(this.state.checkedKeys.length){
        let result = await reqRoleAuth({_id,auth_name:this.props.user.user.username,menus:this.state.checkedKeys})
        const {status,data}=result;
        if(status===0){
            message.success("分配角色成功！",1)
            this.setState({
                jurisdictionVisible:false
            })
            this.getRoleList()
        }else{
            message.error("分配角色失败！",1)
        }
      }else{
          message.warning("请选择权限",1)
      }
    }
    jurisdictionHandleCancel=()=>{
      this.setState({
        jurisdictionVisible: false
      });
    }
    jurisdiction=(data)=>{
      this.setState({
        checkedKeys:data.menus,
        jurisdictionVisible: true,
        authData:data
      });
    }
    //  收集数据
    onCheck = checkedKeys => {
        this.setState({ checkedKeys });
    };
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode key={item.key} {...item} />;
    });

    render() {
        const {getFieldDecorator} =this.props.form;
     
        const dataSource = this.state.roleList;
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render:(time)=>{
                  return <span>{moment(time).format('YYYY-MM-DD  h:mm:ss')}</span>
                }
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render:(time)=>{
                    return time?<span>{moment(time).format('YYYY-MM-DD  h:mm:ss')}</span>:''
                  }
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                key: 'auth_name',
            },
            {
                title: '操作',
                render:(data)=>{
                    return <Button onClick={()=>this.jurisdiction(data)} type='link'>设置权限</Button>
                }
            }
          ];
        return (
            <Card title={
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="plus"></Icon>新增角色
                </Button>
            }>
            <Table 
               rowKey="_id"
               dataSource={dataSource}
               columns={columns}
               bordered
               pagination={{total:this.state.total,pageSize:PAGE_SIZE,onChange:this.changePage}}
            />;
            <Modal
                title="新增角色"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确认"
                >
                 <Form  onSubmit={this.handleSubmit}>
                        <Form.Item>
                        {getFieldDecorator('roleName', {
                            rules: [
                            {
                                required: true,
                                message: '请输入角色名称',
                            },
                            ],
                        })(<Input  placeholder='请输入角色名称' />)}
                        </Form.Item> 
                    </Form>    
            </Modal>

            {/* 设置权限 */}

            <Modal
                title="权限设置"
                    visible={this.state.jurisdictionVisible}
                    onOk={this.jurisdictionHandleOk}
                    onCancel={this.jurisdictionHandleCancel}
                    cancelText="取消"
                    okText="确认"
                >
                 <Tree
                    checkable
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    defaultExpandAll={true} //默认展开的所有节点
                >
                <TreeNode title="平台权限" key="top">
                    {this.renderTreeNodes(menuList)}
                </TreeNode>    
                </Tree>
            </Modal>
          </Card>
        )
    }
}
export default Role