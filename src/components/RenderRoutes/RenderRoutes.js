import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ListTopics from '../Topics/List';
import SignInSignUp from '../SignInSignUp';
import HomePage from '../../admin/HomePage';
import QUanly from '../../admin/QuanlyUser';

const ROUTES = [
  { path: '/', key: 'SignInSignUp', exact: true, component: SignInSignUp },
  { path: '/topics', key: 'ROOT', component: ListTopics },
  {
    path: '/admin',
    key: 'ADMIN',
    component: props => {
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/admin',
        key: 'ADMIN_ROOT',
        exact: true,
        component: HomePage,
      },
      {
        path: '/admin/quanly',
        key: 'APP_PAGE',
        exact: true,
        component: QUanly,
      },
    ],
  },
];
export default ROUTES;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map(route => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      {/* <Route component={() => <h1>Not Found!</h1>} /> */}
      <Route path="/test">
        <h1>Test</h1>
      </Route>
    </Switch>
  );
}
