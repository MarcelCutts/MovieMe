import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import movies from '../reducers/Movies';

import MovieApp from './MovieApp';

const store = createStore(movies);

const App = () => {
  return (
    <Provider store={store}>
      <MovieApp />
    </Provider>
  );
};

export default App;
