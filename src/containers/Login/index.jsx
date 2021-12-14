import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api' 
import {saveUserInfo} from '../../redux/actions/login'
import Logo from './images/logo.png'
import  './index.less'
const {Item} = Form;
@connect(
    state=>({user:state.saveUserInfo}),
    {
        saveUserInfo
    }
)
@Form.create()
 class Login extends Component {
    pwaValidator = (rules,value,callback) => {
        if(!value){
            callback("密码是必填的")
        }else if(value.length<4){
            callback("密码长度必须大于四位")
        }else if(value.length>12){
            callback("密码长度不能大于12位")
        }else{
            callback()
        }
    }
    // 高阶组件  是接收一个组件 返回一个新的组件   这个函数就是高阶组件
    handleSubmit=(e)=>{
        e.preventDefault();
        // post 的请求两种格式  from-data-json  urlencoded
        // axios的post的请求  默认把json的格式传给后台
        // 401  权限问题
        this.props.form.validateFields(async(err, values) => {
          if (!err) {
           let result=await reqLogin(values);
           const {status,msg,data:{token},data:{user}} = result;
           if(status===0){
               this.props.saveUserInfo({user,token})
               this.props.history.replace("/admin")
           }else{
               message.warning(msg)
           }
          }
        });
    }
    render() {
        const {getFieldDecorator}=this.props.form;
        const {islogin} =this.props.user;
        console.log(this.props)
        if(islogin){
            return <Redirect to="/admin"></Redirect>
        }
        return (
            <div id="login">
                <header>
                    <img src={Logo} alt="logo" />
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>

                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名必须输入' },
                                { min: 4, message: '用户名最小长度为四位！' },
                                {max:12,message:"用户名最大长度为12位"},
                                { pattern:/^[0-9a-zA-Z_]{1,}$/ ,message: '用户名任意数字下换线字母'}
                            ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                         />
                        )}
                       
                    </Item>
                    <Item>
                      {getFieldDecorator('password', {
                            rules: [{ validator: this.pwaValidator}],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                           />
                        )}
                    </Item>
                     <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                          登录
                        </Button>
                    </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

// 装饰器写法就相当于   Login=connect()(Login) 重新包装了这个类  生成个新的类
export default Login;

// export default connect(
//     state=>({user:state.saveUserInfo}),
//     {
//         saveUserInfo
//     }
// )(Form.create()(Login))