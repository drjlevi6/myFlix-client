import React from 'react';
import PropTypes from 'prop-types';
import "./movie-view.scss"; 
import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import  Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { scrollParent } from 'dom-helpers';
import Axios from 'axios';

export class MovieView extends React.Component { 
  state = {favorite: false};
  genre_director_width = 3;

  componentDidMount(){
    const {movie, user} = this.props;
    if (typeof movie.director === 'string') {
      console.log('movie-view, componentDidMount(): ' + 
      'Please fix missing director info for movie “' + 
      movie.title + '”.');
    }
    let favoriteMovieIds = localStorage.getItem('favorite_ids');
    this.setState({
      favorite: user.FavoriteMovies.includes(this.props.movie._id)
  });
}
  showGenreView() {
    console.log('MovieView.showGenreView:', movie);
  }

  addToFavorites = (e) => {
    e.preventDefault();
    let Username = localStorage.getItem('user');
    let movieId = this.props.movie._id;
    let token = localStorage.getItem('token');
    let endpoint = 'https://drjs-myflix-app.herokuapp.com/users/' + 
      Username + '/movies/' + movieId;
    Axios.post(
      endpoint, {}, { headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then( result => {
      this.props.setUser(result.data);
      this.setState({
        favorite: result.data.FavoriteMovies.includes(
          this.props.movie._id
        )
      });
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
    Axios.delete(endpoint, { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then( result => {
      this.props.setUser(result.data);
      this.setState({
        favorite: result.data.FavoriteMovies.includes(
          this.props.movie._id
        )
      });
  })
    .catch( error => console.log(error) )
  }
 render() {
    const { movie, onBackClick } = this.props;
    
    return (
      <Container className="movie-view-container">
        <Row className="movie-title-row">
          <Alert className='movie-title-alert' variant='info'>
            <Alert.Heading>{movie.title}</Alert.Heading>
          </Alert>
        </Row>
        <Row className='middle-row'>
           <Col className='genre-director-col' xs={7}>
            <Row className='genre-director-row' id='genre-row'>
              <Col className='genre-director-header-col' 
                xs={this.genre_director_width}>
                  Genre:
              </Col>
              <Col className='genre-director-button-col'>
                <Button className='genre-director-button' variant="link"
                  as={Link} to={`/movies/genre/${movie.title}`}>
                  {movie.genre.name}
                </Button>
              </Col>
            </Row>
            <Row className='genre-director-row' id='DIRECTOR-ROW'>
              <Col className='genre-director-header-col' 
                xs={this.genre_director_width}>
                Director:
              </Col>
              <Col className='genre-director-button-col'>
                <Button className='genre-director-button' variant="link"
                  as={Link} to={`/movies/director/${movie.title}`}>
                    {movie.director.name}
                </Button>
              </Col>
            </Row>
            <Row className='add-remove-text'>Favorite Movies</Row>
            <Col className='add-remove-buttons-col'xs={6}>
              <Row className='add-remove-buttons-row'>
                <Button onClick={this.addToFavorites} 
                  disabled={this.state.favorite} size="sm">
                    Add
                </Button>
                </Row>
                <Row className='add-remove-buttons-row'>
                  <Button onClick={this.removeFromFavorites} 
                      disabled={!this.state.favorite} size="sm">
                    Remove
                  </Button>
              </Row>
            </Col>
          </Col>

          <Card style={{ width: '20vh' }}>
            <Card.Img variant="top" crossOrigin="anonymous" 
              src={movie.imagePath} />
          </Card>
        </Row>

        <Col className='profile-image-column' xs={5}>
          <Row className='return-to-profile-row'>
            <Col className='return-to-profile-subcolumn' xs={12}>
            </Col>
          </Row>
        </Col>

        <Row className='movie-description-row' xs={9}>
          <Alert className='title-description-alert' variant='info'>
            <Alert.Heading>Description:</Alert.Heading>
            <p>{movie.description}</p>
          </Alert>
        </Row>

        <Row className='return-to-profile-button-row'>
          <Button className='return-to-profile-button' variant='secondary'
              onClick={onBackClick}>
            Return To Profile
          </Button>
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

let mapStateToProps = state => {
  return { user: state.user }
}

// #8
export default connect(mapStateToProps, 
    { setUser } )(MovieView);
