import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ChangePassword(){
    
	return (
        <div>
            <h1>Change Password</h1>
            <Form>
                <Form.Group controlId="">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter New Password"/>
                </Form.Group>
                <Form.Group controlId="">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Change Password
                </Button>
            </Form>
        </div>
    );
}
export default ChangePassword