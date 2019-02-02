import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import PartyLoadoutModule from './modules/PartyLoadout'
import { Sandbox1, Sandbox2 } from './components/_Sandbox'
import './App.scss'
import BattleModule from './modules/Battle';


class App extends Component {
  
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={PartyLoadoutModule} />
                    <Route path='/battle' component={BattleModule} />
                    <Route path='/sb1' component={Sandbox1}/>
                    <Route path='/icons' component={Sandbox2}/>
                    <Route path='/v2' render={() => <div></div>} />
                </Switch>
            </BrowserRouter>
        )
    }
}


const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = () => ({})
export default connect(mapStateToProps, mapDispatchToProps)(App)