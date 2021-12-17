import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCategory} from '../../api'
import { Button ,Card,Icon,Form ,Input,Select, message} from 'antd'
const {Item} =Form
const {Option} =Select
@connect(
    state=>({cateList:state.categoryList}),
    {}
)
@Form.create()
 class AddUpdate extends Component {
    state={
        cateList:[]
    } 
    // 获取分类信息
    xhrGetCateGory = async() => {
        let result = await getCategory()
        const {data,status} =result;
        if(status===0) this.setState({cateList:data})
        else message.warning("获取分类数据失败！")
    }
    // 提交表单
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(err)message.error("表单验证失败，请检查!")
        })
    }
    componentDidMount(){
        const {cateList}=this.props;
        if(cateList.length) this.setState({cateList})
        else this.xhrGetCateGory()
    }
    render() {
        const title=(
                <div>
                   <Button type='link'onClick={()=>this.props.history.back()}><Icon type="arrow-left" />商品添加</Button>
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
                                initialValue:""
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
                        <Item label="商品图片">
                           此处是商品图片
                        </Item>
                        <Item label="商品详情">
                           此处是富文本编辑器
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