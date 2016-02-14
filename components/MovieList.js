'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import config from '../config';

const PARAMS = '?apikey=' + config.API_KEY + '&page_limit=' + config.PAGE_SIZE;
const REQUEST_URL = config.API_URL + PARAMS;

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currentMovie: 0,
    };
  }

  async fetchData() {
    let response = await fetch(REQUEST_URL);
    let responseData = await response.json();
    this.setState({
      movies: responseData.movies,
      loaded: true,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onPressMovie = (event) => {
    let nextMovieIndex = this.state.currentMovie + 1;
    if (nextMovieIndex >= this.state.movies.length) {
      this.setState({currentMovie: 0});
    } else {
      this.setState({currentMovie: nextMovieIndex});
    }
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderMovie(this.state.movies[this.state.currentMovie]);
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <TouchableHighlight onPress={this.onPressMovie} style={styles.container}>
        <View style={[styles.container, styles.card]}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    shadowOffset:{
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    margin: 30,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

export default MovieList;
