'use strict';
import React, { Component, Image, StyleSheet, Dimensions } from 'react-native';
import config from '../config';


const BASE_URL = 'https://image.tmdb.org/t/p/w500';

class Poster extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Despite best attempts, coaxing flexbox into dynamically
    // letting an image in this scenario 'fill space' has baffled even
    // even the RN famous. I cheat for now, get dimensions manually.
    let { height, width } = Dimensions.get('window');
    let posterHeight = height / 1.8;
    let posterHeightStyle = { height: posterHeight };

    return (
      <Image
      source={{ uri: this.props.Uri }}
      style={[styles.poster, posterHeightStyle]}
      />
    );
  }
}

const styles = StyleSheet.create({
  poster: {
    borderColor: '#ba9077',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
});

export default Poster;
