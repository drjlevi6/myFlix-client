import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, ToggleButtonGroup} from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { scrollParent } from 'dom-helpers';
import Axios from 'axios';

export class MovieView extends React.Component { 
  showGenreView() {
    console.log('MovieView.showGenreView:', movie);
  }

  addToFavorites = (e) => {
    e.preventDefault();
    let Username = localStorage.getItem('user');
    let movieId = this.props.movie._id;
    let token = localStorage.getItem('token');
    let endpoint = 
		'https://drjs-myflix-app.herokuapp.com/users/' + Username + '/movies/' + movieId;
    Axios.post(endpoint, {}, { headers: { 'Authorization': `Bearer ${token}` } })
    .then( result => console.log(result) )
    .catch( error => console.log(error) )
  }

  removeFromFavorites = (e) => {
    e.preventDefault();
    let Username = localStorage.getItem('user');
    let movieId = this.props.movie._id;
    let token = localStorage.getItem('token');
    let endpoint = 
		'https://drjs-myflix-app.herokuapp.com/users/' + Username + '/movies/' + movieId;
    Axios.delete(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
    .then( result => console.log(result) )
    .catch( error => console.log(error) )
  }
 render() {
    const { movie, onBackClick } = this.props;
    
    return (
      <Container className="movie-view-container">
        <Row className="movie-poster-row" xs={8}>
        <Col className='alert-column'>
        <Row className='movie-title-row'>
          <Col className='movie-title-subcolumn' xs={7}>
          <Alert className='movie-title-alert' variant='info'>
            <Alert.Heading>{movie.title}</Alert.Heading>
          </Alert>
          </Col>
          <Col className='add-remove-button-group' xs={5}>
            <Row className='add-remove-text'>Manage Favorites:
             </Row>
          </Col>
        </Row>
        <Row className='movie-description-row' xs={9}>
        <Alert className='title-description-alert' variant='info'>
          <Alert.Heading>Description:</Alert.Heading>
          <p>{movie.description}</p>
        </Alert>
        </Row>
        </Col>

        <Col className='profile-image-column' xs={3}>
        <Row className='return-to-profile-row'>
          <Col className='return-to-profile-subcolumn' xs={12}>
            <Button className='return-to-profile-button' variant='secondary'
            onClick={onBackClick}>
              Return To Profile
            </Button>
          </Col>
        </Row>
        <Row className='image-row'>
          <img className='movie-image' xs={4}
            crossOrigin="anonymous" src={movie.imagePath} />
        </Row>
          </Col>

        </Row>

        <Row>
          <div className='genre-director-div'>
            <Button className='genre-button' variant='primary' 
              as={Link} to={`/movies/genre/${movie.title}`}>Genre:
            </Button>
            <Button className='director-button' variant='primary'
              as={Link} to={`/movies/director/${movie.title}`}>Director:
            </Button>
          </div>
        </Row>
        <Row>
        <Button onClick={this.addToFavorites}>
            Add to Favorites
          </Button>
          <Button onClick={this.removeFromFavorites}>
            Remove from Favorites
          </Button>
        </Row>

      </Container>
    );
  }
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};