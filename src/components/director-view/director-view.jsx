import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { movie, onBackClick } = this.props;

    let director = movie.director;
    return (
      <Container className="director-view">
        <Row className="movie-poster-row">
          <Col xs={6}>
          <img crossOrigin="anonymous" src={movie.imagePath} />
          </Col>
        </Row>
        <Alert variant='info'>
          <Alert.Heading>Director:</Alert.Heading>
          <p>{director.name}</p>
          <hr />
          <Alert.Heading>Bio:</Alert.Heading>
          <p>{director.bio}</p>
          <Alert.Heading>Birth year:</Alert.Heading>
          <p>{director.birth}</p>
          <Alert.Heading>Death year:</Alert.Heading>
          <p>{director.death}</p>
        </Alert>
        <Row className="back-button-row">
          <Button className="back-button"
            variant="dark" onClick={() => { onBackClick(null); }}>
            Back
          </Button> 
        </Row>
      </Container>
    );
  }
}