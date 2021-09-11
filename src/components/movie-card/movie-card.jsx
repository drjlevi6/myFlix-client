import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./movie-card.scss"; // (might need it later)

export class MovieCard extends React.Component {
  render() {
<<<<<<< Updated upstream
    const { movie, onMovieClick } = this.props;
=======
    const { movie} = this.props;
    console.log("MovieCard._id:", movie._id, movie.title);
>>>>>>> Stashed changes
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
<<<<<<< Updated upstream
          <Card.Title>{movie.title}</Card.Title>
          <Button onClick={() => onMovieClick(movie)} 
            variant="primary">Open
          </Button>
=======
          <Card.Title className="movie-title">{movie.title}</Card.Title>
          <Card.Text className="movie-text">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
>>>>>>> Stashed changes
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
