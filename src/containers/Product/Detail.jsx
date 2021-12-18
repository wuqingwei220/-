import React, { Component } from 'react'
import {connect} from 'react-redux'
import { reqProductInfo ,reqProductCategory} from '../../api/index'
import './css/detail.less'
import { Button ,Card, Icon, List,message} from 'antd'
import {BASE_URL} from '../../config'
const {Item}=List;
@connect(
    state=>{
        return {
            getReduxProdList:state.productList,
            getCateGoryList:state.categoryList
        }
    },
 )
class Detail extends Component {
    state={
        productInfo:{},
        cateGoryList:'',
        categoryId:'',
        isLoading:true,
     }
    //请求获取商品的详情信息
    xhrGetProductList=async()=>{
        let result = await reqProductInfo({productId:this.props.match.params.id})
        const {status,data}=result;
        if(status===0){
            this.setState({
                productInfo:data,
                categoryId:data.categoryId,
                isLoading:false
            },()=>this.getCateGoryList())
        }
        else  message.error("获取商品信息失败!",1)
    }
    getProductInfo=async()=>{
        const {getReduxProdList} =this.props; 
        // find 是返回一个满足条件对象  ====   filter 返回是个新的数组  map 返回新数组 主要是返回修改过后的数组 所有的
        if(getReduxProdList.length>0){
            let  screenData=getReduxProdList.find((item)=>item._id===this.props.match.params.id) 
            this.setState({
                productInfo:screenData,
                categoryId:screenData.categoryId,
                isLoading:false
            },()=>this.getCateGoryList())
         }
         else this.xhrGetProductList()
    }
    getCateGoryList=async()=>{
      if(this.props.getCateGoryList.length>0){
        let result= this.props.getCateGoryList.find((item)=>this.state.categoryId===item._id)
        this.setState({cateGoryList:result})
      }else{
        let result=await reqProductCategory({categoryId:this.state.categoryId})
        if(result.status===0) this.setState({cateGoryList:result.data})
        else message.error("获取商品分类信息失败!",1)
      }  
    }
    componentDidMount(){
        this.getProductInfo() 
    }
    render() {
        const {imgs,detail,desc,name,price}=this.state.productInfo;
        const {name:cateGoryName} =this.state.cateGoryList;
        // 渲染html
        const element=(<div className='desa' dangerouslySetInnerHTML = {{__html:detail}}></div>) 
        return (
            <div>
                <Card title={
                    <div>
                        <Button type='link' size='small' onClick={()=>this.props.history.go(-1)}>
                            <Icon type="arrow-left" />
                        </Button>
                        <span>商品详情</span>   
                    </div>
                }>
                <List loading={this.state.isLoading}>
                    <Item>
                       <span className='name'>商品名称：</span>
                       <span className='desa'>{cateGoryName}</span>
                    </Item>
                    <Item>
                       <span className='name'>商品描述：</span>
                       <span className='desa'>{desc}</span>
                    </Item>
                    <Item>
                       <span className='name'>商品价格：</span>
                       <span className='desa'>{"￥"+price}</span>
                    </Item>
                    <Item>
                       <span className='name'>所属分类：</span>
                       <span className='desa'>{name}</span>
                    </Item>
                    <Item>
                      <span className='name'>商品图片：</span>
                      {
                          imgs?
                          imgs.map((item)=>{
                              return <img style={{width:"200px"}} src={`${BASE_URL}/api/upload/${item}`} key={item} alt="icon" />
                          }):""
                      }
                    </Item>
                    <Item>
                      <span className='name'>商品详情：</span>
                      {element}
                     
                    </Item>
                </List> 
                </Card>
            </div>
        )
    }
}
export default  Detail