import React, {Component} from 'react';

import '../styles/register.css';
import {Button, Card, Container} from 'react-bootstrap';
import {FaChevronLeft} from "react-icons/fa";


class Error404 extends Component {
    render() {
        return (
            <Container className="register-container">
                <Card className={"register-card text-center"} style={{border: "none"}}>
                    <Card.Img className={"card-logo"} variant={"top"}
                              src={window.location.origin.toString() + '/RetroCov_Logo.png'} alt="RetroCov Logo"/>

                    <Card.Img className={"card-logo"} variant={"top"} style={{marginTop: "10px"}}
                              src={window.location.origin.toString() + '/404.jpg'} alt="404 error"/>
                    <Card.Body style={{paddingBottom: "0px"}}>
                        <Button className="register-button mr-3" href="/"
                                variant="outline-primary"><FaChevronLeft/> Retour</Button>
                        <Card.Footer className="text-muted card-foot">validé par <a
                            href={"https://www.infomaniak.com"}>Infomaniak</a></Card.Footer>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default Error404;
