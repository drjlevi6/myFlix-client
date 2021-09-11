import axios from 'axios';
import "./main-view.scss"; /* file is currently empty, 
                            but we might need it later. */

import { BrowserRouter as Router, Route } from 
  "react-router-dom";

import Container from 'react-bootstrap/Container';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { RegistrationView } from 
  '../registration-view/registration-view';
import "./main-view.scss"; /* file is currently empty,
                            but we might need it later. */

export default class MainView extends React.Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    console.log("componentDidMount.accessToken:", accessToken);
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
    

  /* When a movie is clicked, this function is invoked and 
    updates the state of the `selectedMovie` *property 
    to that movie */
  setSelectedMovie = movie => {
    console.log(movie._id);
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates 
  the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log("main-view.onLoggedIn.authData:", authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    console.log("main-view.getMovies: token =", token);
    axios.get('https://drjs-myflix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log("main-view.getMovies: response =", response);
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;
    console.log("main-view.jsx.render(): user =", user);
 
    /* <!--If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are 
    *passed as a prop to the LoginView--> */
    if (!user) return (
      <Row>
        <Col>
          <LoginView onLoggedIn={user => 
            this.onLoggedIn(user)} />
        </Col>
      </Row>
    )
    
    if (movies.length === 0)
      return <div className="main-view" />;

    /*if(selectedMovie) {
      return <MovieView movie={selectedMovie} onBackClick={
        () => this.setState({selectedMovie: null})
      }/>
    }*/

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
                <Col md={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
          ))
        }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return (
              <Col sm={4}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
                 />
              </Col>
            )
          }} />

        </Row>
      <Row className="justify-content-md-center">
        <Col sm={4}>
          <Button variant="dark" onBackClick={
            () => {
              history.push("/");
            }
          }>
            Back
          </Button>
        </Col>
      </Row>
      </Router>
    );
  }
}

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
