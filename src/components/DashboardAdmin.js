import React, {Component} from 'react';

import {Card, Container, Navbar, Spinner, Table} from "react-bootstrap";
import {getAllRestaurants} from "../api/Restaurant";
import DeleteRestaurantModal from "./DeleteRestaurantModal";

import '../styles/general.css'

class DashboardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState({loading: true})

        this._getData()
    }

    _getData = async () => {
        //admin only
        const restaurants = await getAllRestaurants();
        await this.setState({restaurants: restaurants});

        this.setState({loading: false})
    }

    render() {
        if (this.state.loading) {
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
                <Container className="login-container">
                    <Navbar>
                        <Navbar.Brand href="#">
                            <img
                                src="/RetroCov_Logo.png"
                                width="125"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="/logout">Se déconnecter</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    <Card className={"login-card text-center"}>
                        <Card.Body style={{paddingBottom: "0px"}}>
                            <Card.Title className={"mb-4"}><h3>Outil d'administration</h3></Card.Title>
                            {this.state.restaurants !== undefined ? (
                            <Table striped bordered responsive size="sm" style={{textAlign: "left"}}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Nom url</th>
                                    <th>Addresse</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.restaurants.map((restaurant, i) => (
                                    <tr key={"restaurant-" + i}>
                                        <td>{i + 1}</td>
                                        <td>{restaurant.name}</td>
                                        <td>{restaurant.urlName}</td>
                                        <td>{restaurant.address}</td>
                                        <td style={{textAlign: "center"}}>
                                            <DeleteRestaurantModal restaurantId={restaurant.id}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            ) : (
                                <Card.Text>
                                    Il n'y a actuellement aucun restaurant d'inscrits.
                                </Card.Text>
                            )}
                            <Card.Footer className="text-muted card-foot">par <a
                                href={"https://www.infomaniak.com"} className="infomaniak-link">Infomaniak</a></Card.Footer>
                        </Card.Body>
                    </Card>
                </Container>
            );
        }
    }
}

export default DashboardAdmin;