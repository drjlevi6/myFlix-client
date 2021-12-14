import './genre-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import {setMovieCardsTop} from 
  '../common_components/common_components';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from "react-router-dom";
import { scrollParent } from 'dom-helpers';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class GenreView extends React.Component {
  constructor(){
    super();
  }

  componentDidMount() {
    setMovieCardsTop(); //checked 20211211, needed
  }

  render() {
    const { movies, movie, onBackClick } = this.props;
    let this_genres_movies = movies.filter(m => 
      m.genre.name === movie.genre.name
    );
    return(
      <Container className="movie-view">  
        <Row className='top-controls-row' id='top-controls-row'>
          <Row className="top-buttons-row">
            <Col className='back-to-movie-col' xs={4}>
            <Button className='back-to-movie-button' variant='dark'
              onClick={() => history.back()}>
            &lt; Movie
                </Button>
            </Col>
            <Col className='genre-name-col' xs={3}>
              <Alert className='genre-name-alert' variant='info'>
              <Alert.Heading>{movie.genre.name}</Alert.Heading>
              </Alert>
            </Col>
            <Col className='allMovies-profile-col' xs={5}>
              <ButtonGroup className="movies-profile-buttons" 
                aria-label="All-Movies and Profile Buttons">
                <Button as={Link} to='/' variant='dark'>
                  All Movies
                </Button>&nbsp; 
                <Button as={Link} to='/user' variant='dark'>
                  Profile
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Alert className='data-area' variant='info'>
            <Alert.Heading>Description:</Alert.Heading>
            <p>{movie.genre.description}</p>
          </Alert>
          <Row className='matching-movies-text-row'>
            <Col className='matching-movies-text-col' 
              xs={10} sm={7}>
                Some movies with this genre are:
            </Col>
          </Row>
        </Row>
        <Row className='movie-cards-row'>
          {this_genres_movies.map(m => (
            <Col xs={7} sm={6} md={6} lg={4} key={m._id}>
            <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
    </Container>
    )
  }
}
