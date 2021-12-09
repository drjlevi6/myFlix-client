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
import {setMovieCardsTop} from '../common_components/common_components';


export class MovieCard extends React.Component {
  // that movie's imagePath, title, description are not
  // capitalized (differs from course text)
 
  componentDidMount() {
    setMovieCardsTop();
    /*
    let top_controls_row =document.getElementById('top-text-and-controls-row')
    let top_row_height = window.getComputedStyle(top_controls_row).height;
    let cards_row = document.getElementsByClassName('movie-cards-row')[0];
    cards_row.style.top = top_row_height;
    */
  }
  render() {
    const { movie } = this.props;
    console.log('movie-Card.render()');
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
