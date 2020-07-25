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
            authToken: null
        }



    }
    authTokenHandler() {
        return this.state.authToken;
    }

    router = () => {
        if(this.state.isLoggedIn){
        // if (this.state.isLoggedIn && authToken) {
            return (
            <>
                <PageTitle/>
                <Search/>
                <MainPage/>
             </>
             )
		}
        else{
            return (
            <>
                <LandingPage/>
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
