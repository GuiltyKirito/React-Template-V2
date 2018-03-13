import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import rsasign from 'jsrsasign';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import * as types from './components/Auth/actionType';

export const history = createHistory();

// middlewares
let middlewares = [thunkMiddleware, routerMiddleware(history)];

// logger
const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => JSON.parse(JSON.stringify(state)),
});

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, loggerMiddleware];
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const stores = createStore(reducers, enhancer);

// 更新token
/*
const token = localStorage.getItem('token');
if (token) {
  const JWS = rsasign.jws.JWS.parse(token);

  stores.dispatch({
    type: types.LOGIN,
    token: token,
    id: JWS.payloadObj.sub,
    name: JWS.payloadObj.name,
    roles: JWS.payloadObj.roles,
    permissions: JWS.payloadObj.permissions,
  });
}
*/

// 假token登入
stores.dispatch({
  type: types.LOGIN,
  id: 'id',
  name: 'name',
  token: null,
  roles: ['home'],
  permissions: ['all.home'],
});

export default stores;
