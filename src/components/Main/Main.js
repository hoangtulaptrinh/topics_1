import React from "react";
import ROUTES, { RenderRoutes } from "../RenderRoutes/RenderRoutes";

import Wrapper from "./Main.styled";

const Main = () => {
  return (
    <Wrapper>
      <>
        <RenderRoutes routes={ROUTES} />
      </>
    </Wrapper>
  );
};

export default Main;
