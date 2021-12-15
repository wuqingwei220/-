import React, { Component } from 'react'
import {Icon,Button,Modal} from 'antd'
import moment from 'moment'
import {withRouter} from 'react-router-dom'
// 展开全屏
import screenfull from 'screenfull'
import './css/header.less'
import store from '../../../redux/store'
import {getWeather} from '../../../api/index'
@withRouter
class Header extends Component {
  state={
    logoutVisible:false,
    dateTime:new Date(),
    statusIcon:false
  }
  logout = () => {
    this.setState({
      logoutVisible: true
    });  
  }
  handleOk = e => {
    this.props.logout()
    this.setState({
      logoutVisible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      logoutVisible: false,
    });
  };
  // 展开全屏
  screenFull = () => {
    screenfull.toggle()
  }
  componentDidMount(){
     this.timer=setInterval(()=>{
        this.setState({
          dateTime:new Date()
        })
     },1000)
    //  监听全屏状态
     screenfull.on("change",()=>{
       this.setState({
          statusIcon:!this.state.statusIcon
       })
     })
    //  获取天气预报
    this.getWeather()
   
  }
  // 获取天气预报
  getWeather=async()=>{
    let result=await getWeather()
    this.text_day=result.result.forecasts[0].text_day;
    this.wd_night=result.result.forecasts[0].wd_night;
    this.wc_night=result.result.forecasts[0].wc_night;
    console.log("天气预报",result)
  }
  componentWillUnmount(){
      clearInterval(this.timer)
  }
    render() {
      const {username}=store.getState().saveUserInfo.user
      const {statusIcon}=this.state;
      const {pathname} =this.props.location;
        return (
          <header>
               <div className='header-top'>
                 <Button size="small" onClick={this.screenFull}>
                    <Icon type={statusIcon?'fullscreen':'fullscreen-exit'} />
                 </Button>
                  <span className='welcome-user'>欢迎，{username}</span>
                  <Button type='link' onClick={this.logout}>退出登录</Button>
               </div>
               <div className='header-bottom'>
                   <div className='header-bottom-left'>
                       <span>{pathname}</span>
                   </div>
                   <div className='header-bottom-right'>
                       <span>{moment(this.state.dateTime).format("YYYY-MM-DD hh:mm:ss")}</span>&nbsp;&nbsp;
                       <span>{this.text_day}-{this.wd_night}-{this.wc_night}</span>
                       {/* <i className='iconfont icon-duoyun'></i> */}
                   </div>
               </div>

               {/* 弹窗组件 */}
               <Modal
                title="是否退出登录？"
                visible={this.state.logoutVisible}
                onOk={this.handleOk}
                cancelText="取消"
                okText="确认"
                onCancel={this.handleCancel}
              >
                <p>确认退出登录吗？</p>
              </Modal>
          </header>
        )
    }
}
export default Header;