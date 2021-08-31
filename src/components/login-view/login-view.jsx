import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {RegistrationView} from '../registration-view/registration-view'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login-view.handleSubmit:", username, password);
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
    <div className="jl-login-main" >
      <span>
        Log in or&nbsp;
        <Button className="register-button" variant="primary" 
          onClick={onRequestToRegister}>
          register</Button>
      </span>

      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => 
            setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={
            e => setPassword(e.target.value)
          } />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}