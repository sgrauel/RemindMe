import { combineReducers } from 'redux';
import { app, collections } from '../reducers/app';

const rootReducer = combineReducers({
  app,
  collections
});

export default rootReducer;