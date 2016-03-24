import { combineReducers } from 'redux';

const chosenMovies = (state = [], action) => {
  switch (action.type) {
    case 'CHOOSE_MOVIE':
      return [
        ...state,
        {
          id: action.id,
          movie: action.movie,
        },
      ];
    default:
      return state;
  }
};

const movies = (state = { isFetching: true, items: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_MOVIES':
      return { ...state, isFetching: true };
    case 'RECEIVE_MOVIES':
      return { ...state, ...{
        isFetching: false,
        items: action.movies,
        lastUpdated: action.receivedAt,
      },
    };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  chosenMovies,
  movies,
});

export default rootReducer;
