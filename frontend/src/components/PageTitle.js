import React from 'react'
import "./PageTitle.css"
import {Navbar, Nav, NavDropdown, FormControl, Form, Button} from "react-bootstrap";
import ForgotPassword from "./ForgotPassword";

class PageTitle extends React.Component {
    doLogout = () => {
        const logout = this.props.onLogout;
        setTimeout(() => logout(), 1000)
    };
    goHome = async event => {
        const query = "";
        const jsonPayload = JSON.stringify({
            "owner_id": this.props.browserState.ownerId,
            "query": query,
            "limit": 50
        });
        const search = this.props.onSearch;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        // alert(jsonPayload); // DELETEME

        try {
            xhr.addEventListener("load", function () {
                if (this.status === 200 || this.status === 201) {
                    console.log(this.responseText);
                    search(query, this.responseText);
                } else {
                    alert("Error " + this.status + ": " + this.responseText); // TODO: make error messaging better
                }
            });
        } catch (err) {
            alert(err.message);
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/recipes/search")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault();
    };
    doSearch = async event => {
        const query = document.getElementById("search").value;
        const jsonPayload = JSON.stringify({
            "owner_id": this.props.browserState.ownerId,
            "query": query,
            "limit": 50
        });
        const search = this.props.onSearch;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        // alert(jsonPayload); // DELETEME

        try {
            xhr.addEventListener("load", function () {
                if (this.status === 200 || this.status === 201) {
                    console.log(this.responseText);
                    search(query, this.responseText);
                } else {
                    alert("Error " + this.status + ": " + this.responseText); // TODO: make error messaging better
                }
            });
        } catch (err) {
            alert(err.message);
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/recipes/search")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);

    };

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home" onClick={this.goHome}>Repman</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home" onClick={this.goHome}>Home</Nav.Link>
                            <NavDropdown title="My Account" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={this.props.toggleForgot}>Change Password</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>{this.props.browserState.firstName + " " + this.props.browserState.lastName}</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" id="search"/>
                            <Button variant="outline-success" className="mr-sm-2"
                                    onClick={this.doSearch}>Search</Button>
                            <Button variant="danger" onClick={this.doLogout}>Logout</Button>
                        </Form>

                    </Navbar.Collapse>
                </Navbar>
                <ForgotPassword browserState={this.props.browserState} showForgotStatus={this.props.showForgotStatus} toggleForgot={this.props.toggleForgot}/>
            </div>
        )
    };
}

export default PageTitle;