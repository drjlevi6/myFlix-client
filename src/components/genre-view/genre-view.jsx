import './genre-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import Card from 'react-bootstrap/Card';  //needed?

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

    render() {
      const { movies, movie, onBackClick } = this.props;
      let this_genres_movies = movies.filter(m => 
        m.genre.name === movie.genre.name
      );
      console.log(this_genres_movies);
      return(
        <Container className="movie-view">  
            <Row className="movie-poster-row">
              <Col xs={3}>
              <Button variant='dark'>
              &lt;&mdash;Movie
                  </Button>
              </Col>
              <Col xs={4}>
                <Alert className='data-area' variant='info'>
                <Alert.Heading>{movie.genre.name}</Alert.Heading>
                </Alert>
              </Col>
              <Col xs={5}>
                <ButtonGroup className="movies-profile-buttons" 
                  aria-label="All-Movies and Profile Buttons">
                  <Button>All Movies</Button>&nbsp; <Button>Profile</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Alert className='data-area' variant='info'>
              <Alert.Heading>Description:</Alert.Heading>
              <p>{movie.genre.description}</p>
            </Alert>
            <Row className='matching-movies-text-row'>
              <h6>Some movies with this genre are:</h6>
            </Row>
            <Row className='movie-cards-row'>
            {this_genres_movies.map(m => (
                      <Row>
                        <Col>
                        {m.title}
                        </Col>
                        <Col>
                        <MovieCard movie={m} />
                        </Col>
                      </Row>


            ))}
            </Row>
        </Container>
      )
    }
}
