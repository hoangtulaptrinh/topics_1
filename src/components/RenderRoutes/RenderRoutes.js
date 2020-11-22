import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

//topics
import ListTopics from '../Topics/List';
import DetailTopic from '../Topics/Detail';
//topics

import SignInSignUp from '../SignInSignUp';
import Dashboard from '../../admin/Dashboard/index';
import Users from '../../admin/Users/index';

//users
import HomePage from '../User/HomePage';
import ListCourses from '../User/Courses/List';
import Detail from '../User/Courses/Detail';
import Learn from '../User/Learn';
import Info from '../User/Info';
//users

const ROUTES = [
  { path: '/login', key: 'SignInSignUp', exact: true, component: SignInSignUp },
  {
    path: '/topics',
    key: 'TOPICS',
    component: props => {
      if (!localStorage.getItem('currentUser')) {
        localStorage.clear();
        alert('Bạn chưa đăng nhập xin vui lòng đăng nhập');
        return <Redirect to={'/login'} />;
      }

      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/topics',
        key: 'LIST_TOPICS',
        exact: true,
        component: ListTopics,
      },
      {
        path: '/topics/detail',
        key: 'DETAIL_TOPICS',
        exact: false,
        component: DetailTopic,
      },
    ],
  },
  {
    path: '/',
    key: 'Users',
    component: props => {
      if (!localStorage.getItem('currentUser')) {
        localStorage.clear();
        alert('Bạn chưa đăng nhập xin vui lòng đăng nhập');
        return <Redirect to={'/login'} />;
      }

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
      {
        path: '/info',
        key: 'users_info',
        exact: true,
        component: Info,
      },
      {
        path: '/admin',
        key: 'ADMIN_ROOT',
        exact: true,
        component: () => {
          if (!localStorage.getItem('currentUser')) {
            localStorage.clear();
            alert('Bạn chưa đăng nhập xin vui lòng đăng nhập');
            return <Redirect to={'/login'} />;
          }

          if (JSON.parse(localStorage.getItem('currentUser')).role === 'normal') {
            localStorage.clear();
            alert('Bạn không phải là Admin xin vui lòng đăng nhập lại');
            return <Redirect to={'/login'} />;
          }

          return <Dashboard />;
        },
      },
      {
        path: '/learn',
        key: 'users_learn',
        exact: false,
        component: Learn,
      },
    ],
  },
  {
    path: '/app',
    key: 'APP',
    component: props => {
      if (!localStorage.getItem('currentUser')) {
        localStorage.clear();
        alert('Bạn chưa đăng nhập xin vui lòng đăng nhập');
        return <Redirect to={'/login'} />;
      }

      if (JSON.parse(localStorage.getItem('currentUser')).role === 'normal') {
        localStorage.clear();
        alert('Bạn không phải là Admin xin vui lòng đăng nhập lại');
        return <Redirect to={'/login'} />;
      }

      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/admin',
        key: 'ADMIN_ROOT',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/admin/quanly',
        key: 'APP_PAGE',
        exact: true,
        component: Users,
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
