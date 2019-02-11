import React, { useState, useEffect } from 'react'
import { Button } from '../Core/Button'
import { Input } from '../Core/Input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, signup } from '../../state/actions/auth.actions'
import './index.scss'

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
        if (auth.loggedIn) {
            history.push('/')
        }
    })

    const handleAction = () => {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        switch (activeKey) {
            case AuthComponentKey.Login: return login(username, password)
            case AuthComponentKey.Signup: return signup(username, password)
        }
    }

    const buttonType = activeKey === AuthComponentKey.Login ? 
        'primary': 
        'secondary'

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
                        <Button type={buttonType} onClick={handleAction} style={{ justifyContent: 'center' }}>{activeKey}</Button>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        Do not share any information that are you are not prepared to be made public during pre-alpha development.
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