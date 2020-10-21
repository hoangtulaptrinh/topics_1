import React from 'react';
import { Route, Switch } from 'react-router-dom';

//topics
import ListTopics from '../Topics/List';
//topics

import SignInSignUp from '../SignInSignUp';

//users
import HomePage from '../User/HomePage';
import ListCourses from '../User/Courses/List';
import Detail from '../User/Courses/Detail';
//users

const ROUTES = [
  { path: '/login', key: 'SignInSignUp', exact: true, component: SignInSignUp },
  { path: '/topics', key: 'ROOT', component: ListTopics },
  {
    path: '/',
    key: 'Users',
    component: props => {
      // if (!localStorage.getItem("user")) {
      //   alert("You need to log in to access app routes");
      //   return <Redirect to={"/"} />;
      // }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/',
        key: 'users_homepage',
        exact: true,
        component: HomePage,
      },
      {
        path: '/courses',
        key: 'users_courses',
        exact: true,
        component: ListCourses,
      },
      {
        path: '/courses/detail',
        key: 'users_courses',
        exact: false,
        component: Detail,
      },
    ],
  },
  {
    path: '/app',
    key: 'APP',
    component: props => {
      // if (!localStorage.getItem("user")) {
      //   alert("You need to log in to access app routes");
      //   return <Redirect to={"/"} />;
      // }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/app',
        key: 'APP_ROOT',
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: '/app/page',
        key: 'APP_PAGE',
        exact: true,
        component: () => <h1>App Page</h1>,
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
