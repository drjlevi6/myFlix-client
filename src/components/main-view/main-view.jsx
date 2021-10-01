import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import "./main-view.scss";
//import "../../index";

import { BrowserRouter as Router, Route } from "react-router-dom"; 

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

var mainView;

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      user: null
    };
    mainView = this;
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    console.log("main-view.onLoggedOut()");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.pathname="/";
  }

  /* When a movie is clicked, this function is invoked and 
    updates the state of the `selectedMovie` *property 
    to that movie */
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates 
  the `user` property in state to that *particular user*/

  onLoggedIn(authData) {

    var mainView = this;
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://drjs-myflix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //console.log("main-view.getMovies().response:", response);
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
   .catch(function (error) {
      console.log(error);
    });
   }

  render() {
    const { movies, user } = this.state;
    console.log("main-view.render().this.state:", this.state);
    var mainView = this;
 
    /* <!--If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are 
    *passed as a prop to the LoginView--> */
    if (!user) {
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={user => 
              this.onLoggedIn(user)} />
          </Col>
        </Row>
      )
    }

    // /* <!--Before the movies have been loaded
    // If the state of `selectedMovie` is not null, that 
    //  selected movie will be returned otherwise, all 
    //  *movies will be returned.--> */
    if (movies.length === 0)
       return <div className="main-view" />

       return (
      <Container>
       <Router>
       <Row className="main-view justify-content-md-center">
       <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col xs={12} sm={6} md={4} lg={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView 
                    movie={movies.find(  m => (m._id === match.params.movieId))} 
                    onBackClick={() => history.push("/")}
                  />
                </Col>
              )
          }} />       
          <Route path="/genre"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView 
                    movie={movies.find(  m => (m._id === match.params.movieId))} 
                    onBackClick={() => history.push("/")}
                  />
                </Col>
              )
          }} />       
        </Row>

        <Row className="main-view justify-content-sm-center">
          <Col className="d-grid">
            <Button className="return-button" variant="dark"
            onClick={this.onLoggedOut}>
              Log Out
            </Button>
          </Col>
        </Row>
      
       </Router>
       </Container>
    );
  } // end if
} // end render

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
