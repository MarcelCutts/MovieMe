import config from '../config';

const RT_PARAMS = '?apikey=' + config.RT_API_KEY + '&page_limit=' + config.PAGE_SIZE;
const RT_REQUEST_URL = config.RT_API_URL + RT_PARAMS;
const MDB_FIND_URL = 'https://api.themoviedb.org/3/find/';
const MDB_QUERY_PARAMS = '?external_source=imdb_id&api_key=';
const MDB_POSTER_URL = 'https://image.tmdb.org/t/p/w500';

let nextMovieId = 0;
export const chooseMovie = (movie) => ({
  type: 'CHOOSE_MOVIE',
  id: nextMovieId++,
  movie,
});

export const requestMovies = () => ({
  type: 'REQUEST_MOVIES',
});

export const receiveMovies = (movies) => ({
  type: 'RECEIVE_MOVIES',
  receivedAt: Date.now(),
  movies,
});

export const receiveMoviePoster = (movie, posterUri) => ({
  type: 'RECEIVE_POSTER',
  movie,
  posterUri,
});

export const fetchMovies = () =>
  async dispatch => {
    dispatch(requestMovies());
    let result = await fetch(RT_REQUEST_URL);
    let json = await result.json();
    let movies = await requestMoviePosters(json.movies);
    dispatch(receiveMovies(movies));
  };

const requestMoviePosters = movies => {
  let moviesWithPosters = movies.map(movie => requestMoviePoster(movie));
  return Promise.all(moviesWithPosters);
};

const requestMoviePoster = async movie => {
  if (!movie.alternate_ids || !movie.alternate_ids.hasOwnProperty('imdb')) {
    return movie;
  };

  let mdbMovieUrl = generateMdbUrl(movie);
  let result = await fetch(mdbMovieUrl);
  let json = await result.json();
  let mdbPosterUri = MDB_POSTER_URL + json.movie_results[0].poster_path;
  return { ...movie, mdbPosterUri };
};

const generateMdbUrl = movie => {
  let imdbId = 'tt' + movie.alternate_ids.imdb;
  return MDB_FIND_URL + imdbId + MDB_QUERY_PARAMS + config.MDB_API_KEY;
};
