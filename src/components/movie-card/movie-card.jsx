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
    console.log("movie-card.openMovieView().this.movie", cardProps);
  }

  render() {
    const { movie } = this.props;

    return (
      <Card className="card">
        <Card.Img crossOrigin="anonymous" variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link" onClick={this.openMovieView(this.props)}>
              Open
            </Button>
          </Link>
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
