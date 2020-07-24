import React from 'react';
import {Card,Button, ButtonToolbar, ListGroup} from 'react-bootstrap';
import RecipeAdd from '../components/RecipeAdd';
import RecipeEdit from '../components/RecipeEdit';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  showAddModal() {
    this.setState({showAdd: !this.state.showAdd});
  }
  showEditModal(index) {
    this.setState({currentlyEditing: index, showEdit: !this.state.showEdit});
  }
  addRecipe(recipe) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showAddModal();
  }
  editRecipe(newName, newIngredients, newSteps, currentlyEditing) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients, steps: newSteps};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes, currentlyEditing: 0});
  }
  headerText(){
    if(this.state.recipes.length){
      return "All saved recipes"
    }else{
      return "No recipe found, add new ones to get started"
    }
  }
  render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;

    return(
      <div className="jumbotron">
        <h1 className="display-4">{this.headerText()}</h1>
        <ListGroup id="recipes">
          {recipes.map((recipe, index) => (
            <Card eventKey={index} key={index}>
              <Card.Header>
                <Card.Title className="title">{recipe.name}</Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                <Card.Title>Ingredients</Card.Title>
                <ListGroup.Item>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                  ))}
                </ListGroup.Item>
                <Card.Title>Steps</Card.Title>
                <ListGroup.Item>
                  {recipe.steps.map((steps, index) => (
                    <ListGroup.Item key={index}>{steps}</ListGroup.Item>
                  ))}
                </ListGroup.Item>
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteRecipe(index)}}>Delete</Button>
                </ButtonToolbar>
              </Card.Body>
              <RecipeEdit onShow={this.state.showEdit} onEdit={this.editRecipe} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]} />
            </Card>
          ))}
        </ListGroup>
        <br/>
        <Button bsStyle="primary" onClick={this.showAddModal}>Add Recipe</Button>
        <RecipeAdd onShow={this.state.showAdd} onAdd={this.addRecipe} onAddModal={this.showAddModal} />
      </div>
    );
  }
};
export default MainPage