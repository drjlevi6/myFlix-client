import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { scrollParent } from 'dom-helpers';

export class MovieView extends React.Component { 
  showGenreView() {
    console.log('MovieView.showGenreView:', movie);
  }

  render() {
    const { movie, onBackClick } = this.props;
    console.log('MovieView.render().this.props:', this.props);
    console.log('MovieView.render().this.state:', this.state);

    return (
      <Container className="movie-view">
          <Row className="movie-poster-row">
            <Col xs={6}>
            <img crossOrigin="anonymous" src={movie.imagePath} />
            </Col>
          </Row>
          <Row className="movie-title-row">
            <Col>
            <span className="label">Title: </span>
            <span className="value">{movie.title}</span>
            </Col>
          </Row>
          <Row className="movie-description-row">
            <Col>
            <span className="label">Description:&nbsp;</span>
            <span className="value movie-description">{movie.description}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
            <Button className='genre-button'  variant='primary' 
              as={Link} to={`/movies/genre/${movie.title}`}>Genre:
            </Button>
            </Col>
            <Col xs={4}>
            <Button className='director-button'
              variant='primary' >Director:
            </Button>
            </Col>
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