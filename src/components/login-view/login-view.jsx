import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RegistrationView} from '../registration-view/registration-view'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Collapse } from 'bootstrap';
import './login-view.scss';
import "../universal-components/elements.scss"; // for elements in mult. views 
import axios from 'axios'; // 3.6

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    console.log("handleSubmit, sending to Axios", username, password);
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://drjs-myflix-app.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      console.log("login-view.handleSubmit.data:", data);
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };
  
  
  function onRequestToRegister() {
    console.log("login-view.onRequestToRegister");
    setShowRegister(!showRegister)
  }

  if(showRegister) {
    return <RegistrationView back={onRequestToRegister} />
  }

  // give Buttons 'className="d-grid gap-2"' to allow full width
  return ( // onClick={onRequestToRegister}>register: 
    <Container>
      <Col sm={10}>
        <Row className="justify-content-md-center header-text">
          <Col sm={8}>
            Log in or
          </Col>
        </Row>
        <Row className="justify-content-md-center" >
          <Col sm={10} className="d-grid gap-2">
            <Button className="register-button" variant="primary" 
              onClick={onRequestToRegister}>
              register
            </Button>
          </Col>
        </Row>
        <Row>&nbsp;</Row>

      <Form>
       <Form.Group className="mb-2" controlId="formUsername">
        <Row className="justify-content-md-center">
          <Col sm={3}>
            <Form.Label>Username:</Form.Label>
          </Col>
          <Col sm={6}>
            <Form.Control type="text" placeholder="Enter username" 
              value={username} onChange={e => 
              setUsername(e.target.value)} />
          </Col>
        </Row>
       </Form.Group>

        <Form.Group controlId="formPassword">
          <Row className="justify-content-md-center mb-2">
            <Col sm={3}>
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col sm={6}>
              <Form.Control type="password" 
                 placeholder="Password" value={password} 
                onChange={
                  e => setPassword(e.target.value)
                } />
            </Col>
          </Row>
        </Form.Group>

        <Row  className="justify-content-md-center">
          <Col sm={10} className="d-grid gap-2">
          <Button variant="primary" type="submit" 
            onClick={handleSubmit}>
            Submit
          </Button>
          </Col>
         </Row>
      </Form>
      </Col>
    </Container>
  );
}