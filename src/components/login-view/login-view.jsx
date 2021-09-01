import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RegistrationView} from '../registration-view/registration-view'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Collapse } from 'bootstrap';
//import './login-view.scss';
import "../universal-components/elements.scss"; // for elements in mult. views 
import axios from 'axios'; // 3.6

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('http://drjs-myflix-app.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
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
    return <RegistrationView />
  }
  return ( // onClick={onRequestToRegister}>register: 
    <Container>
      <Col xs={10}>
        <Row className="justify-content-md-center header-text">
          <Col>
            Log in or
          </Col>
        </Row>
        <Row className="justify-content-md-center" >
            <Button className="register-button" variant="primary" 
              onClick={onRequestToRegister}>
              register
            </Button>
        </Row>
        <Row>&nbsp;</Row>

      <Form>
       <Form.Group className="mb-2" controlId="formUsername">
        <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Username:</Form.Label>
          </Col>
          <Col >
            <Form.Control type="text" onChange={e => 
              setUsername(e.target.value)} />
          </Col>
        </Row>
       </Form.Group>

        <Form.Group controlId="formPassword">
          <Row className="justify-content-md-center mb-2">
            <Col xs={3}>
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col >
              <Form.Control type="password" onChange={
                e => setPassword(e.target.value)
              } />
            </Col>
          </Row>
        </Form.Group>

        <Row  className="justify-content-md-center">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
         </Row>
      </Form>
      </Col>
    </Container>
  );
}