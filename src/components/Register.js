import React, {Component} from 'react';

import '../styles/register.css';

import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {FaChevronLeft} from "react-icons/fa";
import {create} from "../api/Restaurant";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            address: '',
            password: '',
            passwordConf: '',
            errors: {
                name: '',
                password: '',
                passwordConf: '',
                others: ''
            }
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
        event.preventDefault();
        const {name, value} = event.target
        let errors = this.state.errors;

        switch (name) {
            case 'password':
                errors.password = value.length < 8 ? "Le mot de passe doit faire 8 caractères minimum !" : ''
                break;
            case 'passwordConf':
                errors.passwordConf = value !== this.state.password ? "Les deux mots de passe ne sont pas identique !" : ''
                break;
        }


        this.setState({errors, [name]: value})
    }

    _handleRegister = async () => {
        const {name, address, password, passwordConf, errors} = this.state

        if (name === '' || address === '' || password === '' || passwordConf === '') {
            errors.others = 'Tous les champs doivent être rempli !'
            this.setState({errors})
        } else {
            if (password !== passwordConf) {
                this.setState({error: 'Les deux mots de passe ne correspondent pas !'})
            } else {
                this.setState({errors: {name: '', password: '', passwordConf: '', others: ''}})
                await create(this.state)
            }
        }
    }

    render() {
        return (
            <Container className="register-container">
                <Card className={"register-card text-center"}>
                    <Card.Body>
                        <Card.Text className="register-card-text">
                            <Button className="register-button mr-3" href="/"
                                    variant="primary"><FaChevronLeft/> Connexion</Button>
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
                            {this.state.errors.name !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.name}
                                </Alert>
                            ) : null}

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
                            {this.state.errors.password !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.password}
                                </Alert>
                            ) : null}

                            <Form.Group controlId="formBasicConfPassword">
                                <Form.Control
                                    size="lg"
                                    name="passwordConf"
                                    type="password"
                                    value={this.state.passwordConf}
                                    onChange={this._handleChange}
                                    placeholder="Confirmation du mot de passe"/>
                            </Form.Group>
                            {this.state.errors.passwordConf !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.passwordConf}
                                </Alert>
                            ) : null}

                            {this.state.errors.others !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.others}
                                </Alert>
                            ) : null}

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