import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dasboard from './Dasboard';
import Courses from '../Courses/index';
import User from '../Users/index';
import HomeAdmin from '../HomeAdmin/index';

const MainLayout = () => {
  return (
    <Dasboard>
      <Switch>
        <Route path="/courses" component={Courses} />
        <Route path="/user" component={User} />
        <Route path="/" component={HomeAdmin} />
      </Switch>
    </Dasboard>
  )
};

export default MainLayout;

