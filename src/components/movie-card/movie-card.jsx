import React from 'react';
import PropTypes from 'prop-types';
import "./movie-card.scss"; // file is currently empty, but we might need it later.

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (<div className="movie-card" onClick={
      () => { onMovieClick(movie); }
    }>{movie.title}</div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
