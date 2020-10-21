import React, { useEffect, useMemo } from 'react';
import { BookFilled, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllCourses, getAllCategory } from '../../../actions';
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
const Header = ({ getAllCourses, getAllCategory }) => {
  const history = useHistory();

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const logOut = () => {
    history.push('/login');
    localStorage.clear();
    toastSuccess('Đăng Xuất Thành Công');
  };

  useEffect(() => {
    getAllCourses();
    getAllCategory();
  }, [getAllCategory, getAllCourses]);

  useEffect(() => {
    window.location.pathname === '/' && window.addEventListener('scroll', handleScroll);

    if (window.location.pathname !== '/') {
      const headerElement = document.querySelector('.total-header');

      headerElement.style.top = 0;
      headerElement.style.left = 0;
      headerElement.style.right = 0;
      headerElement.style.paddingLeft = '50px';
      headerElement.style.background = '#000000';

      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const headerElement = document.querySelector('.total-header');
    if (window.location.pathname === '/' && window.scrollY > 150) {
      headerElement.style.top = 0;
      headerElement.style.left = 0;
      headerElement.style.right = 0;
      headerElement.style.paddingLeft = '50px';
      headerElement.style.background = '#000000';
      return;
    }

    headerElement.style.top = '';
    headerElement.style.left = '';
    headerElement.style.right = '';
    headerElement.style.paddingLeft = '';
    headerElement.style.background = '';
  };

  return (
    <Wrapper>
      <div className="total-header">
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
      </div>
    </Wrapper>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { getAllCourses, getAllCategory })(Header);
