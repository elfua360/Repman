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
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    if (this.status === 201){
                        document.getElementById("registerError").className = "alert alert-success";
                        document.getElementById("registerError").innerHTML = "Account successfully created";
                    }
                    else{
                        document.getElementById("registerError").className = "alert alert-danger";
                        document.getElementById("registerError").innerHTML = "Error " + this.status + ": " + JSON.parse(xhr.responseText).message;
                    }
                }
              });
        }
        catch(err){
            document.getElementById("registerError").className = "alert alert-danger";
            document.getElementById("registerError").innerHTML = err.message;
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/register")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault(); // TODO: figure out if this is necessary
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
    );
};
export default Register;
