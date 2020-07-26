import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Register extends React.Component {
    doRegister = async event => {
        const firstName = document.getElementById("registerFirstName").value;
        const lastName = document.getElementById("registerLastName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        const jsonPayload = JSON.stringify({
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        });
        // alert(jsonPayload); // DELETEME
        const login = this.props.onLogin;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        try {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status === 200 || this.status === 201) {
                        document.getElementById("registerError").className = "alert alert-success";
                        document.getElementById("registerError").innerHTML = "Account successfully created. Wait to be redirected.";
                    } else {
                        document.getElementById("registerError").className = "alert alert-danger";
                        document.getElementById("registerError").innerHTML = "Error " + this.status + ": " + this.responseText;
                    }
                }
                xhr.addEventListener("load", function () {
                    if (this.status === 200 || this.status === 201) {
                        const payload = this.responseText;
                        setTimeout(() => {
                            login(payload)
                        }, 1500);
                    }
                })
            });
        } catch (err) {
            document.getElementById("registerError").className = "alert alert-danger";
            document.getElementById("registerError").innerHTML = err.message;
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/register")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault(); // TODO: figure out if this is necessary
    };

    render() {
        return (
            <>
                <Form onSubmit={this.doRegister}>
                    <Form.Group controlId="registerFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name"/>
                    </Form.Group>

                    <Form.Group controlId="registerLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name"/>
                    </Form.Group>

                    <Form.Group controlId="registerEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="registerPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>

                    <div role="alert" id="registerError">
                    </div>
                </Form>
            </>
        );
    }
};
export default Register;
