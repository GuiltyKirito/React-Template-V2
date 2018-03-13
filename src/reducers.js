import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './components/Auth/reducer';
import layoutReducer from './components/Layout/reducer';

export default combineReducers({
  layout: layoutReducer,
  router: routerReducer,
  user: authReducer,
});
