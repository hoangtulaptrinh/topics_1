import React, { useMemo } from 'react';
import { BookFilled, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toastSuccess } from '../../../helper/toastHelper';
import Wrapper from './Header.styled';

import LOGO from '../../../assets/img/LOGO.png';

const LIST_NAV_BAR = [
  {
    title: 'Trang Chủ',
    href: '/',
  },
  {
    title: 'Khóa Học',
    href: '/courses',
  },
  {
    title: 'Forums',
    href: '/topics',
  },
];
const Header = () => {
  const history = useHistory();

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const logOut = () => {
    history.push('/login');
    localStorage.clear();
    toastSuccess('Đăng Xuất Thành Công');
  };

  return (
    <Wrapper>
      <div className="left">
        <img alt="logo" src={LOGO} onClick={() => history.push('/')} />
        <div className="nav-bar">
          {LIST_NAV_BAR.map((item, index) => (
            <p className="nav-bar__item" key={index} onClick={() => history.push(item.href)}>
              {item.title}
            </p>
          ))}
        </div>
      </div>

      <div className="right">
        <div className="header">
          <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
          <div className="info">
            <p className="info__name">{currentUser.name}</p>
            <p className="info__coin">{`${currentUser.money} Coin`}</p>
          </div>
        </div>
        <div className="menu">
          <BookFilled />
          <SettingFilled />
          <LogoutOutlined onClick={logOut} />
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(Header);
