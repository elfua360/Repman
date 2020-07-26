import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.css";

class Login extends React.Component {
    doLogin = async event => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const jsonPayload = JSON.stringify({"email": email, "password": password});
        // alert(jsonPayload); // DELETEME
        const login = this.props.onLogin;
        console.log(event);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        try {
            xhr.addEventListener("load", function () {
                if (this.status === 200) {
                    document.getElementById("loginError").className = "alert alert-success";
                    document.getElementById("loginError").innerHTML = "Login successful";
                    const payload = this.responseText;
                    setTimeout(() => {
                        login(payload)
                    }, 1500);
                } else {
                    document.getElementById("loginError").className = "alert alert-danger";
                    document.getElementById("loginError").innerHTML = "Error " + this.status + ": " + this.responseText;
                }
            });
        } catch (err) {
            document.getElementById("loginError").className = "alert alert-danger";
            document.getElementById("loginError").innerHTML = err.message;
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/login");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault(); // TODO: redirect on successful login
    };

    render() {
        return (
            <>
                <Form onSubmit={this.doLogin}>
                    <Form.Group controlId="loginEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <div role="alert" id="loginError">
                    </div>
                </Form>
            </>
        );
    }
};
export default Login;
