import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools()
  );

  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;
