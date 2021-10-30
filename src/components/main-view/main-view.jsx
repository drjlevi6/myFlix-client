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
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

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
    localStorage.clear();
    this.state = {
      movies: [],
      user: null
    };
    mainView = this;
  }

  moveBottomButtonsDiv(oldWinHeight) {
    let newWinHeight = window.innerHeight;
   console.log('moveBottomButtonsDif: Starting window height is',
   oldWinHeight);
   console.log(
    document.getElementsByClassName("bottom-buttons-div").length,
    '\n', 'New window height:', newWinHeight
   );
   return newWinHeight;
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
    let User = authData.user.Username;
    this.setState({
      user: User
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
    var mainView = this;
    
    /* <!--If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are 
    *passed as a prop to the LoginView--> */
    if (!user) {
      return (
        <Row>
          <Router>
          <Col>
            <LoginView onLoggedIn={user => 
              this.onLoggedIn(user)} />
          </Col>
          </Router>
        </Row>
      )
    }

    // /* <!--Before the movies have been loaded
    // If the state of `selectedMovie` is not null, that 
    //  selected movie will be returned otherwise, all 
    //  *movies will be returned.--> */
    if (movies.length === 0) {
       return <div className="main-view" />
    }

       return (
        <Container className='router-container'>
          <Router className='router'>
          <Row className="main-view-row justify-content-md-center">
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col xs={7} sm={4} md={4} lg={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route exact path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                  <Col md={8}>
                    <MovieView 
                      movie={movies.find(
                          m => (m._id === match.params.movieId)
                      )} 
                      onBackClick={() => history.push("/")}
                    />
                  </Col>
                )
            }} />       
            <Route exact path="/user"
              render={({ match, history }) => {
                return (
                  <Col>
                    <ProfileView 
                    />
                  </Col>
                )
            }} />       
            <Route exact path="/movies/genre/:title"
              render={({ match, history }) => {
                let mTitle = match.params.title;
                return (
                  <Col md={8}>
                    <GenreView 
                      genre={movies.find(
                          m => ( m.title === mTitle )
                      ).genre}
                      movie={movies.find(  m => (m.title === mTitle))} 
                      onBackClick={() => history.goBack()}/>
                  </Col>
                )
            }} />  
            <Route exact path='/movies/director/:title'   
              render={({ match, history }) => {
                let mTitle = match.params.title;
                return (
                  <Col md={8}>
                    <DirectorView
                      movie={movies.find( m => (m.title === mTitle))}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                )
            }} />  
          </Row>
          <div className='bottom-buttons-div'>
            <Row className="back-button-row">
              <Col className="d-grid">
                <Button className="back-button"
                  variant="dark" onClick={() => history.back()}>
                  Go Back
                </Button>
              </Col>
            </Row>
            <Row className="logout-button-row justify-content-sm-center">
              <Col className="d-grid">
                <Button className="logout--button" variant="dark"
                onClick={this.onLoggedOut}>
                  Log Out
                </Button>
              </Col>
            </Row>
          </div>

        </Router>
      </Container>
    );
  } // end if
} // end render

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
