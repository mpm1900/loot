import React from 'react'
import Modal from 'react-modal'

export default (props) => {
    const { isOpen, onRequestClose, children } = props
    const style = {
        content: {
            background: 'white',
            zIndex: 9999,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.52)'
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={style}>
            { children }
        </Modal>
    )
}
