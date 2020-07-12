import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register() {
    const doRegister = async event => {
        var firstName = document.getElementById("registerFirstName").value;
        var lastName = document.getElementById("registerLastName").value;
        var email = document.getElementById("registerEmail").value;
        var password = document.getElementById("registerPassword").value;

        var jsonPayload = JSON.stringify({"first_name": firstName, "last_name": lastName, "email": email, "password": password});
        alert(jsonPayload); // DELETEME

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;


        try{
            //xhr.addEventListener
        }
        catch(err){
            /*class="alert alert-danger" role="alert"*/
            document.getElementById("registerError").className = "alert alert-danger";
            document.getElementById("registerError").innerHTML = "Something went wrong!"; /*err.message*/
        
        }


        event.preventDefault();
    };
    return (
        <>
            <Form onSubmit={doRegister}>
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
