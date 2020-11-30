import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Modal, Collapse, Button } from 'antd';
import { connect } from 'react-redux';
import { FcReadingEbook } from 'react-icons/fc';
import { GiSpellBook } from 'react-icons/gi';
import { IoMdCodeWorking } from 'react-icons/io';
import { Player } from 'video-react';
import { useHistory } from 'react-router-dom';
import { FaRegCheckSquare } from 'react-icons/fa';

import { updateProcessCourse } from '../../../actions';
import { toastSuccess, toastWarning, toastError } from '../../../helper/toastHelper';
import Header from '../Header';
import moment from 'moment';
import Wrapper from './Learn.styled';

const { Panel } = Collapse;

const HomePage = ({ listCourses, updateProcessCourse }) => {
  const [lesson, setLesson] = useState(0);
  const [videoLesson, setVideoLesson] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const history = useHistory();

  const pathname = window.location.pathname;

  const idThisCourse = pathname.substring(pathname.lastIndexOf('/') + 1);

  const course = useMemo(() => {
    if (!listCourses.length) return null;
    return listCourses.find(course => course._id === idThisCourse);
  }, [idThisCourse, listCourses]);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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

  const handleQuiz = useCallback(
    index => {
      let cloneQuiz = [...quiz];

      quiz.includes(index) && (cloneQuiz = cloneQuiz.filter(item => item !== index));
      !quiz.includes(index) && cloneQuiz.push(index);

      setQuiz([...cloneQuiz]);
    },
    [quiz],
  );

  const processOnThisCourse = useMemo(() => {
    if (
      !course ||
      !currentUser.course ||
      (currentUser.course && !currentUser.course.length) ||
      !currentUser.course.find(item => item.id === idThisCourse)
    )
      return 0;

    return currentUser.course.find(item => item.id === idThisCourse).progress;
  }, [course, currentUser.course, idThisCourse]);

  const handlequizSubmit = useCallback(() => {
    const listQuiz = course.lesson[lesson].question.answer;

    const showError = () => {
      toastError('Sai rồi bạn ơi học lại cho vững kiến thức nha');
      setIsShowModal(false);
      setQuiz([]);
    };

    if (quiz.length !== listQuiz.filter(item => item.isTrue === 'true').length) {
      showError();
      return;
    }

    let result = true;

    quiz.forEach(index => {
      if (listQuiz[index].isTrue === 'false') {
        result = false;
      }
    });

    if (!result) {
      showError();
      return;
    }

    toastSuccess('Đúng Rồi Bạn Ơi');
    setIsShowModal(false);
    setQuiz([]);

    if (lesson === processOnThisCourse) {
      updateProcessCourse({
        course: {
          id: idThisCourse,
          progress: processOnThisCourse + 1,
          date_finish: moment().format(),
        },
      });
    }
  }, [course, idThisCourse, lesson, processOnThisCourse, quiz, updateProcessCourse]);

  return (
    <Wrapper>
      <Header />
      {!!course && (
        <div className="total-learn">
          <div className="left">
            {course.lesson[lesson] ? (
              <Player className="video-custom" src={course.lesson[videoLesson].video} />
            ) : (
              <h1>Bài Học Đang Được Chuẩn Bị</h1>
            )}
          </div>
          <div className="right">
            <Collapse className="learn-collapse">
              <Panel style={{ fontWeight: 500 }} header="Bài Giảng Và Tài Liệu Liên Quan" key="1" showArrow={false}>
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
              <Panel style={{ fontWeight: 500 }} header="Danh Sách Bài Học" key="2" showArrow={false}>
                <Collapse className="learn-collapse">
                  {course.lesson.map((item, index) => (
                    <Panel
                      style={
                        index < processOnThisCourse
                          ? { background: 'rgb(16 255 0 / 33%)', fontWeight: 'bold' }
                          : index === processOnThisCourse
                          ? { background: '#fbff0040', fontWeight: 'bold' }
                          : { background: '#ff000038', fontWeight: 'bold' }
                      }
                      header={`${index + 1}. ${item.name}`}
                      showArrow={false}
                      extra={
                        <div className="play-video-icon" onClick={e => e.stopPropagation()}>
                          {videoLesson !== index && (
                            <AiOutlinePlayCircle
                              onClick={() => {
                                if (index > processOnThisCourse) {
                                  toastWarning(
                                    'Bạn Chưa Hoàn Thành Bài Tập Trắc Nghiệm Kiểm Tra Kiến thức Của Bài Tập Trước',
                                  );
                                  return;
                                }

                                setVideoLesson(index);
                                setQuiz([]);
                              }}
                            />
                          )}
                        </div>
                      }
                      key={index}
                    >
                      <div className="lesson-content">
                        <div style={{ marginBottom: 10, fontWeight: 500, color: '#888383' }}>
                          {!diffDayUpdate(item.date_create) && <span>Mới Cập nhật hôm nay</span>}
                          {!!diffDayUpdate(item.date_create) && (
                            <span>Cập nhật {diffDayUpdate(item.date_create)} ngày trước</span>
                          )}
                        </div>

                        <p>
                          Bài Tập Thực Hành
                          <IoMdCodeWorking
                            style={{ cursor: 'pointer', color: '#7a00ff' }}
                            onClick={() => {
                              if (index > processOnThisCourse) {
                                toastWarning(
                                  'Bạn Chưa Hoàn Thành Bài Tập Trắc Nghiệm Kiểm Tra Kiến thức Của Bài Tập Trước',
                                );
                                return;
                              }

                              window.location.href = item.exercise;
                            }}
                          />
                        </p>

                        <p>
                          Bài Tập Trắc Nghiệm
                          <FaRegCheckSquare
                            style={{ cursor: 'pointer' }}
                            color="#009090"
                            onClick={() => {
                              if (index > processOnThisCourse) {
                                toastWarning(
                                  'Bạn Chưa Hoàn Thành Bài Tập Trắc Nghiệm Kiểm Tra Kiến thức Của Bài Tập Trước',
                                );
                                return;
                              }

                              setLesson(index);
                              setIsShowModal(true);
                            }}
                          />
                        </p>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
              <div
                style={{ fontWeight: 500 }}
                onClick={() => history.push(`/topics?idThread=${course._id}`)}
                className="go-to-forum"
              >
                Đến Forum Thảo Luận Về Bài Học
              </div>
            </Collapse>
          </div>

          <Modal
            className="quiz-modal"
            title="Câu hỏi ôn lại kiến thức"
            visible={isShowModal}
            footer={false}
            closable={false}
          >
            {course.lesson[lesson] && (
              <div className="question">
                <div className="quiz title">
                  <p>Chọn toàn bộ các đáp án bạn thấy đúng.</p>
                  {`Câu hỏi: ${course.lesson[lesson].question.name}`}
                </div>

                {course.lesson[lesson].question.answer.map((item, index) => (
                  <div className="quiz cursor-pointer" onClick={() => handleQuiz(index)} key={index}>
                    <input type="checkbox" checked={quiz.includes(index)} />
                    <div className="content">
                      <span>{['A', 'B', 'C', 'D'][index]}.</span>
                      {item.content}
                    </div>
                  </div>
                ))}

                <Button type="primary" disabled={!quiz.length} onClick={handlequizSubmit}>
                  Nộp Bài
                </Button>
              </div>
            )}
          </Modal>
        </div>
      )}
    </Wrapper>
  );
};

const mapStatetoProps = ({ reRender, listCourses }) => {
  return { reRender, listCourses };
};

export default connect(mapStatetoProps, { updateProcessCourse })(HomePage);
