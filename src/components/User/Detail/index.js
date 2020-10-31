import React, { useState, useCallback, useMemo } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { BookFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { FaCheck, FaLaptopCode } from 'react-icons/fa';
import { Modal } from 'antd';
import moment from 'moment';

import { buyThisCourse } from '../../../../actions';
import Header from '../../Header';
import Wrapper from './Detail.styled';

const HomePage = ({ buyThisCourse, listCourses }) => {
  const [modalBuy, setModalBuy] = useState(false);

  const pathname = window.location.pathname;

  const idThisCourse = pathname.substring(pathname.lastIndexOf('/') + 1);

  const course = useMemo(() => {
    if (!listCourses.length) return null;
    return listCourses.find(course => course._id === idThisCourse);
  }, [idThisCourse, listCourses]);

  const diffDayUpdate = useCallback(dayUpdate => moment().diff(moment(dayUpdate), 'days'), []);

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const HasThisCourse = useMemo(() => {
    if (!course || !currentUser.course) return false;
    if (currentUser.course.find(course => course.id === idThisCourse)) return true;

    return false;
  }, [course, currentUser, idThisCourse]);

  console.log(modalBuy, course, currentUser);

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

              <button onClick={() => setModalBuy(true)}>Mua Ngay</button>

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
          <Modal
            title="Basic Modal"
            visible={modalBuy}
            onOk={() => buyThisCourse(idThisCourse)}
            okText="Mua Luôn"
            onCancel={() => setModalBuy(false)}
            cancelText="Suy Nghĩ Tí"
          >
            <p>
              Bạn Muốn Mua Khóa Học
              <span style={{ margin: '0 5px', color: '#096dd9' }}>{course.name}</span>
              với
              <span style={{ margin: '0 5px', color: '#ff0000' }}>{course.cost}</span>
              coin
            </p>
            <p>
              Sau Khi Mua Bạn Sẽ Còn Lại
              <span style={{ margin: '0 5px', color: '#ff0000' }}>
                {Number(currentUser.money) - Number(course.cost)}
              </span>
              coin
            </p>
          </Modal>
        </div>
      )}
    </Wrapper>
  );
};

const mapStatetoProps = ({ reRender, listCourses }) => {
  return { reRender, listCourses };
};

export default connect(mapStatetoProps, { buyThisCourse })(HomePage);
