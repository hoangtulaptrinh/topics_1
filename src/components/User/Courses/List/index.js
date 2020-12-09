import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';

import CourseItem from '../Item';
import Header from '../../Header';
import Wrapper from './List.styled';

const HomePage = ({ listUsers, listCategorys, listCourses }) => {
  const [categorySelect, setCategorySelect] = useState(null);
  const [textSearch, setTextSearch] = useState('');

  const topCourses = useMemo(() => {
    if (!listUsers.listUsers.length || !listCourses.length) return [];

    let arr = [];

    const listAfterMap = listUsers.listUsers
      .map(user => user.course)
      .filter(course => !!course)
      .map(item => item.map(x => x.id));

    listAfterMap.forEach(y => {
      arr = [...[...arr, ...y]];
    });

    return listCourses.map(z => {
      let count = 0;

      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === z._id) count++;
      }
      return {
        ...z,
        count,
      };
    });
  }, [listUsers, listCourses]);

  const showListCourses = useMemo(() => {
    if (!categorySelect) return topCourses;

    return topCourses.filter(course =>
      listCategorys.find(item => item._id === categorySelect).courses.includes(course._id),
    );
  }, [categorySelect, listCategorys, topCourses]);

  return (
    <Wrapper>
      <Header />
      <div className="total-courses">
        <div className="left">
          <div className="search-wrapper">
            <div className="search-icon">
              <input
                className="search-circle"
                type="text"
                value={textSearch}
                onChange={e => setTextSearch(e.target.value)}
              />
              <div className="search-bar" />
            </div>
          </div>

          <>
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
          </>
        </div>

        <div className="right">
          {!!showListCourses.length &&
            showListCourses
              .filter(course => course.name.includes(textSearch))
              .map((course, index) => <CourseItem course={course} key={index} />)}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStatetoProps = ({ listUsers, listCategorys, listCourses }) => {
  return { listUsers, listCategorys, listCourses };
};

export default connect(mapStatetoProps, {})(HomePage);
