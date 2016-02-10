'use strict';
import React, { AppRegistry, Component } from 'react-native';
import MovieList from './components/MovieList.js';

class Container extends Component {
  render() {
    return (
      <MovieList />
    );
  }
}

AppRegistry.registerComponent('Container', () => Container);
