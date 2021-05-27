import React from 'react'
import {Modal,Button} from "react-bootstrap"
import "./style.css"
export default function newModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} size={props.size}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                {props.children}
                   
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

    )
}
