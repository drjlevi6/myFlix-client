import React, { useState } from 'react';
import './profile-view.scss';
import Axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom"; 

export class ProfileView extends React.Component{
	state = {
		Username: '',
		Password: '',
		Email: '',
		Birthday: '',
		favorite_movies: [],
		movie_to_delete: null
	}
	updateHandler = e => { 
		e.preventDefault();
		console.log('profile-view.updateHandler.this.state:', this.state);

		let endpoint = 
		'https://drjs-myflix-app.herokuapp.com/users/' + localStorage.getItem('user');
		console.log('profile-view.updateHandler.endpoint:', endpoint);

		let bearerToken = localStorage.getItem('token');
		console.log('profile-view.updateHandler.bearerToken:', bearerToken);
//					Axios.put('https://drjs-myflix-app.herokuapp.com/users/' +
//					localStorage.getItem('user')),
			Axios.put(endpoint,
			{ 
				Username: this.state.Username,
				Password: this.state.Password,
				Email: this.state.Email,
				Birthday: this.state.Birthday
			},
			{
				headers: {
					'Authorization': `Bearer ${bearerToken}` //${localStorage.getItem('token')}`
				}
			})
			.then (
				response => {
					console.log(response);
					localStorage.setItem('user', this.state.Username);
				}
			)
			.catch (
				error => console.log("Axios put error:", error)
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

	removeFromFavorites = (e, movieId) => {
		e.preventDefault();
		let Username = localStorage.getItem('user');
		let token = localStorage.getItem('token');
		let endpoint = 
				'https://drjs-myflix-app.herokuapp.com/users/' + 
			Username + '/movies/' + movieId;
		Axios.delete(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
		.then( result => {
			console.log(result);
			let favoriteMovieIds = localStorage.getItem('favorite_ids').split(',');
			let indexToRemove = favoriteMovieIds.indexOf(movieId);
			favoriteMovieIds.splice(indexToRemove, 1);
			localStorage.setItem('favorite_ids', favoriteMovieIds);
			this.forceUpdate();
		})
		.catch( error => console.log(error) )
		}
	
		removeUser = () => {
			let token = localStorage.getItem('token');
			let Username = localStorage.getItem('user');
			let endpoint = 
			'https://drjs-myflix-app.herokuapp.com/users/' + Username;
		Axios.delete(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
	.then( result => {
		console.log('removeUser.result', result);
		localStorage.clear();
		window.location.href='/';
		alert('User ' + Username + ' was removed.');
	})
	.catch( error => console.log(error) )
	}

		
	render(){// will need asynchronous calls
		var form_Label_width = '5';
		let movies = this.props.movies;
		let favorite_ids = localStorage.getItem('favorite_ids');
		var favorite_movies = movies.filter(
			movie => favorite_ids.includes(movie._id)
		)
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
												placeholder={this.state.Username} />
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
											<Form.Control type="date" 
												defaultValue={this.state.Birthday}
												onChange={this.changeHandler}
												name="Birthday"/>
										</Col>
									</Form.Group>
									<Row className='update-unregister-row'>
										<Col className='update-button-col button-column' xs={3}>
											<Button className='submit-update-button' variant="primary" 
													type="submit">
												Update
											</Button>
										</Col>
										<Col className='unregister-column button-column' xs={3}>
											<Button className='unregister-button' 
											onClick={this.removeUser} variant='dark'>
												Unregister
											</Button>
										</Col>									
									</Row>
								</Form>
							</Col>
					</Row>
					<Row className='favorites-header-row'>
						<Col className='favorites-column d-grid'>
							<h5>Favorite Movies:</h5>
						</Col>
					</Row>
					<Row>{!favorite_movies.length && <div style={{textAlign: 'center'}}>(None)</div>}</Row>
					<Row className='favorite-cards-row'> {
						favorite_movies.map(
							(favorite_movie) => {
								return (
									<Col className='favorite-cards-column' 
										key={favorite_movie._id} xs={5} md={4} lg={3}>
											<Card className='card'>
												<Card.Img crossOrigin="anonymous" variant="top" 
													src={favorite_movie.imagePath} />
												<Card.Body>
													<Card.Title>{favorite_movie.title}</Card.Title>
													<Row>
													<Button onClick={
														e => this.removeFromFavorites(e, favorite_movie._id)}
															size="sm">
															Remove
														</Button>
													</Row>
												</Card.Body>      
												</Card>
									</Col>
								)
							}
						)
					}
					</Row>
				</Container>
		) //end return
	}	//end render
}