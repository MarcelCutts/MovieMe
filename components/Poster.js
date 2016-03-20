'use strict';
import React, { Image, StyleSheet, Dimensions } from 'react-native';

const Poster = ({ uri }) => {
  // Despite best attempts, coaxing flexbox into dynamically
  // letting an image in this scenario 'fill space' has baffled even
  // even the RN famous. I cheat for now, get dimensions manually.
  let { height, width } = Dimensions.get('window');
  let posterHeight = height / 1.8;

  return (
    <Image
    source={{ uri }}
    style={[styles.poster, { height: posterHeight }]}
    />
  );
};

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
