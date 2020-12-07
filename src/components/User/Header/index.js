import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BookFilled, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Popover, Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { getAllCourses, getAllCategory } from '../../../actions';
import { refreshCurrentUser } from '../../../actions';
import AuthorDeveloper from '../../AuthorDeveloper/AuthorDeveloper';
import Wrapper from './Header.styled';

import EAT_SLEEP_CODE from '../../../assets/img/EAT_SLEEP_CODE.jpg';

const Header = ({ listCourses, refreshCurrentUser, getAllCourses, getAllCategory }) => {
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const logOut = () => {
    history.push('/login');
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    getAllCourses();
    getAllCategory();
    refreshCurrentUser();
  }, [getAllCategory, getAllCourses, refreshCurrentUser]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

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

  const listCoursesCurrentUser = useMemo(() => {
    const currentUserCourse = currentUser.course;
    if (!currentUserCourse || (!!currentUserCourse && !currentUserCourse.length)) return [];

    const currentUserCourseMapToId = currentUserCourse.map(item => item.id);

    return listCourses.filter(item => currentUserCourseMapToId.includes(item._id));
  }, [currentUser, listCourses]);

  const diffUpdate = useCallback(item => {
    const diffDayUpdate = moment().diff(moment(item.date_create), 'days');
    const diffHourUpdate = moment().diff(moment(item.date_create), 'hours');
    const diffMinuteUpdate = moment().diff(moment(item.date_create), 'minutes');
    const diffSecondUpdate = moment().diff(moment(item.date_create), 'seconds');

    if (diffDayUpdate) return `${diffDayUpdate} ngày trước`;
    if (diffHourUpdate) return `${diffHourUpdate} giờ trước`;
    if (diffMinuteUpdate) return `${diffMinuteUpdate} phút trước`;
    if (!diffSecondUpdate) return `vừa xong`;
    return `${diffSecondUpdate} giây trước`;
  }, []);

  const menu = (
    <Menu className="scroll">
      {listCoursesCurrentUser.length &&
        listCoursesCurrentUser.map((item, index) => (
          <Menu.Item key={index} onClick={() => history.push(`/courses/detail/${item._id}`)}>
            <div style={{ display: 'flex' }}>
              <img height={120} width={220} src={item.image} alt="test-test" />
              <div style={{ marginLeft: 20 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: '.8rem', marginTop: 4, color: '#888' }}>đã mua vào {diffUpdate(item)}</div>
                <div>tổng cộng {item.lesson.length} bài học</div>
                <div
                  style={{
                    margin: '4px 0 2px 0',
                    display: 'inline-block',
                    fontSize: '.8rem',
                    fontWeight: 600,
                    color: '#007791',
                  }}
                >
                  {item.lesson.length
                    ? (Number(currentUser.course.find(course => course.id === item._id).progress) /
                        Number(item.lesson.length)) *
                      100
                    : 0}
                  %
                </div>
                <div
                  style={{
                    width: '100%',
                    background: '#d6d6d6',
                    height: 6,
                    borderRadius: '3px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${
                        currentUser.course.find(course => course.id === item._id).progress
                          ? `${(Number(currentUser.course.find(course => course.id === item._id).progress) /
                              Number(item.lesson.length)) *
                              100}%`
                          : '0%'
                      }
                  `,
                      height: '100%',
                      background: '#05d786',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: '#d6d6d6', marginTop: 10 }} />
          </Menu.Item>
        ))}
    </Menu>
  );

  const hrefTopics = useMemo(() => {
    if (!listCoursesCurrentUser.length) return '/topics';

    return `/topics?idThread${listCoursesCurrentUser[0]._id}`;
  }, [listCoursesCurrentUser]);

  const listNavBar = useMemo(
    () => [
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
        href: hrefTopics,
      },
    ],
    [hrefTopics],
  );

  return (
    <Wrapper>
      <div className="total-header">
        <div className="left">
          <img alt="logo" src={EAT_SLEEP_CODE} onClick={() => history.push('/')} />
          <div className="nav-bar">
            {listNavBar.map((item, index) => (
              <p className="nav-bar__item" key={index} onClick={() => history.push(item.href)}>
                {item.title}
              </p>
            ))}
          </div>
        </div>

        <div className="right">
          <Popover
            overlayClassName="custom-author"
            content={<AuthorDeveloper />}
            trigger="click"
            visible={visible1}
            onVisibleChange={() => setVisible1(!visible1)}
          >
            <p className="nav-bar__item1">Người Sáng Lập</p>
          </Popover>

          <div className="header">
            <img
              src={
                currentUser.image
                  ? currentUser.image
                  : 'https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg'
              }
              alt="avatar"
            />
            <div className="info">
              <p className="info__name">{currentUser.name}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="info__coin">{`${currentUser.money} Coin`}</p>
                <Popover
                  content={
                    <div>
                      <p style={{ fontWeight: 'bold' }}>Chuyển Khoản Ngân Hàng: </p>

                      <p style={{ fontWeight: 'bold' }}>Ngân hàng Á Châu Bank </p>
                      <p>SỐ TK: 12287397</p>
                      <p>TÊN TK: ĐỖ TÙNG DƯƠNG</p>
                      <p>CHI NHÁNH: Mễ Trì – Hà Nội</p>

                      <p style={{ fontWeight: 'bold' }}>Ngân hàng BIDV </p>
                      <p>SỐ TK: 12510000586328</p>
                      <p>TÊN TK: ĐỖ TÙNG DƯƠNG</p>
                      <p>CHI NHÁNH: Từ Liêm – Hà Nội</p>

                      <p style={{ fontWeight: 'bold' }}>Ngân hàng Tiên Phong Bank </p>
                      <p>SỐ TK: 62620992601</p>
                      <p>TÊN TK: ĐỖ TÙNG DƯƠNG</p>
                      <p>CHI NHÁNH: Cầu Giấy – Hà Nội</p>

                      <p style={{ fontWeight: 'bold' }}>Chuyển Khoản MoMo - AirPay - ViettelPay: </p>
                      <p>0969374623</p>

                      <p style={{ fontWeight: 'bold' }}>
                        Lời nhắn <span style={{ fontWeight: 'normal' }}>: email đăng ký + SĐT</span>
                      </p>

                      <p style={{ fontWeight: 'bold' }}>Mọi thắc mắc xin liên hệ: </p>
                      <p>Mr.Dat 0326035536</p>
                    </div>
                  }
                  title={<span style={{ fontWeight: 'bold' }}>Thông Tin Thanh Toán</span>}
                  trigger="click"
                  visible={visible}
                  onVisibleChange={() => setVisible(!visible)}
                >
                  <span style={{ cursor: 'pointer', color: 'white', fontWeight: 'bold' }}>Nạp coin</span>
                </Popover>
              </div>
            </div>
          </div>
          <div className="menu">
            <Dropdown overlay={menu} arrow>
              <BookFilled />
            </Dropdown>

            <SettingFilled onClick={() => history.push('/info')} />
            <LogoutOutlined onClick={logOut} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ listCourses, reRender }) => ({ listCourses, reRender });

export default connect(mapStateToProps, { refreshCurrentUser, getAllCourses, getAllCategory })(Header);
