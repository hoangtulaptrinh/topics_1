import React, { useCallback, useEffect, useMemo } from 'react';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { FcReadingEbook } from 'react-icons/fc';
import { GiSpellBook } from 'react-icons/gi';
import { Player } from 'video-react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { IoMdCodeWorking } from 'react-icons/io';

import { toastWarning } from '../../../helper/toastHelper';
import Header from '../Header';
import Wrapper from './Learn.styled';

const { Panel } = Collapse;

const HomePage = ({ listCourses }) => {
  const history = useHistory();

  const pathname = window.location.pathname;

  const idThisCourse = pathname.substring(pathname.lastIndexOf('/') + 1);

  const course = useMemo(() => {
    if (!listCourses.length) return null;
    return listCourses.find(course => course._id === idThisCourse);
  }, [idThisCourse, listCourses]);

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const HasThisCourse = useMemo(() => {
    if (!course || !currentUser.course) return null;
    if (currentUser.course.find(course => course.id === idThisCourse)) return true;

    return false;
  }, [course, currentUser, idThisCourse]);

  useEffect(() => {
    if (!course || !currentUser.course) return;
    if (!!HasThisCourse) return;

    toastWarning('Bạn Chưa Mua Khóa Học Này');
    history.push('/');
  }, [HasThisCourse, course, currentUser.course, history]);

  const diffDayUpdate = useCallback(dayUpdate => moment().diff(moment(dayUpdate), 'days'), []);

  console.log(course);

  return (
    <Wrapper>
      <Header />
      {!!course && (
        <div className="total-learn">
          <div className="left">
            <Player src={course.lesson[0].video} />
          </div>
          <div className="right">
            <Collapse className="learn-collapse">
              <Panel header="Bài Giảng Và Tài Liệu Liên Quan" key="1" showArrow={false}>
                <p>
                  Bài Giảng
                  <a href={course.outline}>
                    <FcReadingEbook />
                  </a>
                </p>

                <p>
                  Tài Liệu Liên Quan
                  {course.references.map((item, index) => (
                    <a target="_blank" rel="noopener noreferrer" href={item} key={index}>
                      <GiSpellBook />
                    </a>
                  ))}
                </p>
              </Panel>
              <Panel header="Danh Sách Bài Học" key="2" showArrow={false}>
                <Collapse className="learn-collapse">
                  {course.lesson.map((item, index) => (
                    <Panel header={`${index + 1}. ${item.name}`} showArrow={false} key={index}>
                      <div className="lesson-content">
                        {!diffDayUpdate(item.date_create) && <span>Mới Cập nhật hôm nay</span>}
                        {!!diffDayUpdate(item.date_create) && (
                          <span>Cập nhật {diffDayUpdate(item.date_create)} ngày trước</span>
                        )}

                        <p>
                          Bài Tập Thực Hành
                          <a target="_blank" rel="noopener noreferrer" href={item.exercise}>
                            <IoMdCodeWorking style={{ marginTop: 5 }} />
                          </a>
                        </p>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            </Collapse>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const mapStatetoProps = ({ reRender, listCourses }) => {
  return { reRender, listCourses };
};

export default connect(mapStatetoProps, {})(HomePage);
