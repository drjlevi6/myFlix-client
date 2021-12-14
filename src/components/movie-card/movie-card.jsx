import React from 'react';
import PropTypes from 'prop-types';
import "./movie-card.scss"; // (might need it later)
import '../genre-view/genre-view';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import MovieVew from "../movie-view/movie-view";
import {setMovieCardsTop} from 
  '../common_components/common_components';

export class MovieCard extends React.Component {
  // that movie's imagePath, title, description are not
  // capitalized (differs from course text)
  
  // All the views with MovieCards need a top element 
  // .top-controls-row, or setMovieCardsTop() will crash.
  
  componentDidMount() {
    setMovieCardsTop(); //checked 20211211, needed
  }
  
  render() {
    const { movie } = this.props;
    return (
      <Container className='movie-card-container'>
        <Col className='main-card-col'>
          <Card className="card">
            <Card.Img crossOrigin="anonymous" variant="top" 
              src={movie.imagePath} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
                <Row>
                <Button as={Link} to={`/movies/${movie._id}`} 
                  variant="primary" >
                    Open
                  </Button>
                </Row>
            </Card.Body>          
          </Card>
        </Col>
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
