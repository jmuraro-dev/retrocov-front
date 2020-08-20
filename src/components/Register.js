import React, {Component} from 'react';

import '../styles/register.css';
import '../styles/general.css';

import {Alert, Button, Card, Container, Form, InputGroup} from 'react-bootstrap';
import {FaChevronLeft} from "react-icons/fa";
import {create} from "../api/Restaurant";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import ConditionModal from "./ConditionModal";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            address: '',
            password: '',
            passwordConf: '',
            passwordVisible: false,
            passwordConfVisible: false,
            errors: {
                name: '',
                email: '',
                password: '',
                passwordConf: '',
                condition: '',
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

    _handlePasswordVisible = () => {
        this.setState({passwordVisible: !this.state.passwordVisible})
    }

    _handlePasswordConfVisible = () => {
        this.setState({passwordConfVisible: !this.state.passwordConfVisible})
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
            case 'email':
                const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                errors.email = expression.test(String(value).toLowerCase()) ? '' : "Le format de l'adresse mail indiquer n'est pas valide !"
                break;
            case 'password':
                errors.password = value.length < 8 ? "Le mot de passe doit faire 8 caractères minimum !" : ''
                break;
            case 'passwordConf':
                errors.passwordConf = value !== this.state.password ? "Les deux mots de passe ne sont pas identique !" : ''
                break;
            default:
                break;
        }


        this.setState({errors, [name]: value})
    }

    _updateLogged = () => {
        this.props.update()
    }

    _handleRegister = async () => {
        const {name, email, address, password, passwordConf, errors} = this.state

        if (document.getElementById('condition').checked) {
            errors.condition = ''
            this.setState({errors})

            if (name === '' || email === '' || address === '' || password === '' || passwordConf === '') {
                errors.others = 'Tous les champs doivent être rempli !'
                this.setState({errors})
            } else {
                if (errors.others ==='' && errors.email === '' && errors.password === '' && errors.passwordConf === '') {
                    if (password !== passwordConf) {
                        this.setState({error: 'Les deux mots de passe ne correspondent pas !'})
                    } else {
                        this.setState({errors: {name: '', password: '', passwordConf: '', others: ''}})
                        const response = await create(this.state)
                        sessionStorage.setItem('restaurant', response.urlName)
                        this._updateLogged()
                    }
                }
            }
        } else {
            errors.condition = 'Vous devez lire et accepter les conditions pour créer un établissement.'
            this.setState({errors})
        }
    }

    render() {
        return (
            <Container className="register-container">
                <Card className={"register-card text-center"}>
                    <Card.Img className={"card-logo"} variant={"top"}
                              src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo"/>
                    <Card.Body /*style={{paddingBottom: "0px"}}*/>
                        <Card.Title className={"mb-4"}><h3>Inscription</h3></Card.Title>
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
                            {this.state.errors.name !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.name}
                                </Alert>
                            ) : null}

                            <Form.Group controlId="formBasicName">
                                <Form.Control
                                    size="lg"
                                    name="email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this._handleChange}
                                    placeholder="Email de l'établissement"/>
                            </Form.Group>

                            {this.state.errors.email !== "" ? (
                                <Form.Text id="passwordHelpBlock" className={"form-password-conf mb-3"} muted>
                                    {this.state.errors.email}
                                </Form.Text>
                            ) : null}

                            <Form.Group controlId="formBasicAddress">
                                <Form.Control
                                    size="lg"
                                    name="address"
                                    type="text"
                                    value={this.state.address}
                                    onChange={this._handleChange}
                                    placeholder="Adresse de l'établissement"/>
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
                                    <InputGroup.Text onClick={() => this._handlePasswordVisible()}
                                                     style={{padding: "10px"}}>
                                        {this.state.passwordVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                            {this.state.errors.password !== "" ? (
                                <Form.Text id="passwordHelpBlock" className={"form-password-conf mb-3"} muted>
                                    {this.state.errors.password}
                                </Form.Text>
                            ) : null}

                            <InputGroup controlId="formBasicConfPassword" className={"mt-3"}>
                                <Form.Control
                                    size="lg"
                                    name="passwordConf"
                                    type={this.state.passwordConfVisible ? "text" : "password"}
                                    value={this.state.passwordConf}
                                    onChange={this._handleChange}
                                    placeholder="Confirmation du mot de passe"/>
                                <InputGroup.Prepend>
                                    <InputGroup.Text onClick={() => this._handlePasswordConfVisible()}
                                                     style={{padding: "10px"}}>
                                        {this.state.passwordConfVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                            {this.state.errors.passwordConf !== "" ? (
                                <Form.Text id="passwordHelpBlock" className={"form-password-conf"} muted>
                                    {this.state.errors.passwordConf}
                                </Form.Text>
                            ) : null}

                            <Form.Group controlId="formBasicCheckbox" style={{marginBottom: 0}}>
                                <Form.Check type="checkbox" id="condition" label={<ConditionModal />} style={{marginTop: 20, paddingLeft: 0}} />
                            </Form.Group>

                            {this.state.errors.others !== "" ? (
                                <Alert variant="danger" className={"mt-2"}>
                                    {this.state.errors.others}
                                </Alert>
                            ) : null}
                            {this.state.errors.condition !== "" ? (
                                <Alert variant="danger" className={"mt-2"}>
                                    {this.state.errors.condition}
                                </Alert>
                            ) : null}

                            <Button className="register-button btn-connect mr-3 mt-3" href="/"
                                    variant="outline-primary"><FaChevronLeft/> Connexion</Button>

                            <Button className="register-button mr-3 mt-3" variant="primary"
                                    style={{backgroundColor: "#1A98FF", borderColor: "#1A98FF"}}
                                    onClick={() => this._handleRegister()}>S'inscrire</Button>
                        </Form>
                        {/*<Card.Footer className="text-muted card-foot">validé par <a
                            href={"https://www.infomaniak.com"} className='infomaniak-link'>Infomaniak</a></Card.Footer>*/}
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Register;
