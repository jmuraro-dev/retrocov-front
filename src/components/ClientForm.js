import React, {Component} from 'react';
import {
    useParams
} from "react-router-dom";
import '../styles/register.css';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {create, getRestaurantByUrlName} from "../api/ClientTrace";

class ClientForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableNumber: "",
            firstname: "",
            lastname: "",
            phone: "",
            postalCode: "",
            restaurantUrlName: this.props.restaurantName,
            restaurantName: "",
            restaurantId: "",
            success: false,
            errors: {
                tableNumber: "",
                phone: "",
                postalCode: "",
                others: ""
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this._handleKeyDown)
        // get the infos about the restaurant in the url
        getRestaurantByUrlName(this.state.restaurantUrlName)
            .then(restaurant => {
                console.log(restaurant);
                this.setState({
                    restaurantName: restaurant.name,
                    restaurantId: restaurant.id
                });
            })
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown)
    }

    _handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 13:
                this._handleSubmit();
                break;
            default:
                break;
        }
    }

    _handleChange = event => {
        event.preventDefault();
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    _handleSubmit = async () => {
        const {tableNumber, firstname, lastname, phone, postalCode, restaurantId, errors} = this.state

        // verify that all the inputs are fullfiled, if not show an error .
        if (tableNumber === '' || firstname === '' || lastname === '' || phone === '' || postalCode === '' || restaurantId === '') {
            errors.others = 'Tous les champs doivent être remplis !'
            this.setState({errors})
        } else {
            this.setState({errors: {tableNumber: "", phone: "", postalCode: "", others: ""}})
            create(this.state)
                .then(() => {
                    this.setState({success: true});
                })
        }
    }

    render() {
        return (
            <Container className="register-container">
                <Card className={"register-card text-center"}>
                    <Card.Img className={"card-logo"} variant={"top"}
                              src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo"/>
                    <Card.Body style={{paddingBottom: "0px"}}>
                        <Card.Title className={"mb-4"}><h3>Formulaire Client - {this.state.restaurantName}</h3>
                        </Card.Title>
                        <Alert variant="info" style={{fontSize: "10pt"}}>
                            Afin de proteger vos données personnelles, les informations renseignées sur ce formulaire
                            seront automatiquement supprimées après 15 jours.
                        </Alert>
                        <Form>
                            <Form.Group controlId="formBasicTableNumber">
                                <Form.Control
                                    size="lg"
                                    name="tableNumber"
                                    type="text"
                                    value={this.state.tableNumber}
                                    onChange={this._handleChange}
                                    placeholder="N° de table"/>
                            </Form.Group>
                            {this.state.errors.tableNumber !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.tableNumber}
                                </Alert>
                            ) : null}

                            <Form.Group controlId="formBasicFirstname">
                                <Form.Control
                                    size="lg"
                                    name="firstname"
                                    type="text"
                                    value={this.state.firstname}
                                    onChange={this._handleChange}
                                    placeholder="Prénom"/>
                            </Form.Group>
                            <Form.Group controlId="formBasiclastname">
                                <Form.Control
                                    size="lg"
                                    name="lastname"
                                    type="text"
                                    value={this.state.lastname}
                                    onChange={this._handleChange}
                                    placeholder="Nom de famille"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                <Form.Control
                                    size="lg"
                                    name="phone"
                                    type="tel"
                                    value={this.state.phone}
                                    onChange={this._handleChange}
                                    placeholder="N° de téléphone"/>
                            </Form.Group>
                            {this.state.errors.phone !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.phone}
                                </Alert>
                            ) : null}
                            <Form.Group controlId="formBasicPostalCode">
                                <Form.Control
                                    size="lg"
                                    name="postalCode"
                                    type="number"
                                    value={this.state.postalCode}
                                    onChange={this._handleChange}
                                    placeholder="Code postal"/>
                            </Form.Group>
                            {this.state.errors.postalCode !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.postalCode}
                                </Alert>
                            ) : null}

                            {this.state.errors.others !== "" ? (
                                <Alert variant="danger">
                                    {this.state.errors.others}
                                </Alert>
                            ) : null}

                            {this.state.success == true ? (
                                <Alert variant="success">
                                    Vos informations ont bien été envoyées.
                                </Alert>
                            ) : <Button className="register-button mr-3 mt-2" size="lg" variant="primary"
                                        onClick={() => this._handleSubmit()}>Soumettre
                            </Button>
                            }

                        </Form>
                        <Card.Footer className="text-muted card-foot">par <a href={"https://www.infomaniak.com"}>Infomaniak</a></Card.Footer>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default () => {
    const {restaurant} = useParams();
    return (
        <ClientForm restaurantName={restaurant}/>
    )
}
