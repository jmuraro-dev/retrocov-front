import React, {Component} from 'react';

import '../styles/login.css';

import {Button, Card, Container, Form} from "react-bootstrap";
import {FaChevronRight} from "react-icons/fa";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            password: "",
            error: ""
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown)
    }


    _handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 13:
                this._handleLogin();
                break;
            default:
                break;
        }
    }

    _handleChange = event => {
        const {name, value} = event.target

        this.setState({[name]: value})
    }

    _handleLogin = () => {
        console.log("login")
    }

    render() {
        return (
            <Container className="login-container">
                <Card className={"login-card text-center"}>
                    <Card.Body>
                        <Card.Text className="login-card-text">
                            <Button className="mr-3" href="#" variant="primary">Inscription <FaChevronRight /></Button>
                        </Card.Text>
                        <Card.Title className={"mb-4"}><h3>Connexion</h3></Card.Title>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Control
                                    size="lg"
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this._handleChange}
                                    placeholder="Nom du restaurant"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    size="lg"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this._handleChange}
                                    placeholder="Mot de passe"/>
                            </Form.Group>
                            <Button className="mr-3" variant="primary"
                                    onClick={() => this._handleLogin()}>Se connecter</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Login;