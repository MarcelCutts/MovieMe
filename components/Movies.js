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
import Poster from './Poster';
import { connect } from 'react-redux';
import { chooseMovie } from '../actions';
import BackgroundImageContainer from './BackgroundImageContainer';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      onPanResponderRelease: (event, { vx, vy }) => {
        // Simple attempt for demo purposes,
        // if velocity of card is > arbitary vx,
        // note that card as 'swiped'
        let absoluteVelocity = Math.abs(vx);

        // Temporary magic numbers given below that 'feel OK'
        // Would love to know what the actual units are...
        const { dispatch, movies } = this.props;
        if (absoluteVelocity > 1) {
          if (vx > 1) {
            dispatch(chooseMovie(movies[this.state.currentMovie]));
          };

          Animated.decay(this.state.pan, {
            velocity: { x: vx, y: vy },
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

  componentDidMount() {
    this.animateCardEntrance();
  }

  animateCardEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 6 }
    ).start();
  };

  getNextMovie()  {
    let nextMovieIndex = this.state.currentMovie + 1;
    if (nextMovieIndex >= this.props.movies.length) {
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

  render() {
    let movie = this.props.movies[this.state.currentMovie];

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
          <Poster uri={movie.mdbPosterUri || movie.posters.thumbnail}  />
          <View style={styles.detailContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.scoreContainer}>
              <Image
              source={require('../assets/images/rtIcon.png')}
              style={styles.icon}
              />
              <Text style={styles.score}>
                { movie.ratings.audience_score }%
              </Text>
            </View>
          </View>
        </Animated.View>
      </BackgroundImageContainer>
    );
  };
}
Movies = connect()(Movies);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    shadowOffset:{
      width: 10,
      height: 10,
    },
    backgroundColor: '#1d2120',
    borderRadius: 20,
    elevation: 20,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    margin: 30,
  },
  detailContainer: {
    flex: 1,
    padding: 20,
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
});

export default Movies;
