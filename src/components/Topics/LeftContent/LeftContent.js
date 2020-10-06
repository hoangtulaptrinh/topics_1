import React from 'react';
import { connect } from 'react-redux';

import Wrapper from './LeftContent.styled';

const List = () => {
  return (
    <Wrapper>
      <div className="progress-course">
        <p className="title">Những Chủ Đề Được Bàn Luận Sôi Nổi Nhất</p>
      </div>
      <div className="user-buy-course">
        <p className="title">Những Chủ Đề Mà Bạn Quan Tâm</p>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
