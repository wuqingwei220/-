import React, { Component } from 'react'
import {getCategory,reqModifyCategory} from '../../api'
import { Card ,Button,Icon,Table,Modal, message,Input } from 'antd';
const { confirm } = Modal;
export default class Catgegory extends Component {
    state={
        dataSourceCategory:[],
       
    }
    catgegoryVal=(e)=>{
        this.getcatgeoryVal=e.target.value;
    }
    categoryModifyshowModal=(data)=>{
        console.log(data)
        let that=this;
        confirm({
          title: '确定要修改分类名称吗?',
          content: <Input value={data.name} onChange={this.catgegoryVal}  placeholder='请输入修改分类的名称'></Input>,
          cancelText:"取消",
          okText:"确定",
          onOk() {
            let params={categoryId:data._id,categoryName:that.getcatgeoryVal}
            reqModifyCategory(params).then((item)=>{
                const {msg,status}=item;
                if(status===0){
                    message.success("修改分类成功！",1)
                }else{
                    message.error(msg,1)
                }
            })
              console.log(111,that.getcatgeoryVal)
          },
          onCancel() {},
        });
      }
    
    
    
 
    // 获取分类
    getCategory= async()=>{
       let result=await getCategory()
       const {status,msg,data}=result;
        if(status===0)  this.setState({dataSourceCategory:data})
        else message.error(msg,1)
    }
 
    componentDidMount(){
        // 获取分类列表
        this.getCategory()
    }
    render() {
          const {dataSourceCategory}=this.state;
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
              render:(a)=>{return <Button type='link' onClick={()=>{this.categoryModifyshowModal(a)}}>修改分类</Button>}
            },
          ];
          
        return (
            <div>
                  <Card  extra={<Button type='primary'><Icon type="plus" />添加</Button>}>
                      <Table
                       bordered={true}
                       dataSource={dataSourceCategory}
                       columns={columns} 
                       rowKey='_id'
                       pagination={{defaultPageSize:5}}/>;
                  </Card>
            </div>
        )
    }
}
