import React, {Component} from 'react';

import {
    useParams
} from "react-router-dom";
import {Card, Container, Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";
import {readByUrlName} from "../api/Restaurant";

import QRCode from "react-qr-code";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            urlName: this.props.restaurantUrlName
        }
    }

    componentDidMount() {
        this._getData()
    }

    _getData = async () => {
        const restaurant = await readByUrlName(this.state.urlName)
        console.log(restaurant)
        await this.setState({name: restaurant.name, address: restaurant.address})
    }

    render() {
        return (
            <Container className="login-container">
                <Navbar>
                    <Navbar.Brand href="#">
                        <img
                            src="/RetroCov_icon.png"
                            width="50"
                            height="33"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Se déconnecter
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Card className={"login-card text-center"}>
                    <Card.Body>
                        <Card.Title className={"mb-4"}><h3>Hello {this.state.name}</h3></Card.Title>
                        <QRCode value={"https://www.retrocov.ch/" + this.state.urlName} />
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default () => {
    const {restaurant} = useParams();
    return (
        <Dashboard restaurantUrlName={restaurant} />
    )
}