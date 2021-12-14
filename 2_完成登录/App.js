import React, { Component ,Fragment} from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from './containers/Login'
import Admin from './containers/Admin'
 class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" component={Admin}></Route>
                </Switch>
            </Fragment>
              
         )
    }
}
export default App