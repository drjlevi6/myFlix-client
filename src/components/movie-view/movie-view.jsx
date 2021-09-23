import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { scrollParent } from 'dom-helpers';

export class MovieView extends React.Component { 

  render() {
    const { movie, onBackClick } = this.props;
    
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