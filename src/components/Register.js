import React, {Component} from 'react';

import '../styles/register.css';

import {Button, Card, Container, Form} from 'react-bootstrap';
import { FaChevronLeft } from "react-icons/fa";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            address: "",
            password: "",
            passwordConf: "",
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
                this._handleRegister();
                break;
            default:
                break;
        }
    }

    _handleChange = event => {
        const {name, value} = event.target

        this.setState({[name]: value})
    }

    _handleRegister = () => {
        console.log(this.state)
    }

    render() {
        return (
            <Container className="register-container">
                <Card className={"register-card text-center"}>
                    <Card.Body>
                        <Card.Text className="register-card-text">
                            <Button className="register-button mr-3" href="/" variant="primary"><FaChevronLeft /> Connexion</Button>
                        </Card.Text>
                        <Card.Title className={"mb-4"}><h3>Inscription</h3></Card.Title>
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
                            <Form.Group controlId="formBasicAddress">
                                <Form.Control
                                    size="lg"
                                    name="address"
                                    type="text"
                                    value={this.state.address}
                                    onChange={this._handleChange}
                                    placeholder="Adresse du restaurant"/>
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
                            <Form.Group controlId="formBasicConfPassword">
                                <Form.Control
                                    size="lg"
                                    name="passwordConf"
                                    type="password"
                                    value={this.state.passwordConf}
                                    onChange={this._handleChange}
                                    placeholder="Confirmation du mot de passe"/>
                            </Form.Group>
                            <Button className="register-button mr-3" variant="primary"
                                    onClick={() => this._handleRegister()}>S'inscrire</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Register;