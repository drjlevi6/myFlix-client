import React, { StrictMode } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "./main-view.scss";

import { BrowserRouter as Router, Route } from "react-router-dom"; 

// #0
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { MovieCard } from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } 
  from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import {setMovieCardsTop} 
  from '../common_components/common_components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { render } from 'react-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { scrollLeft } from 'dom-helpers';


// #2 export keyword removed from here
class MainView extends React.Component {
  constructor(){
    super();
    //localStorage.clear();
    // #3 movies state removed from here
    this.state = { user: null };
  }

  // Search movie-cards per user search string (case-insensitive)
  searchMovieCards = (e) => {
    const {search_string_low, do_sort} = this.state;

    this.setState( {
        search_string_low: e.target.value.toLowerCase(),
        do_sort: false
      });
  }

  // Sort all movies by title (case-insensitive)
  // Here we just set a flag; actual sorting is in render().
  sortMoviesByTitle = () => {
    const { search_string_low, do_sort }  = this.state;
    this.setState({ search_string_low: '', do_sort: true });
  }

  // "Convenience" button
  revertMovieCards = () => {
    this.setState({
      search_string_low: '', do_sort: false//,
    });
  }
  
  moveBottomButtonsDiv(oldWinHeight) {
    return window.innerHeight;
  }

  componentDidMount() {
    window.addEventListener('resize', setMovieCardsTop );
    let accessToken = localStorage.getItem('token');
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
   // let User = this.newMethod(authData);
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('favorite_ids', authData.user.FavoriteMovies);
    localStorage.setItem('user', authData.user.Username);
    console.log('main-view.onLoggedIn().authData:', authData);
    this.getMovies(authData.token);
  }

  newMethod(authData) {
    return authData.user.Username;
  }

  getMovies(token) {
    axios.get('https://drjs-myflix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {     // response.data is the array of movies
      // Assign the result to the state (jl: and also localStorage)
      // #4
       this.props.setMovies(response.data);
      })
   .catch(function (error) {
      console.log(error);
    });
   }

  render() {  // React allows "className" in <div>s! 
    // #5 movies is extracted from this.props
    // rather than from the this.state
    let { movies, user } = this.props;
    return (
      <Container className='router-container'>
        <Router className='router'>
          <Row className="main-view-row justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={
                    user => this.onLoggedIn(user)
                  } />
                </Col>
              )
                if (movies.length === 0) 
                  return <div className="main-view" />;
                // #6
                return <MoviesList movies={movies}/>;
            }} />

            <Route path="/register" render={() => {
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route exact path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                  <Col md={8}>
                    <MovieView movie={movies.find(
                          m => (m._id === match.params.movieId)
                      )} 
                      onBackClick={() => history.push("/user")}
                    />
                  </Col>
                )
            }} />       
            <Route exact path="/user"
              render={({ match, history }) => {
                return (
                  <Col>
                    <ProfileView movies={this.state.movies}
                    />
                  </Col>
                )
            }} />       
            <Route exact path="/movies/genre/:title"
              render={({ match, history }) => {
                let mTitle = match.params.title;
                return (
                  <Col md={8}>
                    <GenreView movies={movies}
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
                    <DirectorView movies={movies}
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
              <Col className="d-grid">
                <Button className="logout-button" variant="dark"
                onClick={this.onLoggedOut}>
                  Log Out
                </Button>
              </Col>
            </Row>
          </div>
        </Router>
      </Container>
    );  // end return
  } // end if
} // end class

// #7
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

// #8
export default connect(mapStateToProps, 
    { setMovies, setUser } )(MainView);
