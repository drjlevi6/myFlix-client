import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  keypressCallback(event) {
    console.log('keypressCallback()', event.key);
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });``
  }

  componentDidMount(){  /* We insert the addEventListener()
                      between axios.get and the error routine. */
    axios.get('https://drjs-myflix-app.herokuapp.com/movies')
      .then(response => {
        console.log(response.data);
        this.setState({   // triggers automatic re-render
          movies: response.data
        });
      })
      .then(
        document.addEventListener('keypress', this.keypressCallback)
      )
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount()');
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view" />
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie}
          onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie); }}/>
           ) : (movies.map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie)
                }}
              />
           )
          ))
        }
    </div>
    );
  } 
}