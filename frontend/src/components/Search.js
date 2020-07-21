import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Navbar, Nav, FormControl} from 'react-bootstrap'

function Search () {

	return(
		<>
			<Navbar>
                <Nav>
                  <Nav.Link href="">Home</Nav.Link>
                  <Nav.Link href="">Add Recipe</Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" />
                  <Button variant="primary">Search</Button>
                </Form>
             </Navbar>
		</>
	)
}
export default Search