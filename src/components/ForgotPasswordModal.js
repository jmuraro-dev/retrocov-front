import React, {Component} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {readByEmail, sendMail, updateToken} from "../api/Restaurant";

class ForgotPasswordModal extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            modal: false,
            success: '',
            errors: {email: ''}
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    _handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target
        let errors = this.state.errors

        switch (name) {
            case 'email':
                const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                errors.email = expression.test(String(value).toLowerCase()) ? '' : "Le format de l'adresse mail indiquer n'est pas valide !"
                break;
            default:
                break;
        }


        this.setState({errors, [name]: value})
    }

    _sendEmail = async () => {
        const response = await readByEmail(this.state.email)
        const id = response.id
        if (response === false) {
            let errors = this.state.errors
            errors.email = "L'email indiqué ne correspond à aucun établissement"
            this.setState({errors})
        } else {
            const response = await updateToken(id)

            if (response.token !== '') {
                const mail = await sendMail(this.state.email, response.token)
                if (mail) {
                    this.setState({success: true})
                }
            }

        }

    }

    render() {
        return (
            <div>
                <p><a href={"#"} onClick={this.toggle}>Mot de passe oublié</a></p>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Supprimer restaurant</ModalHeader>
                    <ModalBody>
                        <Form>
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
                            {this.state.success ? (
                                <Alert variant={"success"}>
                                    L'email de réinitialisation du mot de passe à bien été envoyé.
                                </Alert>
                            ) : null}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="primary" onClick={this._sendEmail}>Envoyer</Button>
                        {' '}
                        <Button variant="secondary" onClick={this.toggle}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ForgotPasswordModal;