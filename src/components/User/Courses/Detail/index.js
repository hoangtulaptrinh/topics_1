import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { FaCheck, FaLaptopCode } from 'react-icons/fa';
import moment from 'moment';
import { BookFilled } from '@ant-design/icons';
import { AiFillClockCircle } from 'react-icons/ai';

import Header from '../../Header';
import Wrapper from './Detail.styled';

const HomePage = ({ listCategorys, listCourses }) => {
  const course = useMemo(() => {
    if (!listCourses.length) return null;

    const pathname = window.location.pathname;
    return listCourses.find(course => course._id === pathname.substring(pathname.lastIndexOf('/') + 1));
  }, [listCourses]);

  const diffDayUpdate = useCallback(dayUpdate => moment().diff(moment(dayUpdate), 'days'), []);

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const HasThisCourse = useMemo(() => {
    if (!course) return false;
    const pathname = window.location.pathname;
    if (currentUser.course.find(course => course.id === pathname.substring(pathname.lastIndexOf('/') + 1))) return true;

    return false;
  }, [course, currentUser]);

  console.log(course, currentUser);

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
          <div className="right">
            <img src={course.image} alt="course" />
            <div className="right__info">
              <span className="has-course">
                {HasThisCourse && 'Bạn Đã Mua Khóa Học Này'}
                {!HasThisCourse && 'Bạn Chưa Mua Khóa Học Này'}
              </span>

              <button>Mua Ngay</button>

              <div className="detail">
                <div className="info">
                  <BookFilled />
                  <span className="content">Tổng số {course.lesson.length} bài học</span>
                </div>
                <div className="info">
                  <AiFillClockCircle />
                  <span className="content">Cần 50 giờ để học</span>
                </div>
                <div className="info">
                  <FaLaptopCode />
                  <span className="content">Học mọi lúc, mọi nơi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const mapStatetoProps = ({ listCategorys, listCourses }) => {
  return { listCategorys, listCourses };
};

export default connect(mapStatetoProps, {})(HomePage);