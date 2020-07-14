import React from 'React'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Search () {

	return(
		<>
			<Form>
				<Form.Group controlId = "SearchBar">
					<FormControl type = "text" placeholder = "Search Recipes"/>
					<Button type = "submit">Search</Button>
				</Form.Group>
			</Form>
		</>
	);
};
export default Search;