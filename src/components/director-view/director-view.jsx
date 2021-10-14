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
      <Alert variant='info'>
        <Alert.Heading>Director:</Alert.Heading>
        <p>{director.name}</p>
      </Alert>
    )
  }
}