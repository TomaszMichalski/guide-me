import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import Places from '../places/Places';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import {getAllCategories, getCurrentUser, getUserCategories} from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants/index';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import CategoryList from "../categories/Categories";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false,
            categories: [],
            userCategories: []
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.loadUserCategories = this.loadUserCategories.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading:true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                currentUser: response,
                authenticated: true,
                loading: false,
            }, () => this.loadUserCategories(this.state.currentUser.id));
        }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    loadCategories(){
        this.setState({
            loading:true
        });

        getAllCategories()
            .then(response => {
                this.setState({
                    categories: response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }
    loadUserCategories(userId){
        this.setState({
            loading:true
        });

        getUserCategories(userId)
            .then(response => {
                this.setState({
                    userCategories: response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null,
            userCategories: []
        });
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
        this.loadCategories();
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator/>
        }

        return (
            <div className="app">
                <div className="app-top-box">
                    <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
                </div>
                <div className="app-body">
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <PrivateRoute path="/places" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                      component={Places}></PrivateRoute>
                        <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                      component={Profile}></PrivateRoute>
                        <PrivateRoute path="/categories" authenticated={this.state.authenticated} categories={this.state.categories} currentUser={this.state.currentUser} userCategories={this.state.userCategories}
                                      component={CategoryList}></PrivateRoute>
                        <Route path="/login"
                               render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/signup"
                               render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
                <Alert stack={{limit: 3}}
                       timeout = {3000}
                       position='top-right' effect='slide' offset={65} />
            </div>
        );
    }
}

export default App;