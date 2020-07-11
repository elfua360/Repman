import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ForgotPassword(){
	const doReset = async event => {
		alert(event)
		event.preventDefault();
	};

	return(
		<>
			<Form onSubmit={doReset}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" placeholder="Enter email"/>
					<Button variant="primary" type="submit">
                    Send Email
                </Button>
				</Form.Group>
			</Form>
		</>
	)
}

export default ForgotPassword