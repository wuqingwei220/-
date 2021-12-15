import React, { Component } from 'react'
import navLogo from '../../../static/images/logo.png'
import {connect} from 'react-redux'
import './index.less'
import {Link,withRouter} from 'react-router-dom'
import memulist from '../../../config/menuConfig'
import { Menu, Icon,Layout,Button } from 'antd';
import {addHeader} from '../../../redux/actions/header'
const { SubMenu,Item} = Menu;
const {Sider} = Layout;
@connect(
  state=>({}),
  {
    addHeader
  }
)
@withRouter
 class Nav extends Component {
   //  新的
   state = {
    collapsed: false,
    statusKey:''
   };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    },()=>{
     if(this.state.collapsed){
        this.h1.style.display="none"
     }else{
        this.h1.style.display="block"
     }
    });
  };
  // 获取标题
  getTitle=(item)=>{
    return ()=>{
      this.props.addHeader({routerKey:item})  
    }
  }
//  递归生成菜单
  memulist=(traget)=>{
   return traget.map((item)=>{
      if(!item.children){
          return (
            <Item key={item.key}  onClick={this.getTitle(item.title)}>
                <Link to={item.path}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                </Link>
            </Item>
          )
      }else{
          return( 
            <SubMenu
                key={item.key}
                title={
                <span>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </span>
                }
            >
                {
                    this.memulist(item.children)
                   
                }
             </SubMenu>
          ) 
      }
    })
  }
    render() {
     
        return (
             <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="logo" />
                    <header className='nav_header'>
                    <img src={navLogo} alt="navLogo" />
                    <h1 ref={(c)=>this.h1=c}>商品管理系统</h1>
                </header> 
                <div>
               <Button className="trigger"  onClick={this.toggle} type="primary" style={{ marginBottom: 16 }}>
                 <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
               </Button>
                </div>
                <Menu
                    defaultSelectedKeys={this.props.location.pathname.split("/").reverse()[0]}
                    defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
                    mode="inline"
                    theme="dark"
                   
                    >
                    {
                        this.memulist(memulist)
                    }

                      
                    </Menu>
                </Sider>
        )
    }
}
export default Nav;