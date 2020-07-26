import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Navbar} from 'react-bootstrap'


class Search extends React.Component {
    doLogout = () => {
        const logout = this.props.onLogout;
        setTimeout(() => logout(), 1000)
    };
    doSearch = async event => {
        const query = document.getElementById("search").value;
        const jsonPayload = JSON.stringify({
            "owner_id": this.props.browserState.ownerId,
            "query": query,
            "limit": 50
        });
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        alert(jsonPayload); // DELETEME

        try{
            xhr.addEventListener("load", function () {
                if (this.status === 200 || this.status === 201) {
                    setTimeout(() => {
                        this.props.onSearch(this.responseText)
                    }, 1500);
                }
                else{
                    alert("Error " + this.status + ": " + this.responseText); // TODO: make error messaging better
                }
            });   
        } catch (err){
            alert(err.message);
        }

        xhr.open("POST", "https://jd2.aleccoder.space/api/recipe/search")
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(jsonPayload);
        event.preventDefault();
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