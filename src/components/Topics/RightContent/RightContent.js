import React from "react";
import { connect } from "react-redux";

import Wrapper from "./RightContent.styled";

const List = () => {
  return (
    <Wrapper>
      <div className="process-course">Tiến Độ Hoàn Thành Các Khóa Học</div>
      <div className="user-buy-course">Những Thành Viên Khác Trong Topic</div>
    </Wrapper>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
