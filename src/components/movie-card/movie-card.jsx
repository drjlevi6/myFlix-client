import React from 'react';
import PropTypes from 'prop-types';
import "./movie-card.scss"; // (might need it later)

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import MovieVew from "../movie-view/movie-view";

export class MovieCard extends React.Component {
  // that movie's imagePath, title, description are not
  // capitalized (differs from course text)

  openMovieView(cardProps) {
  }

  render() {
    const { movie } = this.props;

    return (
      <Card className="card">
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
            <Button as={Link} to={`/movies/${movie._id}`} variant="primary" >
              Open
            </Button>
        </Card.Body>
      </Card>
    ); // end return
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired
};
