import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CreateRecipe(){
	
		return(
			 <>
                <Form>
                    <Form.Group>
                        <Form.Label>Recipe Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Recipe Name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prep Time</Form.Label>
                        <Form.Control type="text" placeholder="ex 10min"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cook Time</Form.Label>
                        <Form.Control type="text" placeholder="ex 30min"/>
                    </Form.Group>
                    <Form.Group>
                         <Form.Label>Ingredients</Form.Label>
                        <Form.Control as="textarea" rows="10" />
                    </Form.Group>
                     <Form.Group>
                         <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" rows="10" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type="checkbox" label="Vegan" />
                        <Form.Check type="checkbox" label="Keto" />
                        <Form.Check type="checkbox" label="Vegetarian" />
                        <Form.Check type="checkbox" label="Kosher" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Create Recipe
                    </Button>
                </Form>
            </>
		)
}
export default CreateRecipe