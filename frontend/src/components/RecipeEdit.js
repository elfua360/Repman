import React from 'react';
import {Modal,Form,Button} from 'react-bootstrap';

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.recipe);
    this.state = {name: this.props.recipe.name, ingredients: this.props.recipe.ingredients, steps: this.props.recipe.steps, tags: this.props.recipe.tags};
    console.log(this.state);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
/*  static derivedState(props, state) {
    const prevName = state.prevName;
    const prevIngredients = state.prevIngredients;
    const prevSteps = state.prevSteps;
    const prevTags = state.prevTags;

    const name = prevName !== props.recipe.name ? props.recipe.name : state.name;
    const ingredients = prevIngredients !== props.recipe.ingredients.join(",") ? props.recipe.ingredients.join(",") : state.ingredients;
    const steps = prevSteps !== props.recipe.steps.join(",") ? props.recipe.steps.join(",") : state.steps;
    const tags = prevTags !== props.recipe.tags.join(",") ? props.recipe.tags.join(",") : state.tags;
    return {
      prevName: props.recipe.name, name,
      prevIngredients: props.recipe.ingredients.join(","), ingredients,
      prevSteps: props.recipe.steps.join(","), steps,
      prevTags: props.recipe.tags.join(","), tags,
    }
  }*/
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleIngredientsChange(e) {
    const regExp = /\s*,\s*/;
    const regExpIngredients = /\s*of\s*/;
    var newIngredients = e.target.value.split(regExp);
    var ingredients = [];
    for (let i = 0; i < newIngredients.length; i++) {
      let ingredient = {};
      let newIngrd = newIngredients[i].split(regExpIngredients);
      ingredient["name"] = (newIngrd.length === 1) ? newIngrd[0] : newIngrd[1];
      ingredient["amount"] = (newIngrd.length === 1) ? 0 : newIngrd[0];
      ingredients.push(ingredient);
  }
    this.setState({ingredients: ingredients});
  }
  handleStepsChange(e) {
    const regExp = /\s*,\s*/;
    var newSteps = e.target.value.split(regExp);
    var steps = [];
    for (let i = 0; i < newSteps.length; i++) {
      let step = {};
      step["step"] = newSteps[i];
      step["number"] = i;
      steps.push(step);
    }
    this.setState({steps: steps});
  }
  handleTagsChange(e) {
    const regExp = /\s*,\s*/;
    var newTags = e.target.value.split(regExp)
    this.setState({tags: newTags});
  }
  handleEdit(e) {
    e.preventDefault();
    const onEdit = this.props.onEdit;
    const currentlyEditing = this.props.currentlyEditing;
    //const regExp = /\s*,\s*/;
    //const regExpIngredients = /\s*of\s*/;
    const id = this.props.recipe.id;
    var name = this.state.name;
    //var newIngredients = this.state.ingredients.split(regExp);
    //var newSteps = this.state.steps.split(regExp);
    var tags = this.state.tags;
    var steps = this.state.steps;
    var ingredients = this.state.ingredients;
    console.log("id:" + id);
    /*for (let i = 0; i < newSteps.length; i++) {
        let step = {};
        step["step"] = newSteps[i];
        step["number"] = i;
        steps.push(step);
    }/*
    for (let i = 0; i < newIngredients.length; i++) {
        let ingredient = {};
        let newIngrd = newIngredients[i].split(regExpIngredients);
        ingredient["name"] = (newIngrd.length === 1) ? newIngrd[0] : newIngrd[1];
        ingredient["amount"] = (newIngrd.length === 1) ? 0 : newIngrd[0];
        ingredients.push(ingredient);
    }*/

    const jsonPayload = JSON.stringify({
        "name": name,
        "id": id,
        "ingredients": ingredients,
        "steps": steps,
        "tags": tags
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    try {
      xhr.addEventListener("load", function () {
          if (this.status === 200 || this.status === 201) {
              setTimeout(() => {
                onEdit(name, ingredients, steps, tags, currentlyEditing);
              }, 1500);
          } else {
              alert("Error " + this.status + ": " + this.responseText); // TODO: make error messaging better
          }
      });
    } catch (err) {
      alert(err.message);
    }

    xhr.open("PUT", "https://jd2.aleccoder.space/api/recipes/update")
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(jsonPayload);
    
  }
  handleCancel() {
    const onEditModal = this.props.onEditModal;

    this.setState({name: this.props.recipe.name, ingredients: this.props.recipe.ingredients,
    steps: this.props.recipe.steps, tags: this.props.recipe.tags});
    console.log(this.state);
    onEditModal();
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
    console.log(this.state);
    console.log(this.props.recipe.ingredients);/*
    var ingredients = this.props.recipe.ingredients;
    var steps = this.props.recipe.steps;
    var newIngredients = [];
    var newSteps = [];
    for (let i = 0; i < ingredients.length; i++)
    {
      newIngredients[i] = (ingredients[i].amount === "0" ? "" : (ingredients[i].amount + " of ")) + ingredients[i].name;
    }
    for (let i = 0; i < steps.length; i++)
    {
      newSteps[i] = steps[i].step;
    }*/

    return(
      <Modal show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="recipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type="text" required onChange={this.handleNameChange} value={this.state.name} placeholder="Enter Recipe Name" />
          </Form.Group>
          <Form.Group controlId="recipeIngredients">
            <Form.Label>Recipe Ingredients</Form.Label>
            <Form.Control as="textarea" type="text" rows="3" required onChange={this.handleIngredientsChange} value={
              this.state.ingredients.map((ingredient, index) => (
                                                    (ingredient.amount === "0" ? "" : (ingredient.amount + " of ")) + ingredient.name
                                                ))} placeholder="separate by commas" />
          </Form.Group>
          <Form.Group controlId="recipeSteps">
            <Form.Label>Recipe Steps</Form.Label>
            <Form.Control as="textarea" type="text" rows="3" required onChange={this.handleStepsChange} value={this.state.steps.map((step, index) => (
                                                    step.step
                                                ))} placeholder="separate by commas"/>
          </Form.Group>
          <Form.Group controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control as="textarea" type="text" rows="1" required onChange={this.handleTagsChange}
                          value={this.state.tags} placeholder="separate by commas"/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleEdit}>Save This Recipe</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
export default RecipeEdit