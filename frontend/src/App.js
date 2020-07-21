import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "login"
        }
    }

    router = () => {
        if (this.state.page === "login") {
            return <LandingPage/>;
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
