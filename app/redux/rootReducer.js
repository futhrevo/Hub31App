import { combineReducers } from 'redux';
import network from './data/network/reducer';
import HomeReducer from './ui/home/reducer';
import DataReducer from './data/reducer';

export default combineReducers({
  network,
  Home: HomeReducer,
  Collections: DataReducer,
});
