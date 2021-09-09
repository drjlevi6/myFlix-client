import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

export class MovieView extends React.Component { 

  render() {
    const { movie, onBackClick } = this.props;
    
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant='secondary'>Director</Button>
        </Link>

        <Link to ={`/genres/${movie.Genre.Name}`}>
          <Button variant='secondary'>Genre</Button>
        </Link>
      </div>
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