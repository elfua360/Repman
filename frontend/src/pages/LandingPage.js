import React from 'react';

import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword'
import Nav from "react-bootstrap/Nav";


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
            return <Login/>;
        } else if (this.state.page === "register") {
            return <Register/>;
        } else if (this.state.page === "forgotPassword") {
            return <ForgotPassword/>;
        }
    };

    render() {
        return (
            <div className="Header">
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

            </div>)
    }
};

export default LandingPage;