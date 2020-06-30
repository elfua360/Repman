import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Nav from "react-bootstrap/Nav";

function App() {
    return (
        <>
            <div className="Header">
                <h1 className="header">Repman</h1>
                <br/>
                <Nav
                    variant="tabs"
                    onSelect={(selectedKey) => {
                        alert(selectedKey)
                    }}
                    className="navigation"
                    defaultActiveKey="link-1"
                >
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Register</Nav.Link>
                    </Nav.Item>
                </Nav>
                <br/>

                <LoginPage/>
            </div>

        </>
    );
}

export default App;
