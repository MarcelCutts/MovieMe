import config from '../config';

const RT_PARAMS = '?apikey=' + config.RT_API_KEY + '&page_limit=' + config.PAGE_SIZE;
const RT_REQUEST_URL = config.RT_API_URL + RT_PARAMS;

let nextMovieId = 0;
export const addMovie = (movie) => ({
  type: 'ADD_MOVIE',
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

export const fetchMovies = () =>
  dispatch => {
    dispatch(requestMovies());
    return fetch(RT_REQUEST_URL)
      .then(req => req.json())
      .then(json => dispatch(receiveMovies(json)));
  };
