import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/store'
import thunk from 'redux-thunk';
import App from './src/App';

const store = createStore(rootReducer, applyMiddleware(thunk));

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper;
