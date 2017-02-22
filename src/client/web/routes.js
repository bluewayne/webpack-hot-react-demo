/**
 * Created by liujinhe on 17/2/22.
 */

import main from './pages/main.js'
import layout from './pages/layout.js'
import React from 'react';

import {Router,Route,IndexRoute,browserHistory} from 'react-router'

export default (
    <Router  history={browserHistory}>
            <Route path='/' component={layout}>
                <IndexRoute  component={main}/>
                <Route path='main' component={main}/>
            </Route>
    </Router>
)
