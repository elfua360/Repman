import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Modal} from "react-bootstrap";

class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true
        }
    }

    doReset = async event => {
        const password = document.getElementById("passwordReset").value;
        const jsonPayload = JSON.stringify({id: this.props.browserState.ownerId, password:password});
        console.log(jsonPayload);
        const xhr = new XMLHttpRequest();
        const closeWindow = this.props.toggleForgot;
        try {
            xhr.addEventListener("load", function () {
                const pack = JSON.parse(this.responseText);
                    if (pack.code === 200) {
                        document.getElementById("resetError").className = "alert alert-success";
                        document.getElementById("resetError").innerHTML = "Password Changed";
                        setTimeout(()=>closeWindow(), 1000);
                    } else if (pack.code === 500) {
                        document.getElementById("resetError").className = "alert alert-danger";
                        document.getElementById("resetError").innerHTML = "Error Server Error";
                    } else {
                        document.getElementById("resetError").className = "alert alert-danger";
                        document.getElementById("resetError").innerHTML = "Error " + pack.code + ": " + pack.message;
                    }
                console.log(xhr.responseText);
            });
        } catch (err) {
            document.getElementById("resetError").className = "alert alert-danger";
            document.getElementById("resetError").innerHTML = err.message;
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/changepassword");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault();
    };
    handleEdit = (event) => {
        const password = document.getElementById("passwordReset").value;
        const passwordConfirm = document.getElementById("passwordResetConfirm").value;
        console.log(password,passwordConfirm);
        const disabled = (password === "" || passwordConfirm === "") ? true : password !== passwordConfirm;
        this.setState({buttonDisabled: disabled})
    };

    render() {
        return (
            <Modal show={this.props.showForgotStatus} onHide={this.props.toggleForgot}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.doReset}>
                        <Form.Group controlId="passwordReset">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleEdit}/>
                        </Form.Group>
                        <Form.Group controlId="passwordResetConfirm">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handleEdit}/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit" disabled={this.state.buttonDisabled}>
                            Submit
                        </Button>
                        <div role="alert" id="resetError">
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
export default ChangePassword