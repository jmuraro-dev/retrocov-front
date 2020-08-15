import React, {Component} from 'react';
import {
    useHistory,
    Redirect
} from "react-router-dom";
import '../styles/register.css';
import '../styles/success.css';
import {Card, Container, Spinner} from 'react-bootstrap';

class ClientFormSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableNumber: "",
            firstname: "",
            lastname: "",
            phone: "",
            postalCode: "",
            restaurantUrlName: "",
            restaurantName: "",
            restaurantId: "",
            isLoaded: true,
            error404: false,
            history: this.props.history
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        if (this.state.error404) {
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
                    <Card className="text-center register-card success-card">
                        <Card.Img className={"card-logo"} variant={"top"}
                                  src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo"/>
                        <Card.Body style={{paddingBottom: "0px"}}>
                            <Card.Title className={"success-title"}>Confirmation</Card.Title>
                            <Card.Text>
                                Vos informations ont bien été envoyées.
                            </Card.Text>
                            <Card.Footer className="text-muted card-foot">validé par <a
                                href={"https://www.infomaniak.com"}>Infomaniak</a></Card.Footer>
                        </Card.Body>
                    </Card>
                </Container>
            );
        }
    }
}

export default () => {
    const {history} = useHistory();
    return (
        <ClientFormSuccess history={history}/>
    )
}
