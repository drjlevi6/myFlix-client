import React from 'react';
import axios from 'axios';
import { ReactDOM } from "react-dom";
import "./registration-view.scss"
import "../button/button.scss"; // Use for custom-styled submit buttons
//import "../universal-components/elements.scss"; // for elements in mult. views
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
      Username: '',
      Password: '',
      Email: '',
      Birthday: ''
    }; // end this.state
  } // end constructor

  onSubmitRegistrationHandler = e => {
    e.preventDefault();
    const {Username, Password, Email, Birthday} = this.state;
    if (!Username || !Password || !Email) {
      return;
    }
    axios.post('https://drjs-myflix-app.herokuapp.com/users', 
      {
        Username:  Username,
        Password:  Password,
        Email:  Email,
        Birthday: Birthday
      }
    )
    .then(response => {
      console.log(
        "registration-view.onSubmitRegistrationHandler.response\n" + 
          response
      )
      const data = response.data;
      alert(response.data.Username + ' was registered.');
      this.props.back()
    })
    .catch(e => {
      console.log('registration-view.onSubmitRegistrationHandler: \n', e.response);
  //    for (let key in e) {
   //     console.log('registration-view.onSubmitRegistrationHandler: \n',
   //       key, e[key]);
   //   }
      alert(e.response.data);
    });

  }

  onChangeHandler = e =>  {
    let {name, value} = e.target;
    //console.log("onChangeHandler():", e.target);
    if (name==="Username") {
      this.setState({Username: value})
    } else if (name==="Password") {
      this.setState({Password: value})
    } else if (name==="Email") {
      this.setState({Email: value})
    } else if (name==="Birthday") {
      this.setState({Birthday: value})
    }
  }
  
  render() {
    return (
      <Container>
        <Col xs={10}>
        <Form onSubmit={this.onSubmitRegistrationHandler}>
          <Form.Group controlId="header">
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
            <Form.Control type='text' value={this.state.Username}
              onChange={this.onChangeHandler} name="Username"/>
          </Col>
          </Row>
          </Form.Group>
          
          <Form.Group className="mb-2" controlId="formPassword">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Password:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='password' value={this.state.Password}
              onChange={this.onChangeHandler} name='Password' />
          </Col>
          </Row>
          </Form.Group>
          
          <Form.Group className="mb-2" controlId="formEmail">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Email:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='email' name="Email" value={this.state.Email} 
              onChange={this.onChangeHandler} />
          </Col>
          </Row>
          </Form.Group>
          
          <Form.Group className="mb-2" controlId="formBirthday">
          <Row className="justify-content-md-center">
          <Col xs={3}>
            <Form.Label>Birthday:</Form.Label>
          </Col>
          <Col>
            <Form.Control type='text' name="Birthday" value={this.state.Birthday} 
              onChange={this.onChangeHandler} />
          </Col>
          </Row>
          </Form.Group>

        <Row className="justify-content-md-center">
          <Button className="submit-registration-button" 
            type="submit">
            Submit
          </Button>
          <Button variant="dark" onClick={this.props.back} >
            Return to Login
          </Button>
         </Row>

        </Form>
        </Col>
      </Container>
    ) // end return
  } // end render
} // end class
