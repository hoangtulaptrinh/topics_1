import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllCourses } from '../../../actions';
import CourseItem from '../Courses/Item';
import Header from '../Header';
import Wrapper from './HomePage.styled';

import NUMBER_USERS from '../../../assets/img/NUMBER_USERS.png';
import NUMBER_COURSES from '../../../assets/img/NUMBER_COURSES.png';
import WHERE_TO_LEARNS from '../../../assets/img/WHERE_TO_LEARNS.png';

const HomePage = ({ listCourses, getAllCourses }) => {
  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  return (
    <Wrapper>
      <Header />

      <div className="top-page">
        <div className="intro">
          <p className="intro-1">Đầu Tư Cho Kiến Thức Chưa Bao Giờ Là Phí Phạm</p>
          <p className="intro-2">BẤT KỲ AI CŨNG NÊN HỌC LẬP TRÌNH, VÌ NÓ DẠY TA CÁCH TƯ DUY, Steve Jobs</p>
          <button>Tìm Hiểu Ngay</button>
        </div>
      </div>

      <div className="center-page">
        <div className="info">
          <div className="info__item">
            <img src={NUMBER_USERS} alt="NUMBER_USERS" />
            <p>Trên 10.000 học viên</p>
          </div>
          <div className="info__item">
            <img src={NUMBER_COURSES} alt="NUMBER_COURSES" />
            <p>15+ khóa học dành cho bạn</p>
          </div>
          <div className="info__item">
            <img src={WHERE_TO_LEARNS} alt="WHERE_TO_LEARNS" />
            <p>Học bất cứ lúc nào, bất cứ nơi đâu</p>
          </div>
        </div>

        <div className="top-courses">
          <div className="title">
            <p className="title-1">Khóa học nổi bật</p>
            <p className="title-2">
              Những khóa học có số lượng học viên theo học nhiều nhất và có phản hồi tích cực nhất
            </p>
          </div>

          {!!listCourses.length && (
            <div className="courses">
              <CourseItem course={listCourses[0]} />
              <CourseItem course={listCourses[0]} />
              <CourseItem course={listCourses[0]} />
              <CourseItem course={listCourses[0]} />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStatetoProps = ({ listCourses }) => {
  return { listCourses };
};

export default connect(mapStatetoProps, { getAllCourses })(HomePage);
