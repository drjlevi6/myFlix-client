import React from 'react';
import PropTypes from 'prop-types';
import "./movie-card.scss"; // (might need it later)
import '../genre-view/genre-view';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import MovieVew from "../movie-view/movie-view";


export class MovieCard extends React.Component {
  // that movie's imagePath, title, description are not
  // capitalized (differs from course text)

  openMovieView(cardProps) {
  }

  openGenreView() {
    console.log('movie-card.openGenreView()');
    //console.log('movie-card.openGenreView(): this:', this);
    //console.log(movie.genre.name);
  }
//     <Container>    
 
  render() {
    const { movie } = this.props;

   return (
    <Container>
        <Card className="card">
          <Card.Img crossOrigin="anonymous" variant="top" src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
              <Row>
              <Button as={Link} to={`/movies/${movie._id}`} variant="primary" >
                  Open
                </Button>
              </Row>
          </Card.Body>          
        </Card>
        <Row className="back-button-row">
          <Button className="back-button"
            variant="dark" onClick={() => history.back()}>
            Back
          </Button>
        </Row>
        </Container>
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
