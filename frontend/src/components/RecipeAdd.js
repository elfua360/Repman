import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

class   RecipeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", ingredients: "", steps: "", tags: ""};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
        this.handleStepsChange = this.handleStepsChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleIngredientsChange(e) {
        this.setState({ingredients: e.target.value});
    }

    handleStepsChange(e) {
        this.setState({steps: e.target.value});
    }

    handleTagsChange(e) {
        this.setState({tags: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const onAdd = this.props.onAdd;
        const regExp = /\s*,\s*/;
        var newName = this.state.name;
        var newIngredients = this.state.ingredients.split(regExp);
        var newSteps = this.state.steps.split(regExp);
        var newTags = this.state.tags.split(regExp);
        var newRecipe = {name: newName, ingredients: newIngredients, steps: newSteps, tags: newTags};
        onAdd(newRecipe);
        console.log(JSON.stringify(newRecipe));
        this.setState({name: "", ingredients: "", steps: "", tags: ""});
    }

    handleCancel() {
        const onAddModal = this.props.onAddModal;
        this.setState({name: "", ingredients: "", steps: "", tags: ""});
        onAddModal();
    }

    render() {
        const onShow = this.props.onShow;
        var regex1 = /^\S/;
        var regex2 = /^[^,\s]/;
        var regex3 = /[^,\s]$/;
        const validRecipe = regex1.test(this.state.name)
            && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients)
            && regex2.test(this.state.steps) && regex3.test(this.state.steps)
            && regex2.test(this.state.tags) && regex3.test(this.state.tags);
        return (
            <Modal show={onShow} onHide={this.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="recipeName">
                        <Form.Label>Recipe Name</Form.Label>
                        <Form.Control type="text" required onChange={this.handleNameChange} value={this.state.name}
                                      placeholder="Enter Recipe Name"/>
                    </Form.Group>
                    <Form.Group controlId="recipeIngredients">
                        <Form.Label>Recipe Ingredients</Form.Label>
                        <Form.Control as="textarea" type="text" rows="3" required
                                      onChange={this.handleIngredientsChange} value={this.state.ingredients}
                                      placeholder="separate by commas"/>
                    </Form.Group>
                    <Form.Group controlId="recipeSteps">
                        <Form.Label>Recipe Steps</Form.Label>
                        <Form.Control as="textarea" type="text" rows="3" required onChange={this.handleStepsChange}
                                      value={this.state.steps} placeholder="separate by commas"/>
                    </Form.Group>
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control as="textarea" type="text" rows="3" required onChange={this.handleTagsChange}
                                      value={this.state.tags} placeholder="separate by commas"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleSubmit}>Save This
                        Recipe</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};
export default RecipeAdd