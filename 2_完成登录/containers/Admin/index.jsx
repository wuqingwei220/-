import React, { Component } from 'react'
import {connect} from 'react-redux'
 class Admin extends Component {
     componentDidMount(){
         console.log(this.props)
     }
    render() {
        return (
            <div>
                admin.....{this.props.username}
            </div>
        )
    }
}
export default connect(
    state=>({username:state.LoginData.username})
)(Admin)