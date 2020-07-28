import React from 'react';
import {Card, Button, ButtonToolbar, ListGroup, Alert} from 'react-bootstrap';
import RecipeAdd from '../components/RecipeAdd';
import RecipeEdit from '../components/RecipeEdit';
import './MainPage.css';
import PageTitle from "../components/PageTitle";
import RecipeQRCode from "../components/RecipeQRCode";

class MainPage extends React.Component {
    componentDidMount() {
        if (this.props.isEmailVerfied)
            this.getRemoteRecipe();
    }

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showAdd: false,
            showEdit: false,
            showQR: false,
            showForgot: false,
            currentlyEditing: 0,
            searchMode: false
        };

        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);

        // this.addRecipe(JSON.parse("{\"name\":\"Spaghetti with Meat Sauce\",\"ingredients\":[\"1 pound lean ground meat like beef\",\"turkey\",\"chicken or lamb\",\"3 tablespoons olive oil\",\"1 cup (130 grams) chopped onion\",\"3 garlic cloves\",\"minced (1 tablespoon)\",\"2 tablespoons tomato paste\",\"1/2 teaspoon dried oregano\",\"Pinch crushed red pepper flakes\",\"1 cup water\",\"broth or dry red wine\",\"1 (28-ounce) can crushed tomatoes\",\"Salt and fresh ground black pepper\",\"Handful fresh basil leaves\",\"plus more for serving\",\"12 ounces dried spaghetti or favorite pasta shape\",\"1/2 cup shredded parmesan cheese\"],\"steps\":[\"Heat the oil in a large pot over medium-high heat (we use a Dutch oven)\",\"Add the meat and cook until browned about 8 minutes\",\"As the meat cooks use a wooden spoon to break it up into smaller crumbles\",\"Add the onions and cook stirring every once and a while until softened about 5 minutes\",\"Stir in the garlic tomato paste oregano and red pepper flakes and cook stirring continuously for about 1 minute\",\"Pour in the water and use a wooden spoon to scrape up any bits of meat or onion stuck to the bottom of the pot\",\"Stir in the tomatoes 3/4 teaspoon of salt and a generous pinch of black pepper\",\"Bring the sauce to a low simmer\",\"Cook uncovered at a low simmer for 25 minutes\",\"As it cooks stir and taste the sauce a few times so you can adjust the seasoning accordingly (see notes for suggestions)\",\"About 15 minutes before the sauce is finished cooking bring a large pot of salted water to the boil then cook pasta according to package directions but check for doneness a minute or two before the suggested cooking time\",\"Take the sauce off of the heat and then stir in the basil\",\"Toss in the cooked pasta and then leave for a minute so that the pasta absorbs some of the sauce\",\"Toss again and then serve with parmesan sprinkled on top\"],\"tags\":[\"pasta\",\"spaghetti\",\"easy\"]}"));
    }

    toggleForgotPasswordModal = () => {
        this.setState({showForgot: !this.state.showForgot});
    }

    showAddModal() {
        this.setState({showAdd: !this.state.showAdd});
    }

    showEditModal(index) {
        this.setState({currentlyEditing: index, showEdit: !this.state.showEdit});
    }

    showQRCodeModal = (index) => {
        this.setState({currentlyEditing: index, showQR: !this.state.showQR})
    }
    refreshList = () => {
        this.setState({recipes: []});
        this.getRemoteRecipe();
    };
    addRecipeAfter = () => {
        this.showAddModal();
        this.refreshList();
    }

    addRecipe(recipe) {
        let recipes = this.state.recipes;
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({recipes: recipes});
    }

    editRecipe(newName, newIngredients, newSteps, newTags, currentlyEditing) {
        let recipes = this.state.recipes;
        recipes[currentlyEditing] = {name: newName, ingredients: newIngredients, steps: newSteps, tags: newTags};
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({recipes: recipes});
        this.showEditModal(currentlyEditing);
    }

    deleteRecipe(index) {
        const deleteRecipeLocal = () => {
            let recipes = this.state.recipes.slice();
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            this.setState({recipes: recipes, currentlyEditing: 0});
        };
        const xhr = new XMLHttpRequest();
        const jsonPayload = {
            id: this.state.recipes[index].id
        };
        console.log(jsonPayload);
        try {
            xhr.addEventListener("load", function () {
                if (this.status === 201) {
                    deleteRecipeLocal();
                } else {
                    //console.log("AAAAAAA1AAAA");
                    //console.log(this.status);
                }
            });
        } catch (err) {
            //console.log("1AAAAAAAAAAA");
        }

        xhr.open("DELETE", "https://jd2.aleccoder.space/api/recipes/delete");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(JSON.stringify(jsonPayload));


    }

    headerText() {
        // var recipe = JSON.parse(localStorage.getItem("recipes"));
        if (!this.props.isEmailVerfied) {
            // this.setState({recipes:[]});
            return "Please Verify Your Email to Continue";
        }
        if (this.state.searchMode) {
            return "Search Results";
        }
        if (this.state.recipes.length) {
            return "All saved recipes";
        }

        return "No recipe found, add new ones to get started"

    }

    getRemoteRecipe = () => {
        var info = this.props.browserState;
        console.log(info);
        const jsonPayload = JSON.stringify({
            "owner_id": info.ownerId,
            "query": "",
            "limit": 50
        });
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        const parseRemoteRecipe = this.parseRemoteRecipe;
        try {
            xhr.addEventListener("load", function () {
                if (this.status === 200 || this.status === 201) {
                    const payload = JSON.parse(this.responseText);
                    console.log(payload);
                    parseRemoteRecipe(payload);
                } else {

                }
            })
        } catch (err) {

        }
        xhr.open("POST", "https://jd2.aleccoder.space/api/recipes/search")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
    };

    parseRemoteRecipe = (json) => {
        const recipes = json.message;
        console.log(recipes);
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            let ingredients = [];
            recipe.ingredients.forEach((val, idx) => {
                ingredients.push({amount: val.amount, name: val.name});
            });
            let steps = [];
            recipe.steps.forEach((val, idx) => {
                steps.push({number: val.number, step: val.step});
            });
            let tags = [];
            recipe.tags.forEach((val, idx) => {
                tags.push(val);
            });
            let rec = {
                name: recipe.name,
                id: recipe["_id"],
                ingredients: ingredients,
                steps: steps,
                tags: tags,
            };
            console.log(rec);
            this.addRecipe(rec);
        }
    };
    resendVerification = () => {
        var info = this.props.browserState;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        try {
            xhr.addEventListener("load", function () {
                if (this.status === 200 || this.status === 201) {
                    document.getElementById("emailWarning").className = "alert alert-success";
                    document.getElementById("emailWarning").innerHTML = "Verification Link has been reset. You will be logged out momentarily";
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

                }
            })
        } catch (e) {
            console.log(e);
        }
        xhr.open("GET", "https://jd2.aleccoder.space/api/resend/" + info.ownerId);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send();
    }
    searchAndSort = (query, result) => {
        this.setState({recipes: []});
        if (query === "") {
            this.setState({searchMode: false});
        } else {
            this.setState({searchMode: true});
        }
        console.log(result);
        this.parseRemoteRecipe(JSON.parse(result));
    };
    isEmailActivated = () => {
        if (!this.props.isEmailVerfied) {
            return <Alert variant="danger" id="emailWarning">
                To continue to use the app, please verify your account.
                <Alert.Link onClick={this.resendVerification}> Click here to resend verification
                    email. </Alert.Link>
            </Alert>;
        }
    }

    render() {
        const recipes = this.state.recipes;
        var currentlyEditing = this.state.currentlyEditing;

        return (
            <div>
                <RecipeQRCode/>
                <PageTitle onSearch={this.searchAndSort} onLogout={this.props.onLogout}
                           browserState={this.props.browserState} toggleForgot={this.toggleForgotPasswordModal}
                           showForgotStatus={this.state.showForgot}/>
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
                                            {console.log(recipe)}
                                            {
                                                recipe.ingredients.map((ingredient, index) => (
                                                    <ListGroup.Item
                                                        key={index}>{(ingredient.amount === "0" ? "" : (ingredient.amount + " of ")) + ingredient.name}</ListGroup.Item>
                                                ))}
                                        </ListGroup.Item>
                                        <Card.Title>Steps</Card.Title>
                                        <ListGroup.Item>
                                            {recipe.steps.map((steps, index) => (
                                                <ListGroup.Item
                                                    key={index}>{(steps.number + 1) + ". " + steps.step}</ListGroup.Item>
                                            ))}
                                        </ListGroup.Item>
                                        <br/>
                                        <Card.Subtitle>Tags</Card.Subtitle>
                                        <Card.Text>
                                            {recipe.tags.map((tags, index) => (
                                                // <ListGroup.Item key={index}>{tags}</ListGroup.Item>
                                                tags + " "
                                            ))}
                                        </Card.Text>
                                    </ListGroup>
                                    <ButtonToolbar>
                                        <Button variant="outline-success" onClick={() => {
                                            this.showQRCodeModal(index)
                                        }} className="mr-sm-2">Show QR Code</Button>
                                        <Button variant="outline-primary" onClick={() => {
                                            this.showEditModal(index)
                                        }} className="mr-sm-2">Edit</Button>
                                        <Button variant="outline-danger" onClick={() => {
                                            this.deleteRecipe(index)
                                        }} className="mr-sm-2">Delete</Button>
                                    </ButtonToolbar>
                                </Card.Body>
                                <RecipeEdit onShow={this.state.showEdit} onEdit={this.editRecipe} onEditModal={() => {
                                    this.showEditModal(index)
                                }} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]}/>
                                <RecipeQRCode show={this.state.showQR} toggleModal={() => {
                                    this.showQRCodeModal(currentlyEditing)
                                }} recipe={recipes[currentlyEditing].id}/>
                            </Card>
                        ))}
                        <br/>
                    </ListGroup>
                    <br/>
                    <Button variant="primary" onClick={this.showAddModal} disabled={!this.props.isEmailVerfied}>Add
                        Recipe</Button>

                    <RecipeAdd browserState={this.props.browserState} onShow={this.state.showAdd}
                               onAdd={this.addRecipeAfter} onAddModal={this.showAddModal}/>
                    <br/><br/>
                    {
                        this.isEmailActivated()
                    }
                </div>
            </div>

        );
    }
};
export default MainPage