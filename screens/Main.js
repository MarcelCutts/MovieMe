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

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  };

  async componentDidMount() {
    await this.fetchMovies();
  }

  async fetchMovies() {
    let response = await fetch(RT_REQUEST_URL);
    let responseJson = await response.json();
    let sortedMovies = this.sortDataByAudienceScore(responseJson.movies);
    sortedMovies = await Promise.all(sortedMovies.map(async movie => await this.getMoviePoster(movie)));
    console.log(sortedMovies + '😆');

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

  async getMoviePoster(movie) {
    try {
      let url = this.generateMovieUrl(movie.alternate_ids.imdb);
      let result = await this.getMovieDBMetadata(url);
      let posterPath =  await result.movie_results[0].poster_path;
      movie.mdbPosterUri = MDB_POSTER_BASE_URL +  posterPath;
      return movie;
    } catch (e) {
      return movie;
    }

    return movie;
  }

  async getMovieDBMetadata(url) {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  }

  generateMovieUrl(imdbId) {
    let base = 'https://api.themoviedb.org/3/find/';
    let queryParams = '?external_source=imdb_id&api_key=';
    let imdbParam = 'tt' + imdbId;
    return base + imdbParam + queryParams + config.MDB_API_KEY;
  }

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    return <Movies movies={this.state.movies} />;
  };
}
export default Main;
