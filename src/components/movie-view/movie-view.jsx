import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; // file is currently empty, but we might need it later.


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { scrollParent } from 'dom-helpers';
import Axios from 'axios';

export class MovieView extends React.Component { 
  state = {favorite: false};
  genre_director_width = 3;
  componentDidMount(){
    let favoriteMovieIds = localStorage.getItem('favorite_ids');
    this.setState({favorite: favoriteMovieIds.includes(this.props.movie._id)});
}
  showGenreView() {
    console.log('MovieView.showGenreView:', movie);
  }

  addToFavorites = (e) => {
    e.preventDefault();
    let Username = localStorage.getItem('user');
    let movieId = this.props.movie._id;
    let token = localStorage.getItem('token');
    let endpoint = 
		'https://drjs-myflix-app.herokuapp.com/users/' + Username + '/movies/' + movieId;
    Axios.post(endpoint, {}, { headers: { 'Authorization': `Bearer ${token}` } })
    .then( result => {
      console.log(result);
      let favoriteMovieIds = localStorage.getItem('favorite_ids').split(',');
      favoriteMovieIds.push(this.props.movie._id);
      localStorage.setItem('favorite_ids', favoriteMovieIds);
      this.setState({favorite: true});
     } )
    .catch( error => console.log(error) )
  }

  removeFromFavorites = (e) => {
    e.preventDefault();
    let Username = localStorage.getItem('user');
    let movieId = this.props.movie._id;
    let token = localStorage.getItem('token');
    let endpoint = 
		  'https://drjs-myflix-app.herokuapp.com/users/' + 
      Username + '/movies/' + movieId;
    Axios.delete(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
    .then( result => {
      console.log(result);
      let favoriteMovieIds = localStorage.getItem('favorite_ids').split(',');
      let indexToRemove = favoriteMovieIds.indexOf(this.props.movie._id);
      favoriteMovieIds.splice(indexToRemove, 1);
      localStorage.setItem('favorite_ids', favoriteMovieIds);
      this.setState({favorite: false});
    })
    .catch( error => console.log(error) )
  }
 render() {
    const { movie, onBackClick } = this.props;
    
    return (
      <Container className="movie-view-container">
        <Row className="movie-poster-row" xs={8}>
        <Col className='alert-column'>
        <Row className='movie-title-row'>
          <Col className='movie-title-subcolumn' xs={7}>
          <Alert className='movie-title-alert' variant='info'>
            <Alert.Heading>{movie.title}</Alert.Heading>
          </Alert>
          </Col>
          <Col className='add-remove-button-group' xs={5}>
            <Row className='add-remove-text d-grid'>Favorite Movies</Row>
            <Row className='add-remove-buttons-row'>
              <Button onClick={this.addToFavorites} 
                disabled={this.state.favorite} size="sm">
                  Add
              </Button>
              <Button onClick={this.removeFromFavorites} 
                disabled={!this.state.favorite} size="sm">
                  Remove
              </Button>
            </Row>
          </Col>
        </Row>
       <Row className='director-genre-rows'>
          <Col className='genre-director-header' xs={this.genre_director_width}>
            Genre:
          </Col>
          <Col className='genre-director-button-column'>
            <Button className='genre-director-button' variant="link"
            as={Link} to={`/movies/genre/${movie.title}`}>
              {movie.genre.name}
            </Button>
          </Col>
        </Row>
        <Row className='director-genre-rows'>
          <Col className='genre-director-header' xs={this.genre_director_width}>
            Director:
          </Col>
          <Col className='genre-director-button-column'>
            <Button className='genre-director-button' variant="link"
            as={Link} to={`/movies/director/${movie.title}`}>
              {movie.director.name}
            </Button>
          </Col>
        </Row>
         <Row className='movie-description-row' xs={9}>
        <Alert className='title-description-alert' variant='info'>
          <Alert.Heading>Description:</Alert.Heading>
          <p>{movie.description}</p>
        </Alert>
        </Row>
         </Col>

        <Col className='profile-image-column' xs={4}>
        <Row className='return-to-profile-row'>
          <Col className='return-to-profile-subcolumn' xs={12}>
            <Button className='return-to-profile-button' variant='secondary'
            onClick={onBackClick}>
              Return To Profile
            </Button>
          </Col>
        </Row>
        <Row className='image-row'>
          <img className='movie-image' xs={4}
            crossOrigin="anonymous" src={movie.imagePath} />
        </Row>
          </Col>

        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};