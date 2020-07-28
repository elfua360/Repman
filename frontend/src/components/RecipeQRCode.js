import React from 'react';
import {Modal, Image} from 'react-bootstrap';

class RecipeQRCode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Recipe QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="align-content-center">
                        <Image id="qrCodeImage"
                               src={"https://jd2.aleccoder.space/api/recipes/qrcode/" + this.props.recipe}/>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default RecipeQRCode;