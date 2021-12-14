import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'; //React Bootstrap introduction

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
=======
import Container from 'react-bootstrap/Container';
>>>>>>> main

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
 render() {
    return (
      <Container>
<<<<<<< HEAD
        <Row>
          <Col className="mainview-column d-grid mb-3">
            <MainView className="mainView"/>
          </Col>
        </Row>
=======
        <MainView />
>>>>>>> main
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
