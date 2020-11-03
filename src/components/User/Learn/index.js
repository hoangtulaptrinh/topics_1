import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { FcReadingEbook } from 'react-icons/fc';
import { GiSpellBook } from 'react-icons/gi';
import { IoMdCodeWorking } from 'react-icons/io';
import { Player } from 'video-react';
import { toastWarning } from '../../../helper/toastHelper';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import moment from 'moment';
import Wrapper from './Learn.styled';

const { Panel } = Collapse;

const HomePage = ({ listCourses }) => {
  const [lesson, setLesson] = useState(0);

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
    window.scrollTo({
      top: 0,
    });

    if (!course || !currentUser.course) return;
    if (!!HasThisCourse) return;

    toastWarning('Bạn Chưa Mua Khóa Học Này');
    history.push('/');
  }, [HasThisCourse, course, currentUser.course, history]);

  const diffDayUpdate = useCallback(dayUpdate => moment().diff(moment(dayUpdate), 'days'), []);

  console.log(course);

  console.log(currentUser);

  return (
    <Wrapper>
      <Header />
      {!!course && (
        <div className="total-learn">
          <div className="left">{course.lesson[lesson] && <Player src={course.lesson[lesson].video} />}</div>
          <div className="left">{!course.lesson[lesson] && <h1>Bài Học Đang Được Chuẩn Bị</h1>}</div>
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
                    <Panel
                      header={`${index + 1}. ${item.name}`}
                      showArrow={false}
                      extra={
                        <div className="play-video-icon" onClick={e => e.stopPropagation()}>
                          <AiOutlinePlayCircle onClick={() => setLesson(index)} />
                        </div>
                      }
                      key={index}
                    >
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
              <div onClick={() => history.push(`/topics/${course._id}`)} className="go-to-forum">
                Đến Forum Thảo Luận Về Bài Học
              </div>
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
