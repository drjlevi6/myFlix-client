import './genre-view.scss';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { scrollParent } from 'dom-helpers';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class GenreView extends React.Component {
    constructor(){
      super();
    }

    render() {
      const { movie, onBackClick } = this.props;
      console.log(this.props);

      return (
        <Container className="movie-view">  
            <Row className="movie-poster-row">
              <Col xs={6}>
              <img crossOrigin="anonymous" src={movie.imagePath} />
              </Col>
            </Row>
            <Alert className='data-area' variant='info'>
              <Alert.Heading>Title: {movie.title}</Alert.Heading>
              <Alert.Heading>Genre: {movie.genre.name}</Alert.Heading>
              <p>{movie.genre.description}</p>
            </Alert>
     </Container>
      );
     }
}
