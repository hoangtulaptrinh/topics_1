import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { GiBookmark, GiTwoCoins } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { Tooltip } from 'antd';
import Wrapper from './Item.styled';

const Item = ({ course }) => {
  const history = useHistory();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
        <div className="course__intro">
          <Tooltip title={course.intro}>
            <span>{course.intro.length > 90 ? `${course.intro.slice(0, 90)}...` : course.intro}</span>
          </Tooltip>
        </div>

        {HasThisCourse ? (
          <p style={{ fontWeight: 500, color: 'rgb(5, 215, 134)' }}>Bạn Đã Sở Hữu Khóa Học Này</p>
        ) : (
          <p style={{ fontWeight: 500, color: 'rgb(136, 131, 131)' }}>Bạn Chưa Sở Hữu Khóa Học Này</p>
        )}

        <div className="course__more-info">
          <div className="item">
            {course.lesson.length}
            <GiBookmark />
          </div>
          <div className="item">
            {course.count}
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
