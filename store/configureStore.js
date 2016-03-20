import { createStore } from 'redux';
import devTools from 'remote-redux-devtools';
import { movies } from '../reducers';

function configureStore(initialState) {
  const store = devTools()(createStore)(movies, initialState);
  return store;
}

export default configureStore;
