import React, { useState } from 'react';
import './profile-view.scss';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';

export class ProfileView extends React.Component{
	state = {
		Username: '',
		Password: '',
		Email: '',
		Birthday: ''
	}
	updateHandler = e => { 
		e.preventDefault();
		console.log('profile-view.updateHandler.this.state:', this.state);
		console.log('profile-view.updateHandler: localStorage.getItem(\'token\'):', 
			localStorage.getItem('token'));
					Axios.put('https://drjs-myflix-app.herokuapp.com/users/${user}',
			{ 
				Username: this.state.Username,
				Password: this.state.Password,
				Email: this.state.Email,
				Birthday: this.state.Birthday
			},
			{
				headers: {
					'Authorization': `Bearer ${'token'}`
				}
			})
			.then (
				response => console.log(response)
			)
			.catch (
				error => console.log(error)
			)
	}

	changeHandler = e => {
			if (e.target.name === "Username") {
				this.setState( { Username: e.target.value } );
			} else if (e.target.name === "Password") {
				this.setState( { Password: e.target.value})
			} else if (e.target.name === "Email") {
				this.setState( { Email: e.target.value})
			} else if (e.target.name === "Birthday") {
				this.setState( { Birthday: e.target.value})
			}
	}

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
							<Col className='form-column'>
								<Form className='main-form' onSubmit={ this.updateHandler }>
									<Form.Group as={Row} className='form-group-username-row'>
										<Col xs={4} >
											<Form.Label>Username:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="text" 
												defaultValue={this.state.Username}
												onChange={this.changeHandler}
												name="Username"
												placeholder="Enter username" />
										</Col>
									</Form.Group>

									<Form.Group as={Row} className="mb-3" 
											controlId="formPassword">
										<Col xs={4}>
											<Form.Label>Password:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="password" placeholder="Password" 
												defaultValue={this.state.Password}
												onChange={this.changeHandler}
												name="Password"											/>
										</Col>
									</Form.Group>

									<Form.Group as={Row} controlId="formBasicEmail">
										<Col xs={4}>
											<Form.Label>Email:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="email" 
												defaultValue={this.state.Email}
												onChange={this.changeHandler}
												name="Email"
												placeholder="Enter email" />
										</Col>
									</Form.Group>

									<Form.Group as={Row} >
										<Col xs={4}>
											<Form.Label>Date of Birth:</Form.Label>
										</Col>
										<Col>
											<Form.Control type="text" 
												defaultValue={this.state.Birthday}
												onChange={this.changeHandler}
												name="Birthday"/>
										</Col>
									</Form.Group>
									<Row className='update-unregister-row'>
										<Col className='update-button-col button-column' xs={6}>
											<Button className='submit-update-button' variant="primary" 
													type="submit">
												Update
											</Button>
										</Col>
										<Col className='unregister-column button-column'>
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