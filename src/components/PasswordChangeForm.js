import React, {Component} from 'react';
import {
    useParams,
    useHistory,
    Redirect
} from "react-router-dom";
import '../styles/register.css';
import {Alert, Button, Card, Container, Form, InputGroup, Spinner} from 'react-bootstrap';
import {create} from "../api/ClientTrace";
import {readByEmail, updateToken, updatePassword} from "../api/Restaurant";
import ConditionModal from "./ConditionModal";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FaChevronLeft} from "react-icons/fa";

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            newPasswordConf: "",
            newPasswordVisible: false,
            newPasswordConfVisible: false,
            restaurantMail: this.props.email,
            history: this.props.history,
            restaurantId: "",
            isLoaded: false,
            success: false,
            errors: {
                newPassword: '',
                newPasswordConf: '',
                error404: false,
                others: ""
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown)

        // get the infos about the restaurant in the url
        readByEmail(this.state.restaurantMail)
            .then((result) => {
                if (result.message !== undefined) {
                    this.setState({errors: {error404: true, newPassword: "", newPasswordConf: "", others: ""}})
                } else {

                    // compare the url token and the restaurant token
                    if (this.props.token == result.token) {
                        this.setState({isLoaded: true});
                        this.setState({restaurantId: result.id});

                    } else {
                        this.setState({errors: {error404: true, newPassword: "", newPasswordConf: "", others: ""}})
                    }
                }
            })


    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown)
    }

    _handleNewPasswordVisible = () => {
        this.setState({newPasswordVisible: !this.state.newPasswordVisible})
    }

    _handleNewPasswordConfVisible = () => {
        this.setState({newPasswordConfVisible: !this.state.newPasswordConfVisible})
    }

    _handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 13:
                if (!this.state.success)
                    this._handleSubmit();
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
            case 'newPassword':
                errors.newPassword = value.length < 8 ? "Le mot de passe doit faire 8 caractères minimum !" : ''
                break;
            case 'newPasswordConf':
                errors.newPasswordConf = value !== this.state.newPassword ? "Les deux mots de passe ne sont pas identique !" : ''
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value})
    }

    _handleSubmit = async () => {
        const {newPassword, newPasswordConf, errors} = this.state
        this.setState({errors})

        if (newPassword === '' || newPasswordConf === '') {
            errors.others = 'Tous les champs doivent être rempli !'
            this.setState({errors})
        } else {
            if (errors.newPassword === '' && errors.newPasswordConf === '') {
                if (newPassword !== newPasswordConf) {
                    this.setState({error: 'Les deux mots de passe ne correspondent pas !'})
                } else {
                    this.setState({errors: {newPassword: '', newPasswordConf: '', others: ''}})
                    //SUCCESS !
                    updatePassword(this.state.restaurantId, this.props.token, this.state.newPassword)
                        .then(() => {
                            updateToken(this.state.restaurantId)
                                .then(() => {
                                    this.setState({success: true});
                                })
                        })

                }
            }
        }
    }

    render() {
        if (this.state.errors.error404) {
            return <Redirect to='/404'/>;
        } else if (this.state.isLoaded === false) {
            return (
                <Container style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    display: 'flex',
                    marginTop: 20
                }}>
                    <Spinner animation="border" role="status" style={{color: '#0098ff'}}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>

            )
        } else {
            return (
                <Container className="register-container">
                    <Card className={"register-card text-center"}>
                        <Card.Img className={"card-logo"} variant={"top"}
                                  src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo"/>
                        <Card.Body style={{paddingBottom: "0px"}}>
                            <Card.Title className={"mb-4"}><h3>Nouveau mot de passe</h3></Card.Title>
                            <Form>
                                <InputGroup controlId="formBasicNewPassword">
                                    <Form.Control
                                        size="lg"
                                        name="newPassword"
                                        type={this.state.newPasswordVisible ? "text" : "password"}
                                        value={this.state.newPassword}
                                        onChange={this._handleChange}
                                        placeholder="Nouveau mot de passe"/>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text onClick={() => this._handleNewPasswordVisible()}
                                                         style={{padding: "10px"}}>
                                            {this.state.newPasswordVisible ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                {this.state.errors.newPassword !== "" ? (
                                    <Form.Text id="newPasswordHelpBlock" className={"form-password-conf mb-3"} muted>
                                        {this.state.errors.newPassword}
                                    </Form.Text>
                                ) : null}

                                <InputGroup controlId="formBasicConfNewPassword" className={"mt-3"}>
                                    <Form.Control
                                        size="lg"
                                        name="newPasswordConf"
                                        type={this.state.newPasswordConfVisible ? "text" : "password"}
                                        value={this.state.newPasswordConf}
                                        onChange={this._handleChange}
                                        placeholder="Confirmation du mot de passe"/>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text onClick={() => this._handleNewPasswordConfVisible()}
                                                         style={{padding: "10px"}}>
                                            {this.state.newPasswordConfVisible ? <AiOutlineEyeInvisible/> :
                                                <AiOutlineEye/>}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                {this.state.errors.newPasswordConf !== "" ? (
                                    <Form.Text id="passwordHelpBlock" className={"form-password-conf"} muted>
                                        {this.state.errors.newPasswordConf}
                                    </Form.Text>
                                ) : null}

                                {this.state.errors.others !== "" ? (
                                    <Alert variant="danger" className={"mt-2"}>
                                        {this.state.errors.others}
                                    </Alert>
                                ) : null}

                                {this.state.success ? (
                                        <>
                                            <Alert variant="success" className={"mt-2"}>
                                                Votre mot de passe a bien été modifié.
                                            </Alert>
                                            <Button className="register-button btn-connect mr-3 mt-3" href="/"
                                                    variant="outline-primary"><FaChevronLeft/> Retour</Button>
                                        </>

                                    ) :
                                    <Button className="register-button mr-3 mt-3" variant="primary"
                                            style={{backgroundColor: "#1A98FF", borderColor: "#1A98FF"}}
                                            onClick={() => this._handleSubmit()}>Soumettre</Button>}

                            </Form>
                            <Card.Footer className="text-muted card-foot">validé par <a
                                href={"https://www.infomaniak.com"}
                                className='infomaniak-link'>Infomaniak</a></Card.Footer>
                        </Card.Body>
                    </Card>
                </Container>
            );
        }
    }
}

export default () => {
    const {email, token} = useParams();
    const {history} = useHistory();
    return (
        <PasswordChangeForm email={email} token={token} history={history}/>
    )
}
