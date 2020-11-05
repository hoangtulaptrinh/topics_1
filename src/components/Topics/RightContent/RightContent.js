import React, { useMemo } from 'react';
import { CheckOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from './RightContent.styled';

const List = ({ listUsers }) => {
  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);
  const history = useHistory();

  const query = new URLSearchParams(window.location.search);

  const idTopics = query.get('idThread');

  const listUserBuyThisCourse = useMemo(
    () =>
      !!listUsers.length &&
      listUsers.filter(user => !!user.course && user.course.filter(course => course.id === idTopics)),
    [idTopics, listUsers],
  );

  return (
    <Wrapper>
      <div className="progress-course">
        <p className="title">Tiến Độ Hoàn Thành Các Khóa Học</p>
        {!!currentUser.course &&
          currentUser.course.map((course, index) => (
            <div
              className="course"
              style={
                index === currentUser.course.length - 1
                  ? {
                      borderBottom: '1px solid #e7e9ec',
                    }
                  : {}
              }
              key={index}
              onClick={() => history.push(`/topics?idThread=${course.id}`)}
            >
              <div
                className="is-completed"
                style={
                  course.progress === course.lesson.length
                    ? {
                        border: '1px solid #05d786',
                        color: '#05d786',
                      }
                    : {}
                }
              >
                {course.progress === course.lesson.length ? <CheckOutlined /> : ''}
              </div>
              <div
                className="course-name"
                style={
                  course.progress === course.lesson.length
                    ? {
                        color: '#05d786',
                      }
                    : {}
                }
              >
                {course.name}
              </div>
              <div
                className="completed-status"
                style={
                  course.progress === course.lesson.length
                    ? {
                        border: '1px solid #05d786',
                        color: '#05d786',
                      }
                    : {}
                }
              >{`${course.progress}/${course.lesson.length}`}</div>
            </div>
          ))}
      </div>
      <div className="user-buy-course">
        <p className="title">Những Thành Viên Khác Trong Topic</p>
        {!!listUserBuyThisCourse.length &&
          listUserBuyThisCourse.map((user, index) => (
            <div key={index}>
              <div className="header">
                <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
                <div className="info">
                  <p className="left-info">{user.name}</p>
                  <div className="right-info">
                    <span className="role">
                      {user.role === 'admin' ? (
                        <span>
                          Quản trị viên
                          <StarOutlined />
                        </span>
                      ) : (
                        <span>
                          Học Viên
                          <UserOutlined />
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ listUsers }) => ({ listUsers });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
