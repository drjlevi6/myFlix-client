import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import './myBootstrapMin/bootstrap.min.css'; //React Bootstrap introduction

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
 render() {
    return (
      <Container>
        <Row>
          <Col className="mainview-column d-grid mb-3">
            <MainView className="mainView"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
