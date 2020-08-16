import React, {Component} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ClientForm from "./components/ClientForm";
import ClientFormSuccess from "./components/ClientFormSuccess";
import Error404 from "./components/Error404";
import DashboardAdmin from "./components/DashboardAdmin";
import PasswordChangeForm from "./components/PasswordChangeForm";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurant: sessionStorage.getItem('restaurant'),
            admin: sessionStorage.getItem('admin') === "1" ? true : false
        }
    }

    componentDidMount() {
        this.setState({restaurant: sessionStorage.getItem('restaurant'), admin: sessionStorage.getItem('admin') === "1" ? true : false})
    }

    updateLogged = () => {
        this.setState({
            restaurant: sessionStorage.getItem('restaurant'),
            admin: sessionStorage.getItem('admin') === "1" ? true : false
        })
    }

    _logout = () => {
        sessionStorage.removeItem('restaurant');
        sessionStorage.removeItem('admin')
        this.updateLogged()
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => (
                        !this.state.restaurant ? (
                            <Login update={this.updateLogged} />
                        ) : (
                            <Redirect to={'/' + this.state.restaurant + '/dashboard'} />
                        )
                    )} />
                    <Route path="/register" render={() => (
                        !this.state.restaurant ? (
                            <Register update={this.updateLogged} />
                        ) : (
                            <Redirect to={'/' + this.state.restaurant + '/dashboard'} />
                        )
                    )} />
                    <Route path="/:restaurant/dashboard" render={() => (
                        this.state.restaurant ?  (
                            this.state.admin ? (
                                <DashboardAdmin />
                            ) : (
                                <Dashboard />
                            )
                        ) : (
                            <Redirect to='/' />
                        )
                    )} />
                    <Route path="/:restaurant/success">
                        <ClientFormSuccess />
                    </Route>
                    <Route path="/changepassword/:email/:token">
                        <PasswordChangeForm />
                    </Route>
                    <Route path="/404">
                        <Error404 />
                    </Route>
                    <Route path="/logout" render = {() => (
                        this.state.restaurant !== null ? this._logout() : (
                            <Redirect to={'/' + this.state.restaurant + '/dashboard'} />
                        )
                    )} />
                    <Route path="/:restaurant">
                        <ClientForm />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
