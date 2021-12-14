import './director-view.scss';
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

export class DirectorView extends React.Component {
  constructor(){
    super();
   }

  componentDidMount() {
    setMovieCardsTop(); //checked 20211211, needed
  }

  render() {
    const { movies, movie, onBackClick } = this.props;
    let date_of_death = (movie.director.death != '') ? 
      movie.director.death : '—';
    let this_directors_movies = movies.filter(m => 
      m.director.name === movie.director.name
    );
    return(
      <Container className="movie-view">  
        <Row className='top-controls-row' id='top-controls-row'>
          <Row className="top-buttons-row">
            <Col className='back-to-movie-col' xs={2}>
            <Button className='back-to-movie-button' variant='dark'
              onClick={() => history.back()}>
            &lt; Movie
                </Button>
            </Col>
            <Col className='director-name-col' xs={6}>
              <Alert className='director-name-alert' variant='info'>
              <Alert.Heading>{movie.director.name}</Alert.Heading>
              </Alert>
            </Col>
            <Col className='allMovies-profile-col' xs={4}>
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
          <Row className='birth-death-row'>
          <Col className='birth-death-col' xs={3}>
              Born: {movie.director.birth}
            </Col>
            <Col className='birth-death-col' xs={3}>
              Died: {date_of_death}
            </Col>
           </Row>
          <Row className='mini-bio-row'>
          <Alert className='data-area' variant='info'>
            <Alert.Heading>Mini-Bio:</Alert.Heading>
            <p>{movie.director.bio}</p>
          </Alert>
          </Row>
          <Row className='matching-movies-text-row'>
            <Col className='matching-movies-text-col' 
              xs={10} sm={7}>
                Some movies with this director are:
            </Col>
          </Row>
        </Row>
        <Row className='movie-cards-row'>
          {this_directors_movies.map(m => (
            <Col xs={7} sm={6} md={6} lg={4} key={m._id}>
            <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
    </Container>
    )
  }
}
