import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Navbar, FormControl} from 'react-bootstrap'



function Search () {

	return(
		<>
			<Navbar>
                <Form inline >
                  <FormControl type="text" placeholder="Search" />
                  <Button variant="primary">Search</Button>
				  <Button  variant="primary" style={{position: "absolute", right: "0"}} > Log Out </Button>
                </Form>
             </Navbar>
		</>
	)
}
export default Search