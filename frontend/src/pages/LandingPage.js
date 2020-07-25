import React from 'react';

import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword'
import Nav from "react-bootstrap/Nav";
import './LandingPage.css';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "login"
        }
    }

    router = () => {
        console.log(this.state.page)
        if (this.state.page === "login") {
            return <Login onLogin={this.props.onLogin}/>;
        } else if (this.state.page === "register") {
            return <Register onLogin={this.props.onRegisterLogin}/>;
        } else if (this.state.page === "forgotPassword") {
            return <ForgotPassword/>;
        }
    };

    render() {
        return (
            <div id="landing-body">
                <div className="Header" id="landing">
                    <h1 className="display-4">Repman</h1>
                    <br/>
                    <Nav
                        variant="tabs"
                        onSelect={(selectedKey) => {
                            this.setState(() => {
                                return {page: selectedKey};
                            })
                        }}
                        className="navigation"
                        defaultActiveKey="login"
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="register">Register</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="forgotPassword">Forgot Password</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <br/>
                    {this.router()}
                </div>
            </div>)
    }
};

export default LandingPage;