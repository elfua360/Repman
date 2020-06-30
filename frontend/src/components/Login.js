import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.css";

function Login() {
    const doLogin = async event => {
        alert(event)
        event.preventDefault();
    };
    return (
        <>
            <Form onSubmit={doLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                    <Form.Text className="as">
                        <Button variant="link" className="forget-pass">Forget Password</Button>
                        <br/>
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {/*<h1 id="loginTitle">Login Here</h1>*/}
            {/*<div id="login">*/}
            {/*<form onSubmit={doLogin}>*/}
            {/*<span id="usernameLoginTitle">Username</span>*/}
            {/*<input type="text" id="usernameLogin" placeholder="Username"/>*/}
            {/*<br/>*/}
            {/*<span id="passwordLoginTitle">Password</span>*/}
            {/*<input type="password" id="passwordEnter" placeholder="Password"/>*/}
            {/*<br/>*/}
            {/*<input type="submit" id="loginButton" class="button" value="Sign In"*/}
            {/*onClick={doLogin}/>*/}
            {/*</form>*/}
            {/*<span id="loginResult"></span>*/}
            {/*</div>*/}

        </>

    );
};
export default Login;
