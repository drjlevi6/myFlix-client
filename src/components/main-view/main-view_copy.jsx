import React from 'react';
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
    this.state = { movies: [], user: null };
    mainView = this;
    window.addEventListener('resize', this.adjustTopControlsRowHeight);
  }

  filterMovieCardsByName() { 
    var searchStringLower = null;
    let nameInput = document.querySelector('#searchForm');
    console.log('filterMovieCardsByName().nameInput:', nameInput);

    let filterPromise = new Promise((filterResult, filterRejection) => {
      nameInput.addEventListener('input', () => {
        let userInput = getUserString(nameInput);
        if (userInput) {
          filterResult(userInput)
        } else {
          filterRejection();
        }; 
      });
    });
    filterPromise
    .then( (filterResult) => {
      console.log('filterResult:', localStorage.getItem('searchStringLower'));
    },
    (filterRejection) => {
      console.log('filterRejection: Failure');
    }, false);

    let movieCardColumnList = document.querySelectorAll('.main-card-col');
    searchStringLower = localStorage.getItem('searchStringLower');
    var card_i = null;
    for (let i=0; i<movieCardColumnList.length; i++) {
      card_i = movieCardColumnList[i]; // (for convenience only)
      [card_i.style.display, card_i.style.width] = 
(card_i.querySelector('.card-title').innerText.toLowerCase().includes(searchStringLower)) ? 
      ['flex', '100%'] : ['none', '0%'];
    }

   let movieCardList = document.querySelectorAll('.card');
    searchStringLower = localStorage.getItem('searchStringLower');
    for (let i=0; i<movieCardList.length; i++) {
      let movieTitleLower = 
        movieCardList[i].querySelector('.card-title').innerText.toLowerCase();
      console.log('\'' +  movieTitleLower + '\'.includes(\'' + searchStringLower + '\'):', 
        movieTitleLower.includes(searchStringLower));
    }

    async function getUserString(nameInput) {
      let searchStringLower = nameInput.value.toLowerCase();
      localStorage.setItem('searchStringLower', searchStringLower);
      console.log('\nnameInput.addEventListener.searchStringLower:',
        searchStringLower);
      return (localStorage.getItem('searchStringLower')) ? 
        localStorage.getItem('searchStringLower') : null;
    }
 }
  


  // Adjust top of movie-cards dynamically, according to height of top row.
  adjustTopControlsRowHeight() {
    let all_top_text_and_controls_rows = 
      document.getElementsByClassName('top-text-and-controls-row');
    if (all_top_text_and_controls_rows.length > 0) {
      let top_text_controls_row = all_top_text_and_controls_rows[0];
      let top_row_height = window.getComputedStyle(top_text_controls_row).height;
      let cards_row = document.getElementsByClassName('movie-cards-row')[0];
      cards_row.style.top = top_row_height;
    }
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
    const { movies, user } = this.state;
    localStorage.setItem('movies', movies); // used in MainView if there are MovieCards
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
    let filter_sort_column_width = 6;
    let return_to_profile_column_width = 12 - filter_sort_column_width;
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
                  <Row className='top-text-and-controls-row'>
                    <Col className='filter-sort-controls-column' 
                        xs={filter_sort_column_width}>
                      <Row className='filter-sort-text-row'>
                        <h5 className='filter-sort-text'>
                          Filter/Sort Movies By Name:
                        </h5>
                      </Row>
                      <Row className='filter-sort-controls-row'>
                        <Col className='filter-input-group-column' xs={9}>
                          <InputGroup className='filter-input-group'>
                            <InputGroup.Text className='input-group-filter-text' xs={9}>
                              Filter
                            </InputGroup.Text>
                            <FormControl className='filter-textarea' id='searchForm'
                              type='text' placeholder="Movie Name" 
                                onKeyPress={this.filterMovieCardsByName}
                             />
                          </InputGroup>
                        </Col>
                        <Col className='sort-button-column' xs={3}>
                          <Button className='sort-button'>Sort</Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col className='return-to-profile-column'
                        xs={12-filter_sort_column_width}>
                      <Button className='profile-button' variant='dark'
                        onClick={() => history.back()}>
                          Return To Profile
                      </Button>
                    </Col>
                  </Row>                  
                  <Row className='movie-cards-row'>
                    {movies.map(m => (
                      <Col xs={7} sm={5} md={4} lg={3} xl={2} key={m._id}>
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
                    <MovieView 
                      movie={movies.find(
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

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
