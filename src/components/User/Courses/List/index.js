import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';

import CourseItem from '../Item';
import Header from '../../Header';
import Wrapper from './List.styled';

const HomePage = ({ listCategorys, listCourses }) => {
  const [categorySelect, setCategorySelect] = useState(null);

  const showListCourses = useMemo(() => {
    if (!categorySelect) return listCourses;
    return listCourses.filter(course =>
      listCategorys.find(item => item._id === categorySelect).courses.includes(course._id),
    );
  }, [categorySelect, listCategorys, listCourses]);

  return (
    <Wrapper>
      <Header />
      <div className="total-courses">
        <div className="left">
          <p>Danh Mục</p>

          <div
            className={`category ${!categorySelect ? 'category-select' : ''}`}
            onClick={() => setCategorySelect(null)}
          >
            Tất Cả
          </div>

          {listCategorys.map((category, index) => (
            <div
              className={`category ${categorySelect === category._id ? 'category-select' : ''}`}
              key={index}
              style={{ borderTop: 'none' }}
              onClick={() => setCategorySelect(category._id)}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className="right">
          {!!showListCourses.length &&
            showListCourses.map((course, index) => <CourseItem course={course} key={index} />)}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStatetoProps = ({ listCategorys, listCourses }) => {
  return { listCategorys, listCourses };
};

export default connect(mapStatetoProps, {})(HomePage);
