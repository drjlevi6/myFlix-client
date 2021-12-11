import React, { StrictMode } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import "./main-view.scss";

import { BrowserRouter as Router, Route } from "react-router-dom"; 

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import {setMovieCardsTop} from '../common_components/common_components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { render } from 'react-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { scrollLeft } from 'dom-helpers';

var mainView;

export default class MainView extends React.Component {
  constructor(){
    super();
    localStorage.clear();
    this.state = { movies: [], user: null, search_string_low: '',
      do_sort: false};
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
    console.log('main-view: componentDidMount()');
    window.addEventListener('resize', setMovieCardsTop() );
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
    var mainView = this;
    let User = authData.user.Username;
    this.setState({
      user: User
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('favorite_ids', authData.user.FavoriteMovies);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://drjs-myflix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {     // response.data is the array of movies
      // Assign the result to the state (jl: and also localStorage)
       this.setState({
        movies: response.data
      });
    })
   .catch(function (error) {
      console.log(error);
    });
   }

  render() {  // React allows "className" in <div>s! 
    const { movies, user, search_string_low, do_sort } = this.state;
    let modified_movies = deepCopy(movies);
    if(search_string_low) {
      modified_movies = movies.filter(m =>
          m.title.toLowerCase().includes(search_string_low)
      )
    } else if (do_sort) {
      modified_movies = deepCopy(movies).sort((m,n) =>  
        (m.title.toLowerCase() < n.title.toLowerCase()) ? -1 : 1)
    }

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
    let search_sort_column_width = 6;
    return (
      <Container className='router-container'>
        <Router className='router'>
          <Row className="main-view-row justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return 
                <Col>
                  <LoginView onLoggedIn={
                    user => this.onLoggedIn(user)
                  } />
                </Col>
              return( 
                <div>
                  <Row className='top-controls-row'
                    id='top-controls-row'>
                    <Col className='search-sort-controls-column' 
                        xs={search_sort_column_width}>
                      <Row className='search-sort-text-row'>
                        <h5 className='search-sort-text'>
                          Search/Sort Movies By Title:
                        </h5>
                      </Row>
                      <Row className='search-sort-controls-row'>
                        <Col className='search-input-group-column' xs={8}>
                          <InputGroup className='search-input-group'>
                            <InputGroup.Text className='input-group-search-text'>
                              Search
                            </InputGroup.Text>
                            <FormControl className='search-textarea' id='searchForm'
                              type='text' placeholder="Movie Name" 
                                onChange={this.searchMovieCards}
                             />
                          </InputGroup>
                        </Col>
                        <Col className='sort-button-column'>
                          <Button className='sort-button' type='button'
                            onClick={this.sortMoviesByTitle}>
                              Sort
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='return-to-profile-column'
                        xs={3}>
                      <Row className='return-to-profile-row'>
                        <Button className='profile-button' variant='dark'
                          onClick={() => history.back()}>
                            Return To Profile
                        </Button>
                      </Row>
                      <Row className='revert-row'>
                        <Button className='button' variant='dark'
                          onClick={this.revertMovieCards}>
                            Revert Cards
                        </Button>
                      </Row>
                   </Col>
                  </Row>                  
                  <Row className='movie-cards-row'>
                    {modified_movies.map(m => (
                      <Col xs={7} sm={5} md={4} lg={3} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    ))}
                  </Row>
                </div>
              ) // e
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

// deepCopy: deep clone of a "JSON-able" array (specifically, the movies array)
// Thanks Atta-Ur_Rehman Shah,
//   https://attacomsian.com/blog/javascript-deep-clone-array
function deepCopy(json_able) {
  return JSON.parse(JSON.stringify(json_able));
}

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
