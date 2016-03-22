import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import { movies } from '../reducers';

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools()
  );

  return createStore(movies, initialState, enhancer);
};

export default configureStore;
