import React from 'react';
import axios from 'axios';
import "./main-view.scss"; /* file is currently empty, 
                            but we might need it later. */

import { BrowserRouter as Router, Route } from "react-router-dom"; 

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      user: null
    };
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

  /* exitMovieCard() provides a view to the MovieCard's Log Out 
    button, enabling the button to force a re-render using 
    setState(). */
  exitMovieCard() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.mainView.setState({
      movies: [],
      user: null
    });
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
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates 
  the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    window.mainView = this;
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
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route path="/" render={() => {
            return movies.map(m => (
              <Col sm={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
        </Row>
        <Row className="main-view justify-content-sm-center">
            <Col sm={6} className="d-grid mb-2">
              <Button className="return-button" variant="dark"
              onClick={this.exitMovieCard}>
                Log Out
              </Button>
            </Col>
        </Row>
        <Row className="main-view justify-content-md-center">
          <Route path="/movies/:movieId" 
            render={({ match }) => {
              return 
                <Col sm={8}>
                  <MovieView movie={movies.find(
                    m => m._id === match.params.movieId
                  )
                  } />
                </Col>
          }} />       
        </Row>
       </Router>
    );
  } // end if
} // end render

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
