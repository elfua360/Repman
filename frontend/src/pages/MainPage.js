import React from 'react';
import {Card,Button, ButtonToolbar, ListGroup} from 'react-bootstrap';
import RecipeAdd from '../components/RecipeAdd';
import RecipeEdit from '../components/RecipeEdit';
import './MainPage.css';
import Search from "../components/Search";
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
    this.addRecipe(JSON.parse("{\"name\":\"Spaghetti with Meat Sauce\",\"ingredients\":[\"1 pound lean ground meat like beef\",\"turkey\",\"chicken or lamb\",\"3 tablespoons olive oil\",\"1 cup (130 grams) chopped onion\",\"3 garlic cloves\",\"minced (1 tablespoon)\",\"2 tablespoons tomato paste\",\"1/2 teaspoon dried oregano\",\"Pinch crushed red pepper flakes\",\"1 cup water\",\"broth or dry red wine\",\"1 (28-ounce) can crushed tomatoes\",\"Salt and fresh ground black pepper\",\"Handful fresh basil leaves\",\"plus more for serving\",\"12 ounces dried spaghetti or favorite pasta shape\",\"1/2 cup shredded parmesan cheese\"],\"steps\":[\"Heat the oil in a large pot over medium-high heat (we use a Dutch oven)\",\"Add the meat and cook until browned about 8 minutes\",\"As the meat cooks use a wooden spoon to break it up into smaller crumbles\",\"Add the onions and cook stirring every once and a while until softened about 5 minutes\",\"Stir in the garlic tomato paste oregano and red pepper flakes and cook stirring continuously for about 1 minute\",\"Pour in the water and use a wooden spoon to scrape up any bits of meat or onion stuck to the bottom of the pot\",\"Stir in the tomatoes 3/4 teaspoon of salt and a generous pinch of black pepper\",\"Bring the sauce to a low simmer\",\"Cook uncovered at a low simmer for 25 minutes\",\"As it cooks stir and taste the sauce a few times so you can adjust the seasoning accordingly (see notes for suggestions)\",\"About 15 minutes before the sauce is finished cooking bring a large pot of salted water to the boil then cook pasta according to package directions but check for doneness a minute or two before the suggested cooking time\",\"Take the sauce off of the heat and then stir in the basil\",\"Toss in the cooked pasta and then leave for a minute so that the pasta absorbs some of the sauce\",\"Toss again and then serve with parmesan sprinkled on top\"],\"tags\":[\"pasta\",\"spaghetti\",\"easy\"]}"));
  }
  searchAndSort = (query) => {
    this.recipes.forEach((value, index)=>{

    });
  };
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
  editRecipe(newName, newIngredients, newSteps, newTags, currentlyEditing) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients, steps: newSteps, tags: newTags};
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
        <div>
          <Search onLogout={this.props.onLogout}/>
          <br/>
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
                        <Card.Title>Tags</Card.Title>
                        <ListGroup.Item>
                          {recipe.tags.map((tags, index) => (
                              <ListGroup.Item key={index}>{tags}</ListGroup.Item>
                          ))}
                        </ListGroup.Item>
                      </ListGroup>
                      <ButtonToolbar>
                        <Button variant="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                        <Button variant="danger" onClick={() => {this.deleteRecipe(index)}}>Delete</Button>
                      </ButtonToolbar>
                    </Card.Body>
                    <RecipeEdit onShow={this.state.showEdit} onEdit={this.editRecipe} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]} />
                  </Card>
              ))}
            </ListGroup>
            <br/>
            <Button variant="primary" onClick={this.showAddModal}>Add Recipe</Button>
            <RecipeAdd onShow={this.state.showAdd} onAdd={this.addRecipe} onAddModal={this.showAddModal} />
          </div>
        </div>

    );
  }
};
export default MainPage