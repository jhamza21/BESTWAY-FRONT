import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

export default function ConfirmationNotice(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
              </Button>
                {props.buttonA && <Button variant="success" onClick={() => { props.handleClose(); props.actionA(); }}>
                    {props.buttonA}
                </Button>}
                {props.buttonB && <Button variant="danger" onClick={() => { props.handleClose(); props.actionB(); }}>
                    {props.buttonB}
                </Button>}
            </Modal.Footer>
        </Modal>
    );
}
