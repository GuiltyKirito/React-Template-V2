import App from './components/App';
import Basic from './components/Layout/Basic';
import Login from './components/Auth/Login';
import Exception from './components/Exception';

import Empty from './components/Empty';

export default [
  {
    component: App,
    routes: [
      {
        path: '/login',
        auth: false,
        exact: true,
        component: Login,
      },
      {
        path: '/',
        auth: true,
        component: Basic,
        routes: [
          {
            path: '/',
            auth: true,
            exact: true,
            menu: 'home',
            component: Empty,
          },
          {
            component: Exception,
          },
        ],
      },
      {
        component: Exception,
      },
    ],
  },
];
