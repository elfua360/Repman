import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register() {
    const doRegister = async event => {
        var firstName = document.getElementById("firstNameText").value;
        var lastName = document.getElementById("lastNameText").value;
        var email = document.getElementById("emailText").value;
        var password = document.getElementById("passwordText").value;
    };
    return (
        <>
            <Form onSubmit={Register}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name"/>
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name"/>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>



                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </>



        /*
        <>
            <h1 id="registerTitle">Register Here</h1>
            <div id="register">
                <form onSubmit={doRegister}>
                    <span id="usernameRegisterTitle">Username</span>
                    <input type="text" id="usernameRegister" placeholder="Username"/>
                    <br/>
                    <span id="passwordRegisterTitle">Password</span>
                    <input type="password" id="passwordCreate" placeholder="Password"/>
                    <br/>
                    <input type="submit" id="createButton" class="button" value="Create Account"
                           onClick={doRegister}/>
                </form>
                <span id="registerResult"></span>
            </div>
        </>
        */

    );
};
export default Register;
