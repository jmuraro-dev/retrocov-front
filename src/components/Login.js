import React, {Component} from 'react';

import '../styles/login.css';

import {Button, Card, Container, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";

import {FaChevronRight} from "react-icons/fa";
import {login} from "../api/Restaurant";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: '',
            error: '',
            redirect: false
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

    _handleLogin = async () => {
        const {name, password} = this.state

        if (name === '' || password === '') {
            this.setState({error: 'Tous les champs sont obligatoire !'})
        } else {
            this.setState({error: ''})
            const response = await login(this.state)

            if (response.isLogged) {
                this.setState({redirect: true})
            }
        }
    }

    render() {
        const {name, redirect} = this.state;

        if (redirect) {
            const url = '/' + name + '/dashboard'
            return <Redirect to={url}/>
        }

        return (
            <Container className="login-container">
                <Card className={"login-card text-center"}>
                    <Card.Body>
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
                            <Button className="mr-3 mt-2" variant="primary"
                                    onClick={() => this._handleLogin()}>
                                Se connecter
                            </Button>
                            <Button className="mr-3 mt-2" href="/register"
                                    variant="outline-primary">Inscription <FaChevronRight/></Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Login;
