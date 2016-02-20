'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
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
      enter: new Animated.Value(0.5),
    };
  }

  async componentDidMount() {
    await this.fetchMovies();
    this.animateCardEntrance();
  }

  async fetchMovies() {
    let response = await fetch(REQUEST_URL);
    let responseJson = await response.json();
    let sortedMovies = this.sortDataByAudienceScore(responseJson.movies);
    this.setState({
      movies: sortedMovies,
      loaded: true,
    });
  }

  // RT API requires use of snake_case
  //jscs: disable requireCamelCaseOrUpperCaseIdentifiers
  sortDataByAudienceScore(movies) {
    return movies.sort((a, b)  => {
      return b.ratings.audience_score - a.ratings.audience_score;
    });

    return sortedMovies;
  }//jscs: enable requireCamelCaseOrUpperCaseIdentifiers

  onPressMovie = (event) => {
    let nextMovieIndex = this.state.currentMovie + 1;
    if (nextMovieIndex >= this.state.movies.length) {
      this.setState({currentMovie: 0});
    } else {
      this.setState({currentMovie: nextMovieIndex});
    }
  };

  animateCardEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  };

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
    let animatedCardStyles = {transform: [{scale: this.state.enter}]};

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedCardStyles]}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.ratings.audience_score}%</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderMovie(this.state.movies[this.state.currentMovie]);
  };
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
    flex: 1,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    margin: 30,
    flexDirection: 'row',
    alignItems: 'center',
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
