import React, { useState, useEffect } from 'react'
import './index.scss'
import { Button } from '../Core/Button'
import { Input } from '../Core/Input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, signup } from '../../state/actions/auth.actions'

enum AuthComponentKey {
    Login = 'Login',
    Signup = 'Signup',
}

const AuthMain = ({ children }) => (
    <div className='Auth__main'>
        <div className='Auth__main--border'>
            {children}
        </div>
    </div>
)

const AuthHeader = (props) => {
    const { activeKey, setActiveKey } = props
    return (
        <div className='Auth__header'>
            {[ AuthComponentKey.Login, AuthComponentKey.Signup ].map(key => ([
                <div onClick={() => setActiveKey(key)} className={'Auth__header__key' + (key === activeKey ? ' active' : '')}>{key}</div>,
                <div className='Auth__header__divider'></div>
            ]))}
        </div>
    )
}

const AuthBody = ({ children }) => {
    return (
        <div className='Auth__body'>
            <div className='Auth__body--border'>
                {children}
            </div>
        </div>
    )
}

export const Auth = (props) => {
    const [ activeKey, setActiveKey ] = useState(AuthComponentKey.Login)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, signup, auth, history } = props;

    useEffect(() => {
        const _username = localStorage.getItem('username')
        const _password = localStorage.getItem('password')
        if (_username) setUsername(_username)
        if (_password) setPassword(_password)
    }, [])

    useEffect(() => {
        console.log(auth, history)
        if (auth.loggedIn) {
            history.push('/')
        }
    })

    const handleAction = () => {
        switch (activeKey) {
            case AuthComponentKey.Login: return login(username, password)
            case AuthComponentKey.Signup: return signup(username, password)
        }
    }

    return (
        <div className='Auth'>
            <AuthMain>
                <AuthHeader activeKey={activeKey} setActiveKey={setActiveKey} />
                <AuthBody>
                    <div>
                        <Input value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <Input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <Button onClick={handleAction} style={{ justifyContent: 'center' }}>{activeKey}</Button>
                    </div>
                </AuthBody>
            </AuthMain>
        </div>
    )
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = (dispatch) => bindActionCreators({
    login,
    signup,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Auth)