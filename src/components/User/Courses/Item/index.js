import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { GiBookmark, GiTwoCoins } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';

import Wrapper from './Item.styled';

const Item = ({ course }) => {
  const history = useHistory();

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const HasThisCourse = useMemo(() => {
    if (!course || !currentUser.course) return null;
    if (currentUser.course.find(item => item.id === course._id)) return true;

    return false;
  }, [course, currentUser]);

  return (
    <Wrapper>
      <img
        src={course.image}
        onClick={() => {
          !HasThisCourse && history.push(`/courses/detail/${course._id}`);
          !!HasThisCourse && history.push(`/learn/${course._id}`);
        }}
        alt="course-img"
      />
      <div className="course">
        <p className="course__name">{course.name}</p>
        <p className="course__intro">{course.intro}</p>
        <div className="course__more-info">
          <div className="item">
            {course.lesson.length}
            <GiBookmark />
          </div>
          <div className="item">
            4500
            <IoIosPeople />
          </div>
          <div className="item cost">
            {course.cost}
            <GiTwoCoins />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Item;
