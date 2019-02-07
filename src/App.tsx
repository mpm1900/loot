import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Session from './modules/PartyLoadout'
import { Sandbox2 } from './components/_Sandbox'
import Room from './modules/Battle';
import './App.scss'


export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Session} />
                <Route path='/battle' component={Room} />
                <Route path='/icons' component={Sandbox2}/>
            </Switch>
        </BrowserRouter>
    )
}