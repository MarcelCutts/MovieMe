'use strict';
import React, {
  Component,
} from 'react-native';
import Loading from '../components/Loading';
import Movies from '../components/Movies';

import config from '../config';

const PARAMS = '?apikey=' + config.API_KEY + '&page_limit=' + config.PAGE_SIZE;
const REQUEST_URL = config.API_URL + PARAMS;

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

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    return <Movies movies={this.state.movies} />;
  };
}
export default Main;
