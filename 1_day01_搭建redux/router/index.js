import {Route,Switch,BrowserRouter} from 'react-router-dom'
import React, { Component } from 'react'
import Login from '../containers/Login'


export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                   <Route to="/login" component={Login}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
