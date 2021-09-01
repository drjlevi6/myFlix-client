import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RegistrationView} from '../registration-view/registration-view'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Collapse } from 'bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication, 
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  function onRequestToRegister() {
    console.log("login-view.onRequestToRegister");
    setShowRegister(!showRegister)
  }

  if(showRegister) {
    return <RegistrationView />
  }
  return ( // onClick={onRequestToRegister}>register: 
    <Container>
        <Row className="justify-content-md-center">
            &nbsp;Log in or 
        </Row>
        <Row md={4} className="justify-content-md-center" >
            <Button className="register-button" variant="primary" 
              onClick={onRequestToRegister}>
              register
            </Button>
        </Row>
        <Row>&nbsp;</Row>

      <Form>
       <Form.Group className="mb-2" controlId="formUsername">
        <Row className="justify-content-md-center">
          <Col md={2}>
            <Form.Label>Username:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control type="text" onChange={e => 
              setUsername(e.target.value)} />
          </Col>
        </Row>
       </Form.Group>

        <Form.Group controlId="formPassword">
          <Row className="justify-content-md-center">
            <Col md={2}>
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col md={4}>
              <Form.Control type="password" onChange={
                e => setPassword(e.target.value)
              } />
            </Col>
          </Row>
        </Form.Group>

        <Row md={4} className="justify-content-md-center">
          &nbsp;
        </Row>       

        <Row md={4} className="justify-content-md-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
         </Row>

      </Form>
    </Container>
  );
}