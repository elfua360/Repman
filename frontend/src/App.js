import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            ownerId: null,
            firstName: null,
            lastName: null,
            authToken: null,
            emailVerified: false
        }
    };

    isEmailVerified() {
        return this.state.emailVerified;
    };

    getUserData = () => {
        return this.state;
    };
    doLogout = () => {
        this.setState({
            isLoggedIn: false,
            ownerId: null,
            firstName: null,
            lastName: null,
            authToken: null
        });
    }
    doLogin = (data) => {
        const jsonData = JSON.parse(data)["data"];
        const userData = jsonData.user;
        console.log(userData);
        this.setState({
            isLoggedIn: true,
            ownerId: userData["_id"],
            firstName: userData["first_name"],
            lastName: userData["last_name"],
            authToken: jsonData["token"],
            emailVerified: userData["active"]
        });
    };
    doLoginRegister = (data) => {
        const userData = JSON.parse(data)["data"]["user"];
        console.log(userData);
        this.setState({
            isLoggedIn: true,
            ownerId: userData["_id"],
            firstName: userData["first_name"],
            lastName: userData["last_name"],
            authToken: null,
            emailVerified: false
        });
    };
    router = () => {
        if (this.state.isLoggedIn) {
            return (
                <>
                    <MainPage isEmailVerfied={this.isEmailVerified()} browserState={this.getUserData()} onLogout={this.doLogout}/>
                </>
            )
        } else {
            return (
                <>
                    <LandingPage onLogin={this.doLogin} onRegisterLogin={this.doLoginRegister} />
                </>
            )
        }
    };

    render() {
        return (
            <div>
                {this.router()}
            </div>
        )

    }
}


export default App;
