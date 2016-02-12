'use strict';
import React, { AppRegistry, Component } from 'react-native';
import MovieList from './components/MovieList';

class MovieMe extends Component {
  render() {
    return (
      <MovieList />
    );
  }
}

AppRegistry.registerComponent('MovieMe', () => MovieMe);
