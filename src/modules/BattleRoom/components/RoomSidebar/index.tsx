import React, { useState, CSSProperties } from 'react'
import { List } from 'immutable';
import { TopBar } from '../../../Core/TopBar'
import { Icon } from '../../../Core/Icon'
import RoomChat from '../RoomChat'
import './index.scss'

enum SidebarKey {
    Users = 'Users',
    Chat = 'Chat',
    Battlelog = 'Battlelog',
    Settings = 'Settings',
}

const keyIcons = {
    [SidebarKey.Users]: 'two-shadows',
    [SidebarKey.Chat]: 'talk',
    [SidebarKey.Battlelog]: 'audio-cassette',
    [SidebarKey.Settings]: 'cog',
}

const sidebar = (key: string, props: any) => {
    switch (key) {
        case SidebarKey.Users: return <div>USERS</div>
        case SidebarKey.Chat: return <RoomChat />
        case SidebarKey.Battlelog: return <div>BATTLELOG</div>
        default: return <div></div>
    }
}

export const RoomSidebar = (props: any) => {
    const [ activeKey, setActiveKey ] = useState(SidebarKey.Chat)
    const keys = List.of(SidebarKey.Chat, SidebarKey.Battlelog, SidebarKey.Users, SidebarKey.Settings)
    const isActive = (key: SidebarKey) => key === activeKey
    const fill = key => isActive(key) ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.42)'
    const selectStyle = (key) => ({ 
        width: '25%', 
        display: 'flex', 
        justifyContent: 'center', 
        cursor: 'pointer',
        color: fill(key),
        userSelect: 'none',
        fontWeight: 600,
        height: 56,
        lineHeight: '56px',
    })

    return (
        <div className='RoomSidebar'>
            <TopBar style={{ borderLeft: 'none', borderRight: 'none' }}>
                {keys.map(key => (
                    <div key={key} style={selectStyle(key) as CSSProperties} onClick={() => setActiveKey(key)}>
                        {/*<Icon size={32} icon={keyIcons[key]} fill={fill(key)} />*/}
                        {key}
                    </div>
                ))}
            </TopBar>
            <div className='RoomSidebar__body'>
                {sidebar(activeKey, props)}
            </div>
        </div>
    )
}