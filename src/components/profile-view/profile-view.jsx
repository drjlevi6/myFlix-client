import React, { useState } from 'react';
import './profile-view.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';

export class ProfileView extends React.Component{
    render(){// will need asynchronous calls
        return(
            <Container>
                <Row>
                    <Col><h3>&lt; Profile</h3></Col>
                    <Col>
                    <Button as={Link} to='/' variant='info'>
                        All Movies
                    </Button>
                    </Col>
                </Row>
                <Row>
                <Col>
                </Col>
                <Col>
                </Col>
                </Row>
                <Row>
                
                </Row>
                        </Container>
        )
    }
}