import React from 'react';
import {Modal,Form,Button} from 'react-bootstrap';

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", ingredients: "", steps: "", tags: ""};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  static derivedState(props, state) {
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
  handleEdit(e) {
    e.preventDefault();
    const onEdit = this.props.onEdit;
    const currentlyEditing = this.props.currentlyEditing;
    const regExp = /\s*,\s*/;
    var name = this.state.name;
    var ingredients = this.state.ingredients.split(regExp);
    var steps = this.state.steps.split(regExp);
    var tags = this.state.tags.split(regExp);
    onEdit(name, ingredients, steps, tags, currentlyEditing);
  }
  handleCancel() {
    const onEditModal = this.props.onEditModal;
    this.setState({name: this.props.recipe.name, ingredients: this.props.recipe.ingredients.join(","),
    steps: this.props.recipe.steps.join(","), tags: this.props.recipe.tags.join(",")});
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
            <Form.Control as="textarea" type="text" rows="3" required onChange={this.handleIngredientsChange} value={this.state.ingredients} placeholder="separate by commas" />
          </Form.Group>
          <Form.Group controlId="recipeSteps">
            <Form.Label>Recipe Steps</Form.Label>
            <Form.Control as="textarea" type="text" rows="3" required onChange={this.handleStepsChange} value={this.state.steps} placeholder="separate by commas"/>
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