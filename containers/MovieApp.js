'use strict';
import React, {
  Component,
} from 'react-native';
import Loading from '../components/Loading';
import Movies from '../components/Movies';

import config from '../config';

import { connect } from 'react-redux';
import { fetchMovies } from '../actions';

const getMoviesSortedByRating = (movies) =>
  movies.sort((a, b) =>
    b.ratings.audience_score - a.ratings.audience_score
  );

class MovieApp extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const { dispatch, movies } = this.props;
    dispatch(fetchMovies());
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return <Movies movies={this.props.movies} />;
  };
}

const mapStateToProps = (state) => ({
  movies: getMoviesSortedByRating(state.movies.items),
  isLoading: state.movies.isFetching,
});

MovieApp = connect(mapStateToProps)(MovieApp);

export default MovieApp;
