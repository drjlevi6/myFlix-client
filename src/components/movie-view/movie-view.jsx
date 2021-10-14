import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { scrollParent } from 'dom-helpers';

export class MovieView extends React.Component { 
  showGenreView() {
    console.log('MovieView.showGenreView:', movie);
  }

  render() {
    const { movie, onBackClick } = this.props;
  
    return (
      <Container className="movie-view">
        <Row className="movie-poster-row">
          <Col xs={6}>
          <img crossOrigin="anonymous" src={movie.imagePath} />
          </Col>
        </Row>

        <Alert className='title-description-alert' variant='info'>
          <Alert.Heading>Title:</Alert.Heading>
          <p>{movie.title}</p>
          <hr />
          <Alert.Heading>Description:</Alert.Heading>
          <p>{movie.description}</p>
        </Alert>

        <Row>
          <div className='genre-director-div'>
            <Button className='genre-button'  variant='primary' 
              as={Link} to={`/movies/genre/${movie.title}`}>Genre:
            </Button>
            <Button className='director-button'
              variant='primary' variant='primary' 
              as={Link} to={`/movies/director/${movie.title}`}>Director:
            </Button>
          </div>
        </Row>

        <Row className="back-button-row">
          <Button className="back-button"
            variant="dark" onClick={() => { onBackClick(null); }}>
            Back
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