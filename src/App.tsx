import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Session from './modules/Session'
import { Sandbox2 } from './modules/Sandbox'
import Room from './modules/BattleRoom'
import Auth from './modules/Auth'
import './App.scss'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route exact path='/' component={Session} />
                <Route path='/battle' component={Room} />
                <Route path='/icons' component={Sandbox2}/>
            </Switch>
        </BrowserRouter>
    )
}