import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Nav from "react-bootstrap/Nav";
import RegisterPage from "./pages/RegisterPage";

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
        }else{
            return <RegisterPage/>;
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
                </Nav>
                <br/>
                {this.test()}

            </div>)
    }
}


export default App;
