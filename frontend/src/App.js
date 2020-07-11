import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Nav from "react-bootstrap/Nav";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "login"
        }
    }

    test = () => {
        console.log(this.state.page)
        if(this.state.page === "login"){
            return <LoginPage/>;
        }else if(this.state.page === "register"){
            return <RegisterPage/>;
        }else if(this.state.page === "forgotPassword"){
            return <ForgotPasswordPage/>;
        }
    };
    render() {
        return (
            <div className="Header">
                <h1 className="header">Repman</h1>
                <br/>
                <Nav
                    variant="tabs"
                    onSelect={(selectedKey) => {
                        this.setState(()=>{
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
                {this.test()}

            </div>)
    }
}


export default App;
