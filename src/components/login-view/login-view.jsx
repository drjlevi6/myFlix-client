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
import Alert from 'react-bootstrap/Alert';
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
    <Container className='login-body-container'>
        <Row className='splash-screen-row'>
          <Alert className='splash-screen-alert' variant="primary">
            <Alert.Heading>
              Welcome to Dr. Jonathan Levi’s myFlix movie application!
            </Alert.Heading>
            Please login or register to view our lists of movies, directors, 
              genres and more!
          </Alert>
        </Row>
        <Form className='login-form'>
        <Form.Group className="mb-2" controlId="formUsername">
          <Row className='username-row'>
            <Col className='username-password-headers-column' xs={3} sm={2}>
              <Form.Label>Username:</Form.Label>
            </Col>
            <Col className='username-textfield-column'>
              <Form.Control type="text" placeholder="Enter username"
              value={username} onChange={e => 
              setUsername(e.target.value)} />
           </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Row>
            <Col className='username-password-headers-column' xs={3} sm={2}>
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col>
              <Form.Control type="password" 
                placeholder="Password" value={password} 
                onChange={
                  e => setPassword(e.target.value)
                } />
            </Col>
          </Row>
        </Form.Group>
        </Form>

        <Row className='login-button-row justify-content-xs-right'
          xs={10}>
          <Col className='login-column' xs={3}>
          <Button className='right' variant="primary" type="submit" 
            onClick={handleSubmit}>
            Log In
          </Button>
          </Col>
          <Col className='register-column' xs={3}>
          <Button className='register-button' variant="primary" type="submit" 
            onClick={onRequestToRegister}>
            Register
          </Button>
          </Col>
        </Row>

    </Container>
  );
}