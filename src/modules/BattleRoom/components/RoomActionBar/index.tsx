import React, { useState } from 'react'
import Modal from '../../../Core/Modal'
import { TopBar } from '../../../Core/TopBar'
import { Button } from '../../../Core/Button'
import { BattleCharacter } from '../BattleCharacter'
import './index.scss'

export const RoomActionbar = (props) => {
    const { character, show, setSkill, characters } = props
    const [ modalOpen, setModalOpen ] = useState(false)
    if (!show || !character) return null

    const actionBarStyle = { 
        background: 'linear-gradient(175deg, hsl(0,0%,25%) 0%,hsl(0,0%,20%) 100%)', 
        borderLeft: 'none', 
        borderRight: 'none', 
        borderBottom: '1px solid black', 
        justifyContent: 'flex-start'
    }
    const flex = { display: 'flex' }
    return (
        <TopBar style={actionBarStyle}>
            <div style={flex}>
                <Button type='primary' onClick={() => setSkill('weapon')}>Weapon Attack</Button>
                {/* character.skills.map(skill => (
                    <Button key={skill.__uuid} type='important' onClick={() => setSkill(skill.__uuid)}>{skill.name}</Button>  
                ))*/}
            </div>
            <div style={flex}>
                {/* This button need to open a modal for the switch action */}
                <Button type='info' onClick={() => setModalOpen(true)}>Switch Heros</Button>
            </div>
            <Modal 
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}>
                <TopBar>
                    Choose a Character
                    <Button type='warning' onClick={() => setModalOpen(false)}>Close</Button>
                </TopBar>
                {characters.filter(c => c.__uuid !== character.__uuid).map(character => (
                    <Button onClick={() => {
                        setSkill('swap', character.__uuid)
                        setModalOpen(false)
                    }} type='info' style={{padding: 24}}>
                        <BattleCharacter character={character} />
                    </Button>
                ))}
            </Modal>
        </TopBar>
    )
}