import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import MovieApp from './MovieApp';

const store = configureStore();
const App = () => (
    <Provider store={store}>
      <MovieApp />
    </Provider>
);

export default App;
