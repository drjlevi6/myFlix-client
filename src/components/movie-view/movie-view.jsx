import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component { 

  render() {
    const { movie, onBackClick } = this.props;
    
    return (
      <Container className="movie-view">

          <div className="movie-poster">
            <img crossOrigin="anonymous" src={movie.imagePath} />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.description}</span>
          </div>
          <Button variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>

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