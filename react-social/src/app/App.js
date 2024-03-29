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
import Groceries from '../user/groceries/Groceries';
import Countries from '../user/countries/Countries';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { getGroceriesForCurrentlyLoggedInUser } from '../util/APIUtils';
import { getCountriesForCurrentlyLoggedInUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
      groceries: [],
      countries: []
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.loadGroceriesForCurrentlyLoggedInUser = this.loadGroceriesForCurrentlyLoggedInUser.bind(this);
    this.loadCountriesForCurrentlyLoggedInUser = this.loadCountriesForCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  loadGroceriesForCurrentlyLoggedInUser() {
           getGroceriesForCurrentlyLoggedInUser()
                 .then(response => {
                      console.log(response);
                       this.setState({
                             groceries: response
                       });
                 });

    
  }
  loadCountriesForCurrentlyLoggedInUser() {
    getCountriesForCurrentlyLoggedInUser()
          .then(response => {
               console.log(response);
                this.setState({
                      countries: response
                });
          });
         }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
    this.loadGroceriesForCurrentlyLoggedInUser();
    this.loadCountriesForCurrentlyLoggedInUser();
    location.reload;
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>
            <PrivateRoute path="/groceries" authenticated={this.state.authenticated}
                groceries={this.state.groceries} currentUser={this.state.currentUser}
                          component={Groceries}></PrivateRoute>
            <PrivateRoute path="/countries" authenticated={this.state.authenticated}
                countries={this.state.countries} currentUser={this.state.currentUser}
                          component={Countries}></PrivateRoute>
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
