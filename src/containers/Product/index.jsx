import React, { Component ,Fragment} from 'react'
import {connect} from 'react-redux'
import {productActions} from '../../redux/actions/product'
import {reqProductList,reqUpdateStatus,reqProductListSearch} from '../../api'
import {PAGE_SIZE} from '../../config'
import {Card,Button,Icon, Select, Input ,Table, message} from 'antd'
const {Option} = Select


@connect(
   state=>({}),
   {
     saveProductList:productActions
   }
)
 class Product extends Component {
    state={
        productList:[],
        total:'',
        current:1,
        changeKey:"productName",
        inputVal:"",
        search:false,
        isLoading:true
    }
   componentDidMount(){
      this.getPoductList()
   }
   searchProduct=()=>{
      this.setState({
        search:true
      },()=>{
        this.getPoductList()
      }) 
   }
//    商品分页列表
   getPoductList = async(number=1) => {
      this.setState({
          isLoading:false
      }) 
     let result;
     if(this.state.search){
            result=await reqProductListSearch({
            pageNum:number,
            pageSize:PAGE_SIZE,
            [this.state.changeKey]:this.state.inputVal,
         })
     }else{
            result=await reqProductList({
            pageNum:number,
            pageSize:PAGE_SIZE
         })
     }
     const {list,msg,total,pageNum}=result.data;
     if(result.status===0){
         this.setState({
            productList:list,
            total,
            current:pageNum
         })
      //redux 存储列表
      this.props.saveProductList(list) 

     }else{
         message.warning(msg,1)
     }
   }
// 更新商品的状态
    productUpdate=async(data)=>{
        // 重点  b[a1] 不能被解析[object Object]  =789  key相同会直接覆盖之前的key和值
        // var a1={a:1,b:2}
        // var a2={a:1,b:2}
        // var a3={a:1,b:2}

        // var b={}
        
        // b[a1]="123"
        // b[a2]="456"
        // b[a3]="789"
        let status;
        if(data.status===1)status=2;
        if(data.status===2)status=1;
        let result=await reqUpdateStatus({
            productId:data._id,
            status:status
         })
         if(result.status===0){
             message.success("修改商品状态成功！")
             let  productList=[...this.state.productList] 

             productList=productList.filter((item)=>{
                if(item._id===data._id){
                    item.status=status;
                }
                return item;
             })
             this.setState({
                productList
             })
            //  this.getPoductList(this.state.current)
         }else{
             message.warning(result.msg,1)
         }
    }
    render() {
          const dataSource = this.state.productList
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              width:"19%",
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              width:"10%",
              render:(price)=>{
                  return "￥"+price
              }
            },
            {
              title: '状态',
            //   dataIndex: 'status',
              key: 'status',
              width:"10%",
              align:"center",
              render:(data)=>{
                return (
                    <>
                            { data.status===1? 
                              <Button type='danger' onClick={()=>this.productUpdate(data)}>下架</Button>:
                              <Button type='primary'onClick={()=>this.productUpdate(data)}>上架</Button>
                            }
                           <span>{data.status===1?'在售':data.status===2?"已停售":''}</span>
                    </>
                )
              }
            },
            {
                title: '操作',
                align:"center",
                width:"10%",
                render:(data)=>{
                  return (
                      <>
                          <Button type='link' onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${data._id}`)}}>详情</Button> <br />
                          <Button type='link' onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${data._id}`)}}>修改</Button>
                      </>
                  )
                }
              },
          ];
        return (
            <Fragment>
              <Card 
                    title={
                         <div>
                            <Select defaultValue='productName' onChange={(e)=>{this.setState({changeKey:e})}}>
                                <Option value="productName">按名称搜索</Option>
                                <Option value="productDesc">按描述搜索</Option>
                            </Select>
                            <Input
                               allowClear={true}
                               placeholder='请输入搜索关键词'
                               onChange={(e)=>{this.setState({inputVal:e.target.value})}}
                               style={{width:"30%",margin:"0 0 0 5px"}}
                             >
                             </Input>
                             <Button onClick={this.searchProduct} type="primary"><Icon type='search'></Icon>搜索</Button>
                         </div>
                       
                    }
                    extra={<Button type='primary' onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update`)}}><Icon type='plus'/>添加</Button>}
                >
                <Table 
                    dataSource={dataSource} 
                    columns={columns}
                    bordered
                    rowKey="_id"
                    loading={this.state.isLoading}
                    pagination={{
                        total:this.state.total,
                        pageSize:PAGE_SIZE,
                        current:this.state.current,
                        onChange:this.getPoductList
                    }}
                 />;
                </Card> 
            </Fragment>
        )
    }
}

export default Product