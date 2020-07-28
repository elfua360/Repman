import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ForgotPassword extends React.Component {
    doReset = async event => {
        const email = document.getElementById("passwordResetEmail").value;
        const jsonPayload = JSON.stringify({"email": email});
        //alert(jsonPayload); // DELETEME
        const xhr = new XMLHttpRequest();

        try {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        document.getElementById("resetError").className = "alert alert-success";
                        document.getElementById("resetError").innerHTML = "Reset email sent";
                    }
                    else if (this.status === 409){
                        document.getElementById("resetError").className = "alert alert-danger";
                        document.getElementById("resetError").innerHTML = "Email address not found ";
                    }
                    else{
                        document.getElementById("resetError").className = "alert alert-danger";
                        document.getElementById("resetError").innerHTML = "Error " + this.status + ": " + this.responseText;
                    }
                }
            });
        } catch (err){
            document.getElementById("resetError").className = "alert alert-danger";
            document.getElementById("resetError").innerHTML = err.message;
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/resetpassword");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault();
    };

    render() {
        return (
            <>
                <Form onSubmit={this.doReset}>
                    <Form.Group controlId="passwordResetEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <br/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Send Email
                    </Button>
                    <div role="alert" id="resetError">
                    </div>
                </Form>
            </>
        )
    }
}

export default ForgotPassword