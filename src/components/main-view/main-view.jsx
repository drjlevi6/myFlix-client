import React from 'react';
import axios from 'axios';
import "./main-view.scss"; /* file is currently empty, 
                            but we might need it later. */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
  setSelectedMovie(movie) {
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;
 
    /* <!--If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are 
    *passed as a prop to the LoginView--> */
    if (!user) {
      return <LoginView onLoggedIn={user => 
        this.onLoggedIn(user)} />;
    }

    // /* <!--Before the movies have been loaded
    // If the state of `selectedMovie` is not null, that 
    //  selected movie will be returned otherwise, all 
    //  *movies will be returned.--> */
   if (movies.length === 0) {
      // Why isn't the key assignment working? (typeof movies = object)
      return <div></div>
    }; // end return

    return (
    //  <div className="main-view">
      <Container>
        {selectedMovie ? 
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <MovieView movie={selectedMovie}
                  onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie) 
                  }}/>
              </Col>
            </Row>
          : (
              <Row className="justify-content-md-center">
                {movies.map(movie => (
                  <Col xs={4} key={movie._id} >
                    <MovieCard
                      movie={movie}
                      title={movie.title}
                      imagePath={movie.imagePath}
                      onMovieClick={(newSelectedMovie) => {
                        this.setSelectedMovie(newSelectedMovie); }} />
                  </Col>
                ))}
              </Row>
            )
        }
        <Button variant="dark" 
          onClick={() => { this.onLoggedOut() }}>
            Logout</Button>
        </Container>
    //  </div>
    )

  } // end if
} // end render

// There's no MainView.propTypes because no props are passed to MainView
// during instantiation.
