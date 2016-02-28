'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import Loading from './Loading';
import BackgroundImageContainer from './BackgroundImageContainer';

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
      pan: new Animated.ValueXY(),
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (event, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      // It's not super obvious, the but null at index
      // 0 is there to state to ignore the native event.
      // We only choose to prove a dx update to ensure our
      // movie card can only go left or right.
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x },
      ]),

      onPanResponderRelease: (event, { vx }) => {
        // Simple attempt for demo purposes,
        // if velocity of card is > arbitary vx,
        // note that card as 'swiped'
        let velocity = Math.abs(vx);

        // Temporary magic numbers given below that 'feel OK'
        // Would love to know what the actual units are...
        if (velocity > 1) {
          Animated.decay(this.state.pan, {
            velocity: { x: 10, y: 10 },
            deceleration: 0.98,
          }).start(this.showNextMovie);
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
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

  animateCardEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 6 }
    ).start();
  };

  getNextMovie()  {
    let nextMovieIndex = this.state.currentMovie + 1;
    if (nextMovieIndex >= this.state.movies.length) {
      this.setState({ currentMovie: 0 });
    } else {
      this.setState({ currentMovie: nextMovieIndex });
    }
  };

  showNextMovie = () => {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this.getNextMovie();
    this.animateCardEntrance();
  };

  renderMovie(movie) {
    let rotate = this.state.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
    });
    let animatedCardStyles = {
      transform: [
        { translateX: this.state.pan.x },
        { translateY: this.state.pan.y },
        { rotate: rotate },
        { scale: this.state.enter },
      ],
      opacity: 1,
    };

    return (
      <BackgroundImageContainer
        image={require('../assets/images/patternBackground.png')}>
         <Animated.View
           style={[styles.card, animatedCardStyles]}
           {...this.panResponder.panHandlers}>
           <Image
             source={{ uri: movie.posters.thumbnail }}
             style={styles.thumbnail}
           />
           <View style={styles.rightContainer}>
             <Text style={styles.title}>{movie.title}</Text>
             <View style={styles.scoreContainer}>
               <Image
                 source={require('../assets/images/rtIcon.png')}
                 style={styles.icon}
               />
               <Text style={styles.score}>
                 {movie.ratings.audience_score}%
               </Text>
             </View>

           </View>
         </Animated.View>
     </BackgroundImageContainer>
    );
  };

  render() {
    if (!this.state.loaded) {
      return <Loading containerStyle={styles.container}/>;
    }

    return this.renderMovie(this.state.movies[this.state.currentMovie]);
  };
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset:{
      width: 10,
      height: 10,
    },
    backgroundColor: '#1d2120',
    elevation: 20,
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
    color: '#ba9077',
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  score: {
    color: '#5a5c51',
  },
  icon: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

export default MovieList;
