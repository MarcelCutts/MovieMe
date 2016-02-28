'use strict';
import React, { AppRegistry, Component } from 'react-native';
import Main from './screens/Main';

class MovieMe extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('MovieMe', () => MovieMe);
