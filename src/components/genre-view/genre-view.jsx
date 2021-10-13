import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { scrollParent } from 'dom-helpers';

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
            <Row className="movie-title-row">
              <Col>
              <span className="label">Title: </span>
              <span className="value">{movie.title}</span>
              </Col>
            </Row>
            <Row className="movie-description-row">
              <Col>
              <span className="label">Genre:{movie.genre.name}&nbsp;</span>
              <span className="value movie-description">{movie.genre.description}</span>
              </Col>
            </Row>
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