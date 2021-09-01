import React from 'react';
import { ReactDOM } from "react-dom";
import "./registration-view.scss"
import "../button/button.scss"; // Use for custom-styled submit buttons
import "../universal-components/elements.scss"; // for elements in mult. views
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export class RegistrationView extends React.Component {
  constructor(){
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null
    }; // end this.state
  } // end constructor
  
  handleSubmit() {
  }

  render() {
    return (
      <Container>
        <Col xs={10}>
        <Form>
          <Form.Group controlId="headerWithFiller">
          <Row className="justify-content-md-center header-text">
          <Col className="justify-content-md-center">
            <Form.Label className='header-text'>
            	Register for myFlix:
            </Form.Label>
          </Col>
          </Row>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formUsername">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Username:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='text' />
          </Col>
          </Row>
          </Form.Group>
          
          <Form.Group className="mb-2" controlId="formUsername">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Password:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='text' />
          </Col>
          </Row>
          </Form.Group>
          
          <Form.Group className="mb-2" controlId="formUsername">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Email:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='text' />
          </Col>
          </Row>
          </Form.Group>
          
          <Form.Group className="mb-2" controlId="formUsername">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Birthday:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='text' />
          </Col>
          </Row>
          </Form.Group>

        <Row className="justify-content-md-center">
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
         </Row>

        </Form>
        </Col>
      </Container>
    ) // end return
  } // end render
} // end class
