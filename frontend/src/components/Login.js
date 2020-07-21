import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.css";

function Login() {
    const doLogin = async event => {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        var jsonPayload = JSON.stringify({"email": email, "password": password});
        alert(jsonPayload); // DELETEME

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        try {
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        document.getElementById("loginError").className = "alert alert-success";
                        document.getElementById("loginError").innerHTML = "Login successful";
                        // TODO: redirect to main page on successful login
                    } else {
                        document.getElementById("loginError").className = "alert alert-danger";
                        document.getElementById("loginError").innerHTML = "Error " + this.status + ": " + JSON.parse(xhr.responseText).message;
                    }
                }
            });
        } catch (err) {
            document.getElementById("loginError").className = "alert alert-danger";
            document.getElementById("loginError").innerHTML = err.message;
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/login")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault(); // TODO: redirect on successful login
    };
    return (
        <>
            <Form onSubmit={doLogin}>
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
};
export default Login;
