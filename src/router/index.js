import React, { PureComponent } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import BackstageManagement from '../pages/BackstageManagement';
class RouterConfig extends PureComponent{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={BackstageManagement} />
                </Switch>
            </HashRouter>
        )
    }
}
export default RouterConfig;