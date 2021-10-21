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
								<Row className='profile-and-all-movies-row'>
										<Col><h3>&lt; Profile</h3></Col>
										<Col>
										<Button as={Link} to='/' variant='info'>
												All Movies
										</Button>
										</Col>
								</Row>

								<Row className='form-and-unregister-row'>
									<Col className='sm={10} form-column'>
										<Form className='main-form'>
											<Form.Group as={Row} controlId="formBasicEmail">
												<Col sm={6}>
													<Form.Label>Username:</Form.Label>
												</Col>
												<Col>
													<Form.Control type="email" 
														placeholder="Enter email" />
												</Col>
											</Form.Group>

											<Form.Group as={Row} className="mb-3" 
													controlId="formBasicPassword">
												<Col sm={6}>
													<Form.Label>Password:</Form.Label>
												</Col>
												<Col>
													<Form.Control type="password" placeholder="Password" />
												</Col>
											</Form.Group>

											<Form.Group as={Row} controlId="formBasicEmail">
												<Col sm={6}>
													<Form.Label>Email:</Form.Label>
												</Col>
												<Col>
													<Form.Control type="email" 
														placeholder="Enter email" />
												</Col>
											</Form.Group>

											<Form.Group as={Row} controlId="formBasicEmail">
												<Col sm={4}>
													<Form.Label>Date of Birth:</Form.Label>
												</Col>
												<Col>
													<Form.Control type="DOB" 
														placeholder="Enter date of birth" />
												</Col>
											</Form.Group>

											<Button variant="primary" type="submit">
												Submit
											</Button>
										</Form>
									</Col>
								<Col className='sm-2' >
									<Button variant='dark'>
										Unregister
									</Button>
								</Col>
							</Row>
						</Container>
				)
		}
}