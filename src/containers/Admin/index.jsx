import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect,Route,Switch} from 'react-router-dom'

import { deleteUserInfo } from '../../redux/actions/login'
import {userList} from '../../api/index'
import  AdminHeader  from './header/Header';
import './index.less'
// 组件的引入
import  Home from '../../components/Home'
import  Nav  from './left_nav'
import  Catgegory from '../Catgegory'
import  Product  from '../Product'
import  User  from '../User'
import  Role  from '../Role'
import  Bar  from '../Bar'
import  Line  from '../Line'
import  Pie  from '../Pie'

import { Layout} from 'antd';
const { Header, Content ,Footer} = Layout;


@connect(
    state=>({user:state.saveUserInfo}),
    {
        deleteUserInfo
    }
)
 class Admin extends Component {
     componentDidMount(){
         console.log(this.props)
     }
     logout = () => {
        //  store的状态改变也会触发render的调用
         this.props.deleteUserInfo()
     }
     getUserList = async() => {
         let userInfo=await userList();

         console.log(userInfo)
     }

    render() {
        const {islogin} =this.props.user;
        if(!islogin){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <Layout className='layout'>
                <Nav/>
                <Layout>
                <Header style={{ background: '#fff', padding: 0 ,height:"80px"}}>
                    <AdminHeader></AdminHeader>
                </Header>
                <Content
                    style={{
                    margin: "20px 20px 0",
                    background: '#fff',
                    }}
                >
                    <Switch>
                        <Route path="/admin/home" component={Home}></Route>
                        <Route path="/admin/prod_about/category" component={Catgegory}></Route>
                        <Route path="/admin/prod_about/product" component={Product}></Route>
                        <Route path="/admin/user" component={User}></Route>
                        <Route path="/admin/role" component={Role}></Route>
                        <Route path="/admin/charts/bar" component={Bar}></Route>
                        <Route path="/admin/charts/line" component={Line}></Route>
                        <Route path="/admin/charts/pie" component={Pie}></Route> 
                        <Redirect to="/admin/home"></Redirect>
                    </Switch>
                 </Content>
                 <Footer className='footer'>
                      谷歌浏览器打开预览，效果更好!
                      <button onClick={this.getUserList}>获取用户列表</button>
                 </Footer>
                </Layout>
            </Layout>
          
        )
    }
}

export default Admin;
// export default connect(
//     state=>({user:state.saveUserInfo}),
//     {
//         deleteUserInfo
//     }
// )(Admin)