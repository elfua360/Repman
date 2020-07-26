import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Navbar, FormControl} from 'react-bootstrap'


class Search extends React.Component {
    doLogout = () => {
        const logout = this.props.onLogout;
        setTimeout(() => logout(), 1000)
    }

    render() {
        return (
            <>
                <Navbar>
                    <Form inline>
                        <FormControl type="text" placeholder="Search"/>
                        <Button variant="primary">Search</Button>
                        <Button variant="primary" style={{position: "absolute", right: "0"}}
                                onClick={this.doLogout}> Log Out </Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default Search