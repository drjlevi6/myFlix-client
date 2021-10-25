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
		var form_Label_width = '5';
		return(
				<Container className='profile-view-container'>
						<Row className='profile-and-all-movies-row'>
								<Col><h4>&lt; Profile</h4></Col>
								<Col className='all-movies-button-column'>
								<Button as={Link} to='/' variant='info'>
										All Movies
								</Button>
								</Col>
						</Row>

						<Row className='form-and-unregister-row'>
							<Col sm={7} className='form-column'>
								<Form className='main-form'>
									<Form.Group as={Row} >
										<Col sm={4} >
											<Form.Label>Username:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="text" 
												placeholder="Enter username" />
										</Col>
									</Form.Group>

									<Form.Group as={Row} className="mb-3" 
											controlId="formBasicPassword">
										<Col sm={4}>
											<Form.Label>Password:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="password" placeholder="Password" />
										</Col>
									</Form.Group>

									<Form.Group as={Row} controlId="formBasicEmail">
										<Col sm={4}>
											<Form.Label>Email:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="email" 
												placeholder="Enter email" />
										</Col>
									</Form.Group>

									<Form.Group as={Row} >
										<Col sm={4}>
											<Form.Label>Date of Birth:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="date" 
												placeholder="Enter date of birth" />
										</Col>
									</Form.Group>
									<Row className='update-unregister-row'>
										<Col className='update-button-col'>
									<Button className='submit-form-button' variant="primary" 
											type="submit">
										Update
									</Button>
									</Col>
									<Col className='unregister-column'>
							<Button className='unregister-button' variant='dark'>
								Unregister
							</Button>
							</Col>									
						</Row>
								</Form>
							</Col>
					</Row>
				</Container>
		) //end return
	}	//end render
}