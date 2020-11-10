import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { toastWarning } from '../../../helper/toastHelper';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import moment from 'moment';
import Wrapper from './Info.style';

import infoUserImage from '../../../assets/img/INFO.png';

const { Panel } = Collapse;

const HomePage = ({ listCourses }) => {
  const history = useHistory();

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="total">
          <div className="left">
            <div className="header">
              <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
              <div className="info">
                <p className="info__name">{currentUser.name}</p>
                <p className="info__coin">{`${currentUser.money} Coin`}</p>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="header">
              <img src={infoUserImage} alt="info" />
              <div className="info">
                <p className="title">Tài khoản</p>
                <p className="content">
                  Quản lý thông tin đăng nhập và thông tin cá nhân của bạn tại đây điều đó sẽ giúp chúng tôi tạo hồ sơ
                  giới thiệu việc làm cho các bạn
                </p>
              </div>
            </div>
            <div className="login-info">
              <h4>Thông tin đăng nhập</h4>

              <div className="item">
                <div className="left">
                  <span className="top">Email</span>
                  <span className="down">{currentUser.email}</span>
                </div>
                <AiOutlineRight />
              </div>

              <div className="item" style={{ borderTop: 'none' }}>
                <div className="left">
                  <span className="top">Mật khẩu</span>
                  <span className="down">********</span>
                </div>
                <AiOutlineRight />
              </div>
            </div>

            <div className="user-info">
              <h4>Thông tin cá nhân</h4>

              <div className="item">
                <div className="left">
                  <span className="top">Học Viên</span>
                  <span className="down">{currentUser.name}</span>
                </div>
                <AiOutlineRight />
              </div>

              <div className="item" style={{ borderTop: 'none' }}>
                <div className="left">
                  <span className="top">Thống Kê</span>
                  <span className="down">Chi Tiết</span>
                </div>
                <AiOutlineRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStatetoProps = ({ reRender, listCourses }) => {
  return { reRender, listCourses };
};

export default connect(mapStatetoProps, {})(HomePage);
