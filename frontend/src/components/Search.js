import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Navbar, FormControl} from 'react-bootstrap'


class Search extends React.Component {
    doLogout = () => {
        const logout = this.props.onLogout;
        setTimeout(() => logout(), 1000)
    };
    doSearch = () => {
        const query = document.getElementById("search").value;
        const jsonPayload = JSON.stringify({
            "owner_id": this.props.browserState.ownerId,
            "query": query,
            "limit": 50
        });

        try{

        } catch (err){
            
        }
        this.props.onSearch(query);
    };
    render() {
        return (
            <div id="search-container">
                <Navbar>
                    <Form inline>
                        <Form.Control type="text" placeholder="Search" id="search"/>
                        <Button variant="primary" onClick={this.doSearch}>Search</Button>
                        <Button variant="primary" style={{position: "absolute", right: "0"}}
                                onClick={this.doLogout}> Log Out </Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}

export default Search