import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCategory,reqProductAdd,reqUpdateProduct,reqProductInfo} from '../../api'
import Upload from '../../components/Upload'
import Text from '../../components/Text'
import { Button ,Card,Icon,Form ,Input,Select, message} from 'antd'
const {Item} =Form
const {Option} =Select
@connect(
    state=>({cateList:state.categoryList,productList:state.productList}),
    {}
)
@Form.create()
 class AddUpdate extends Component {
    state={
        cateList:[],
        categoryId:'',
        name:'',
        desc:'' ,
        price:'',
        detail:'',
        imgs:[],
        isTitle:"add"
    } 
    // 获取分类信息
    xhrGetCateGory = async() => {
        let result = await getCategory()
        const {data,status} =result;
        if(status===0) this.setState({cateList:data})
        else message.warning("获取分类数据失败！")
    }
    // 提交表单
    handleSubmit= (e)=>{
        e.preventDefault();
        this.props.form.validateFields(async(err,values)=>{
            if(err)message.error("表单验证失败，请检查!")
            else{
                let  imgs= this.refs.name.getPicName()
                let  detail=this.refs.textEditor.getText()
                const {_id}=this.state;
                let result;
                // 判断是修改还是新增
                const {id}=this.props.match.params;
                if(id){
                    result=await reqUpdateProduct({...values,imgs,detail,_id})
                }else{
                    result =await reqProductAdd({...values,imgs,detail})
                }
                const {status}=result;
                if(status===0){
                    message.success("操作成功",1)
                    this.props.history.replace("/admin/prod_about/product")
                }else{
                    message.error("操作失败！",1)
                }
            }
            
        })
    }
    // 获取商品接口
    xhrEditProduct=async(id)=>{
       let result = await reqProductInfo({productId:id})
       
       const {status,data} =result;
       if(status===0){
           this.setState({
               ...data
           })
           this.refs.name.setUpdateList(data.imgs)
           this.refs.textEditor.setText(data.detail)
       }else{
           message.error("接口错误",1)
       }

    }
    componentDidMount(){
        const {cateList,productList}=this.props;
        const {id}=this.props.match.params;
        if(cateList.length) this.setState({cateList})
        else this.xhrGetCateGory()
        
        // 判断新增还是修改
        if(id){
           if(productList.length){
              let result= productList.find((item)=>{
                   return item._id===id
               })
               this.setState({...result,isTitle:"update"})
               this.refs.name.setUpdateList(result.imgs)
               this.refs.textEditor.setText(result.detail)
           }else{
               this.xhrEditProduct(id)  
           }
        }
    }
    render() {
        const title=(
                <div>
                   <Button type='link'onClick={()=>this.props.history.back()}><Icon type="arrow-left" />
                      {this.state.isTitle==="update"?"修改商品":"添加商品"} 
                   </Button>
                </div>
            )
        const formItemLayout = {
                labelCol: {
                    span: 2
                },
                wrapperCol: {
                    span:10
              }
            };
        const {getFieldDecorator}=this.props.form;
        const {name,desc,price,categoryId} =this.state;
        return (
            <div>
                <Card title={title}>
                  <Form onSubmit={this.handleSubmit} {...formItemLayout} >
                        <Item label="商品名称">
                            {getFieldDecorator('name', {
                                rules: [
                                {
                                    required: true,
                                    message: '请输入商品名称!',
                                },
                                ],
                                initialValue:name || ''
                            })(<Input placeholder='请输入商品名称'/>)}
                        </Item>
                        <Item label="商品描述">
                            {getFieldDecorator('desc', {
                                rules: [
                                {
                                    required: true,
                                    message: '请输入商品描述!',
                                }
                                ],
                                initialValue:desc || ''
                            })(<Input placeholder='请输入商品描述'/>)}
                        </Item>
                        <Item label="商品价格">
                            {getFieldDecorator('price', {
                                rules: [
                                {
                                    required: true,
                                    message: '请输入商品价格!',
                                }
                                ],
                                initialValue:price || ''
                            })
                            (<Input prefix="￥" type='number' addonAfter="元"  placeholder='请输入商品价格'/>)}
                        </Item>
                        <Item label="商品分类">
                            {getFieldDecorator('categoryId', {
                                rules: [
                                {
                                    required: true,
                                    message: '请选择商品分类!',
                                }
                                ],
                                initialValue:categoryId || ''
                            })
                            (
                                <Select>
                                    <Option value="">请选择分类</Option>
                                    {
                                        this.state.cateList.map((item)=>{
                                            return <Option key={item._id} value={item._id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </Item>
                        <Item label="商品图片"  wrapperCol={{span:16}}>
                           <Upload ref="name"></Upload>
                        </Item>
                        <Item label="商品详情" wrapperCol={{span:16}}>
                           <Text ref="textEditor"/>
                        </Item>
                        {/* htmlType='submit' 关联表单提交的 */}
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default AddUpdate