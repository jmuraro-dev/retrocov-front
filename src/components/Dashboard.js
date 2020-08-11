import React, {Component} from 'react';

import {
    useParams
} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import {FaChevronRight} from "react-icons/fa";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.restaurantName,
        }
    }

    render() {
        return (
            <Container className="login-container">
                <Card className={"login-card text-center"}>
                    <Card.Body>
                        <Card.Title className={"mb-4"}><h3>Hello {this.state.name}</h3></Card.Title>

                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default () => {
    const {restaurant} = useParams();
    return (
        <Dashboard restaurantName={restaurant} />
    )
}