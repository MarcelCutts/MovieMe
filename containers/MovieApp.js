'use strict';
import React, {
  Component,
} from 'react-native';
import Loading from '../components/Loading';
import Movies from '../components/Movies';

import config from '../config';

const RT_PARAMS = '?apikey=' + config.RT_API_KEY + '&page_limit=' + config.PAGE_SIZE;
const RT_REQUEST_URL = config.RT_API_URL + RT_PARAMS;

const MDB_FIND_URL = 'https://api.themoviedb.org/3/find/';
const MDB_QUERY_PARAMS = '?external_source=imdb_id&api_key=';
const MDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

class MovieApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  };

  async componentDidMount() {
    await this.fetchMovies();
  }

  //TODO implement redux + sagas to move all this data logic elsewhere
  async fetchMovies() {
    let responseJson = await this.getJson(RT_REQUEST_URL);

    // Sort the movies by ranking - highest first!
    let sortedMovies = this.sortDataByAudienceScore(responseJson.movies);

    // Attempt to attach a high res poster path for each movie from MDB
    // Also, await* has been removed - now we're back to Promise.all()!
    sortedMovies = await Promise.all(sortedMovies.map(
      async movie => await this.getMoviePoster(movie)
    ));

    this.setState({
      movies: sortedMovies,
      loaded: true,
    });
  }

  // RT and MDB API requires use of snake_case
  //jscs: disable requireCamelCaseOrUpperCaseIdentifiers
  sortDataByAudienceScore(movies) {
    return movies.sort((a, b)  => {
      return b.ratings.audience_score - a.ratings.audience_score;
    });
  }

  async getMoviePoster(movie) {
    try {
      let mdbMovieUrl = this.generateMdbMovieUrl(movie.alternate_ids.imdb);
      let result = await this.getJson(mdbMovieUrl);
      let posterPath =  await result.movie_results[0].poster_path;
      movie.mdbPosterUri = MDB_POSTER_BASE_URL +  posterPath;
    } catch (e) {
      console.log(e);
    }

    return movie;
  } //jscs: enable requireCamelCaseOrUpperCaseIdentifiers

  async getJson(url) {
    let response = await fetch(url);
    return await response.json();
  }

  generateMdbMovieUrl(imdbId) {
    let imdbParam = 'tt' + imdbId;
    return MDB_FIND_URL + imdbParam + MDB_QUERY_PARAMS + config.MDB_API_KEY;
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    return <Movies movies={this.state.movies} />;
  };
}
export default MovieApp;
