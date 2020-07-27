import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

class RecipeQRCode extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const toShow = this.props.onShow;
        return (
            <Modal show={toShow}>
                <Modal.Header closeButton>
                    <Modal.Title>New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        )
    }
}

export default RecipeQRCode;