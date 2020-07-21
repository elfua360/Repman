import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage'
import PageTitle from './components/PageTitle'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    router = () => {
        if(this.state.isLoggedIn){
            return (
            <>
                <PageTitle/>
                <MainPage/>
             </>
             )
		}
        else{
            return (
            <>
                <PageTitle/>
                <LandingPage/>
            </>
            )
        }
    }

    render() {
        return (
            <div>
                {this.router()}
            </div>
        )

    }
}


export default App;
