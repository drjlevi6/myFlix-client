import axios from 'axios'; // 3.6
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import {RegistrationView} from '../registration-view/registration-view'
import { Collapse } from 'bootstrap';
import './login-view.scss';
//import "../universal-components/elements.scss"; // for elements in mult. views 

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://drjs-myflix-app.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    /* then call props.onLoggedIn(username), which provides 
      the username to our parent component (child to parent 
      communication) */
    .then (response => {
      const data = response.data;
      setLoggedIn(true);
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log(e);
      alert(String(e));

    });
  };
  
  
  function onRequestToRegister() {
    console.log("login-view.onRequestToRegister");
    setShowRegister(!showRegister)
  }

  if(showRegister) {
    return <RegistrationView back={onRequestToRegister} />
  }
  if (loggedIn) {
    return <Redirect to='/user' />
  }
  // give Buttons 'className="d-grid gap-2"' to allow full width
  return ( // onClick={onRequestToRegister}>register: 
    <Container>
      <Col>
        <Row className="justify-content-md-center header-text">
          <Col>
            Log In Or Register:
          </Col>
        </Row>
        <Row className="justify-content-md-center" >
          <Col className="d-grid gap-2">
            <Button className="register-button" variant="dark" 
              onClick={onRequestToRegister}>
              Register
            </Button>
          </Col>
        </Row>
        <Row>&nbsp;</Row>

      <Form>
       <Form.Group className="mb-2" controlId="formUsername">
        <Row>
          <Col xs={3}>
            <Form.Label>Username:</Form.Label>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
           <Col>
             <Form.Control type="text" placeholder="Enter username"
              value={username} onChange={e => 
              setUsername(e.target.value)} />
          </Col>
        </Row>
       </Form.Group>

        <Form.Group controlId="formPassword">
          <Row>
            <Col xs={3}>
              <Form.Label>Password:</Form.Label>
            </Col>
          </Row>
          <Row className="justify-content-md-center mb-2">
            <Col>
              <Form.Control type="password" 
                 placeholder="Password" value={password} 
                onChange={
                  e => setPassword(e.target.value)
                } />
            </Col>
          </Row>
        </Form.Group>

        <Row  className="justify-content-md-center">
          <Col className="d-grid gap-2">
          <Button variant="dark" type="submit" 
            onClick={handleSubmit}>
            Log In
          </Button>
          </Col>
         </Row>
      </Form>
      </Col>
    </Container>
  );
}