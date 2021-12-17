import React, { Component } from 'react'
import {connect} from 'react-redux'
import {cateGory} from '../../redux/actions/category'
import {getCategory,reqModifyCategory,reqAddCategory} from '../../api'
import { Card ,Button,Icon,Table,Modal, message,Input,Form } from 'antd';
@connect(
  state=>({}),
  {
    categoryList:cateGory
  }
)
@Form.create()
class Catgegory extends Component {
    state={
        dataSourceCategory:[],
        isLoading:true,
        visible: false,
        operType:'',
        saveCategory:{},
        categoryInputVal:''
    }
    componentDidMount(){
      // 获取分类列表
      this.getCategory()
   }
    // 获取分类
    getCategory= async()=>{
       let result=await getCategory()
       this.setState({
         isLoading:false
       })
       const {status,msg,data}=result;
        if(status===0) {
          this.setState({dataSourceCategory:data.reverse()})
          this.props.categoryList(data.reverse())
        } 
        else message.error(msg,1)
    }
    //  添加分类和修改弹窗
    showModal = ({data,title}) => {
      // 这里面注意，不能直接修改state的对象和数组的值  因为指向的还是当前的satet  得重新创建个对象或数组在赋值
      this.setState({
        visible: true,
        operType:title,
        saveCategory:data,
        categoryInputVal:data.name
      });
    };
    // 添加分类
    toAdd =async (values) => {
      let result=await reqAddCategory(values)
      const {status , msg , data} =result;
      if(status===0){
         message.success("添加分类成功！",1)
         const {dataSourceCategory}=this.state;
         this.setState({
          dataSourceCategory:[data,...dataSourceCategory]
         })
         this.setState({
           visible: false,
         });
         this.props.form.resetFields()
      }else{
         message.warning(msg,1)
      }
    }
    // 更新分类
    update=async(values,data)=>{
      let result=await reqModifyCategory({categoryId:data._id,categoryName:values.categoryName})
      const {status , msg } =result;
      if(status===0){
         message.success("添加分类成功！",1)
        //  重新获取分类列表
         this.getCategory()
         this.setState({
           visible: false
         });
         this.props.form.resetFields()
      }else{
         message.warning(msg,1)
      }
    }
    handleOk = e => {
      const {operType,saveCategory}=this.state;
      this.props.form.validateFields((err, values) => {
        if (err) {
           message.err("表单验证失败，请检查！")
           return ;
        }
        if(operType==="add") this.toAdd(values)
        if(operType==="update") this.update(values,saveCategory)
      });
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      });
      this.props.form.resetFields()
    };
 
    render() {
          const {dataSourceCategory,categoryInputVal,operType,visible,isLoading}=this.state;
          const {getFieldDecorator} =this.props.form

          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key:'name',
            },
            {
              title: '操作',
            //   不传的时候，render的参数就是整个对象
            //   dataIndex: '_id', 
              width:'25%',
              align:"center",
              render:(data)=>{return <Button type='link' onClick={()=>{this.showModal({data,title:'update'})}}>修改分类</Button>}
            },
          ];
          
        return (
            <div>
                  <Card  extra={<Button type='primary'  onClick={()=>this.showModal({data:'',title:'add'})}><Icon type="plus"/>添加</Button>}>
                      <Table
                       bordered={true}
                       dataSource={dataSourceCategory}
                       columns={columns} 
                       rowKey='_id'
                       loading={isLoading}
                       pagination={{defaultPageSize:5}}/>;
                  </Card>
                  {/* 添加和修改弹窗 */}
                  <Modal
                    title={operType==='add'?"添加分类":"修改分类"}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                  >
                     <Form>
                        <Form.Item>
                          {getFieldDecorator('categoryName', {
                            initialValue:operType==="update"?categoryInputVal:'',
                            rules: [{ required: true, message: '请输入分类的名称!' }],
                          })(
                            <Input
                              placeholder="请输入分类的名称"
                            />,
                          )}
                        </Form.Item>
                      </Form>  
                  </Modal>
            </div>
        )
    }
}
export default Catgegory;