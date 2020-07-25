import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage'
import PageTitle from './components/PageTitle'
import Search from './components/Search'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            ownerId: null,
            firstName: null,
            lastName: null,
            authToken: null
        }
    };

    authTokenHandler() {
        return this.state.authToken;
    };

    getUserData = () => {
        return this.state;
    };

    doLogin = (data) => {
        const jsonData = JSON.parse(data)["data"];
        const userData = jsonData.user;
        console.log(userData);
        this.setState({
            isLoggedIn: true,
            ownerId: userData["_id"],
            firstName: userData["first_name"],
            last_name: userData["last_name"],
            authToken: jsonData["token"]
        });
    };
    doLoginRegister = (data) => {
        const userData = JSON.parse(data)["data"];
        console.log(userData);
        this.setState({
            isLoggedIn: true,
            ownerId: userData["_id"],
            firstName: userData["first_name"],
            last_name: userData["last_name"],
            authToken: null
        });
    };
    doLogout = () => {
        this.setState({});
    };
    router = () => {
        if (this.state.isLoggedIn) {
            return (
                <>
                    <PageTitle/>
                    <Search/>
                    <MainPage/>
                </>
            )
        } else {
            return (
                <>
                    <LandingPage onLogin={this.doLogin} onRegisterLogin={this.doLoginRegister}/>
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
