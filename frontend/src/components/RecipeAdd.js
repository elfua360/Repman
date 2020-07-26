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
        const regExpIngredients = /\s*:\s*/;
        const ownerId = this.props.browserState.ownerId;
        var newName = this.state.name;
        var newIngredients = this.state.ingredients.split(regExp);
        var newSteps = this.state.steps.split(regExp);
        var newTags = this.state.tags.split(regExp);
        var steps = [];
        var ingredients = [];
        console.log(newSteps, newIngredients);
        for(let i = 0; i < newSteps.length; i++){
            let step = {};
            step["step"] = newSteps[i];
            step["number"] = i + 1;
            steps.push(step);
        }
        for(let i = 0; i < newIngredients.length; i++){
            let ingredient = {};
            let newIngrd = newIngredients[i].split(regExpIngredients);
            ingredient["name"] = (newIngrd.length === 1) ? newIngrd[0]:newIngrd[1];
            ingredient["amount"] = (newIngrd.length === 1) ? 1:newIngrd[0];
            ingredients.push(ingredient);
        }

        const jsonPayload = JSON.stringify({
            "name": newName,
            "owner_id": ownerId,
            "ingredients": ingredients,
            "steps": steps,
            "tags": newTags
        });

        console.log(jsonPayload);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        try{
            xhr.addEventListener("load", function () {
                if (this.status === 200 || this.status === 201) {
                    setTimeout(() => {
                        onAdd(); // Does this need to be the jsonPayload or the xhr.responseText?
                    }, 1500);
                }
                else{
                    alert("Error " + this.status + ": " + this.responseText); // TODO: make error messaging better
                }
            });
        } catch (err){
            alert(err.message);
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/recipes/add")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
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
                                      placeholder="e.g: 1 cup : flour, 2 tsp : sugar ... etc"/>
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