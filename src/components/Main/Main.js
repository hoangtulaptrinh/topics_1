import React, { useEffect } from 'react';
import ROUTES, { RenderRoutes } from '../RenderRoutes/RenderRoutes';
import { connect } from 'react-redux';

import Wrapper from './Main.styled';
import { getAllUsers } from '../../actions';

const Main = ({ getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <Wrapper>
      <>
        <RenderRoutes routes={ROUTES} />
      </>
    </Wrapper>
  );
};

const mapStatetoProps = () => {
  return {};
};

export default connect(mapStatetoProps, { getAllUsers })(Main);
