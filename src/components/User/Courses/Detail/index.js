import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import moment from 'moment';

import Header from '../../Header';
import Wrapper from './Detail.styled';

const HomePage = ({ listCategorys, listCourses }) => {
  const course = useMemo(() => {
    if (!listCourses.length) return null;

    const pathname = window.location.pathname;
    return listCourses.find(course => course._id === pathname.substring(pathname.lastIndexOf('/') + 1));
  }, [listCourses]);

  const diffDayUpdate = useCallback(dayUpdate => moment().diff(moment(dayUpdate), 'days'), []);

  return (
    <Wrapper>
      <Header />
      {!!course && (
        <div className="total-detail">
          <div className="left">
            <h1>{course.name}</h1>

            <p className="intro">{course.intro}</p>

            <h2>Bạn sẽ học được gì</h2>

            <div className="content">
              <div className="content__item">
                <FaCheck />
                Các kiến thức cơ bản, nền móng của ngành IT
              </div>
              <div className="content__item">
                <FaCheck />
                Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng
              </div>
              <div className="content__item">
                <FaCheck />
                Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng
              </div>
              <div className="content__item">
                <FaCheck />
                Hiểu hơn về cách internet và máy vi tính hoạt động
              </div>
            </div>

            <h2>Nội Dung Khóa Học</h2>

            <div className="video title">
              <div className="video__left">Danh sách bài học</div>
              <div className="video__right">
                <span>{course.lesson.length} bài học</span>
                <span>50:00</span>
              </div>
            </div>

            {!!course.lesson.length &&
              course.lesson.map((lesson, index) => (
                <div className="video" key={index}>
                  <div className="video__left">{lesson.name}</div>
                  <div className="video__right">
                    {!diffDayUpdate(lesson.date_create) && <span>Mới Cập nhật hôm nay</span>}
                    {!!diffDayUpdate(lesson.date_create) && (
                      <span>Cập nhật {diffDayUpdate(lesson.date_create)} ngày trước</span>
                    )}
                    <span>50:00</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="right"></div>
        </div>
      )}
    </Wrapper>
  );
};

const mapStatetoProps = ({ listCategorys, listCourses }) => {
  return { listCategorys, listCourses };
};

export default connect(mapStatetoProps, {})(HomePage);
