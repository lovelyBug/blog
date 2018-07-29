import React, { PureComponent } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import BackstageManagement from '../pages/BackstageManagement';
import Blog from '../pages/Blog';
class RouterConfig extends PureComponent{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route exact path='/back' component={BackstageManagement} />
                    <Route exact path='/blog' component={Blog} />
                    <Route exact path='/' component={Blog} />
                </Switch>
            </HashRouter>
        )
    }
}
export default RouterConfig;