import React, {Component} from 'react';

import '../styles/login.css';
import '../styles/general.css';

import {Alert, Button, Card, Container, Form, InputGroup} from "react-bootstrap";

import {FaChevronRight} from "react-icons/fa";
import {login} from "../api/Restaurant";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import ForgotPasswordModal from "./ForgotPasswordModal";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            urlName: '',
            error: '',
            redirect: false,
            passwordVisible: false
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown)
    }

    _handlePasswordVisible = () => {
        this.setState({passwordVisible : !this.state.passwordVisible})
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
                <Card className={"login-card text-center mb-3"}>
                    <Card.Img className={"card-logo"} variant={"top"}
                              src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo"/>
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
                                    placeholder="Nom de l'établissement"/>
                            </Form.Group>
                            <InputGroup controlId="formBasicPassword">
                                <Form.Control
                                    size="lg"
                                    name="password"
                                    type={this.state.passwordVisible ? "text" : "password"}
                                    value={this.state.password}
                                    onChange={this._handleChange}
                                    placeholder="Mot de passe"/>
                                <InputGroup.Prepend>
                                    <InputGroup.Text onClick={() => this._handlePasswordVisible()} style={{padding:"10px"}}>
                                        {this.state.passwordVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>

                            {this.state.error !== "" ? (
                                <Alert className={"mt-3"} variant="danger">
                                    {this.state.error}
                                </Alert>
                            ) : null}

                            <Form.Group style={{marginTop: 20}} controlId="formBasicName">
                                <Form.Text style={{marginBottom: -10}}>
                                    <ForgotPasswordModal />
                                </Form.Text>
                                <Button className="mr-3 mt-2" variant="primary"
                                        style={{backgroundColor: "#1A98FF", borderColor: "#1A98FF"}}
                                        onClick={() => this._handleLogin()}>
                                    Se connecter
                                </Button>
                                <Button className="mr-3 mt-2 btn-connect" href="/register"
                                        variant="outline-primary">Inscription <FaChevronRight/></Button>
                            </Form.Group>
                        </Form>
                        {/*<Card.Footer className="text-muted card-foot">validé par <a
                            href={"https://www.infomaniak.com"} className="infomaniak-link">Infomaniak</a></Card.Footer>*/}
                        <Card className={"definition-card text-center  mt-3"}>
                            <Card.Body style={{paddingBottom: "0px"}}>
                                <Card.Title className={"mb-4"}><h5>Qu'est ce que RetroCov ?</h5></Card.Title>
                                <Card.Text className={"pb-4 text-justify"}>
                                    <p>RetroCov, pour Retrospective Covid, est une application permettant le traçage momentané de la clientèle d'un restaurant, à l'identique d'une liste papier dématérialisée, à l'aide d'un QR code propre à l'établissement.</p>

                                    <p>Lors de son inscription à RetroCov, l'établissement recoit un QR code afin de l'afficher dans sa surface et, à l'aide de son smartphone, le client scan le QR code pour s'inscrire dans l'établissement en quelques secondes.</p>

                                    <p>Les données seront conservées durant le délai de garde ordonné par l'OFSP et, pour en recevoir le récapitulatif, le commerce doit s'adresser par email à RetroCov, cela avec les justificatifs mentionnés dans les conditions générales.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Login;
