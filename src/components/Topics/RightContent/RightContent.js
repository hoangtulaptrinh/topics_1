import React, { useMemo } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Wrapper from './RightContent.styled';

const List = () => {
  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);
  let history = useHistory();
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
              onClick={() => history.push(`/topics/${course.id}`)}
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
      <div className="user-buy-course">Những Thành Viên Khác Trong Topic</div>
    </Wrapper>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
