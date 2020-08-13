import React, {Component} from 'react';

import '../styles/login.css';
import '../styles/general.css';

import {Alert, Button, Card, Container, Form} from "react-bootstrap";

import {FaChevronRight} from "react-icons/fa";
import {login} from "../api/Restaurant";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            urlName: '',
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

    _updateLogged = () => {
        this.props.update()
    }

    _handleLogin = async () => {
        const {name, password} = this.state

        if (name === '' || password === '') {
            this.setState({error: 'Tous les champs sont obligatoire !'})
        } else {
            this.setState({error: ''})
            const response = await login(this.state)

            if (response.isLogged) {
                sessionStorage.setItem('restaurant', response.urlName)
                sessionStorage.setItem('admin', response.isAdmin)
                this._updateLogged()
            } else {
                this.setState({error: "Nom d'utilisateur ou mot de passe incorrect !"})
            }
        }
    }

    render() {
        return (
            <Container className="login-container">
                <Card className={"login-card text-center"}>
                    <Card.Img className={"card-logo"} variant={"top"} src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo" />
                    <Card.Body style={{paddingBottom: "0px"}}>
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

                            {this.state.error !== "" ? (
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            ) : null}

                            <Button className="mr-3 mt-2" variant="primary" style={{backgroundColor: "#1A98FF", borderColor: "#1A98FF"}}
                                    onClick={() => this._handleLogin()}>
                                Se connecter
                            </Button>
                            <Button className="mr-3 mt-2 btn-connect" href="/register"
                                    variant="outline-primary">Inscription <FaChevronRight/></Button>
                        </Form>
                        <Card.Footer className="text-muted card-foot">par <a
                            href={"https://www.infomaniak.com"} className="infomaniak-link">Infomaniak</a></Card.Footer>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Login;
