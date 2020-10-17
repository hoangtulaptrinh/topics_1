import React from 'react';
// import { useHistory } from 'react-router-dom';
import { GiBookmark, GiTwoCoins } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';

import Wrapper from './Item.styled';

const Item = ({ course }) => {
  console.log(course);
  return (
    <Wrapper>
      <img src={course.image} alt="course-img" />
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
