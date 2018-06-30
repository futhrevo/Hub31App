import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
