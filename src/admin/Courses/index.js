import React, { Fragment, useEffect, useState } from 'react';
import { Table, Modal, Button, Checkbox, Input } from 'antd';
import { createNewCourse, createNewLesson, getAllCourses } from '../../actions';
import { connect } from 'react-redux';
import { Player } from 'video-react';
import { FileImageOutlined, FileTextOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 8,
  },
};

const Courses = ({ listCourses, getAllCourses, createNewCourse, createNewLesson }) => {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalAddLesson, setVisibleModalAddLesson] = useState(false);

  const columns = [
    {
      align: 'center',
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: 'Introduction',
      dataIndex: 'intro',
      key: 'intro',
    },
    {
      align: 'center',
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      align: 'center',
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img width={50} height={50} src={image} alt="test" />,
    },
    {
      align: 'center',
      title: 'Outline',
      dataIndex: 'outline',
      key: 'outline',
      render: outline => <a href={outline}> tai </a>,
    },
    {
      align: 'center',
      title: 'References',
      dataIndex: 'references',
      key: 'references',
      render: references =>
        references.map((item, index) => (
          <div key={index}>
            <a href={item} target="_blank" rel="noreferrer">
              references link {`${index + 1}`}
            </a>
          </div>
        )),
    },
    {
      align: 'center',
      title: 'Lessons',
      dataIndex: 'lesson',
      key: 'lesson',
      // eslint-disable-next-line no-unused-vars
      render: (lesson, row, _) => {
        return (
          <div onClick={() => setCurrentCourse(row._id)}>
            {lesson.map((item, index) => (
              <div key={index} style={{ marginTop: 5 }}>
                <Button type="primary" onClick={() => setCurrentLesson(item)}>
                  {`Lesson ${index + 1}`}
                </Button>
              </div>
            ))}
            <PlusCircleOutlined style={{ cursor: 'pointer' }} onClick={() => setVisibleModalAddLesson(true)} />
          </div>
        );
      },
    },
    {
      align: 'center',
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const showModalAdd = () => setVisibleModalAdd(true);

  const formik = useFormik({
    initialValues: { name: '', intro: '', cost: '', image: null, outline: null, references: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('hãy nhập name'),
      intro: Yup.string().required('hãy nhập intro'),
      cost: Yup.string().required('hãy nhập cost'),
      image: Yup.string().required('hãy nhập image'),
      outline: Yup.string().required('hãy nhập outline'),
      references: Yup.string().required('hãy nhập references'),
    }),
    onSubmit: values => {
      const { name, intro, cost, image, outline, references } = values;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('intro', intro);
      formData.append('cost', cost);
      formData.append('image', image);
      formData.append('outline', outline);

      const arrayReferences = references.split(' ');

      arrayReferences.forEach((item, index) => {
        formData.append(`references[]`, arrayReferences[index]);
      });

      createNewCourse(formData);
      setVisibleModalAdd(false);
    },
  });

  const formikLesson = useFormik({
    initialValues: {
      name: '',
      exercise: '',
      video: null,
      question: {
        name: '',
        answer: [
          {
            content: '',
            isTrue: 'false',
          },
          {
            content: '',
            isTrue: 'false',
          },
          {
            content: '',
            isTrue: 'false',
          },
          {
            content: '',
            isTrue: 'false',
          },
        ],
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required('hãy nhập name'),
      exercise: Yup.string().required('hãy nhập exercise'),
    }),
    onSubmit: values => {
      const { name, exercise, video, question } = values;

      const formData = new FormData();

      // formData.append('id', id);

      formData.append('name', name);
      formData.append('exercise', exercise);
      formData.append('video', video);

      formData.append('question[name]', question.name);

      formData.append('question[answer][0][content]', question.answer[0].content);
      formData.append('question[answer][0][isTrue]', question.answer[0].isTrue);
      formData.append('question[answer][1][content]', question.answer[1].content);
      formData.append('question[answer][1][isTrue]', question.answer[1].isTrue);
      formData.append('question[answer][2][content]', question.answer[2].content);
      formData.append('question[answer][2][isTrue]', question.answer[2].isTrue);
      formData.append('question[answer][3][content]', question.answer[3].content);
      formData.append('question[answer][3][isTrue]', question.answer[3].isTrue);

      createNewLesson({
        id: currentCourse,
        data: formData,
      });
      setVisibleModalAddLesson(false);
    },
  });

  return (
    <Fragment>
      <Button type="primary" onClick={showModalAdd} style={{ margin: '10px 0px' }}>
        Add New Course
      </Button>
      <Table key={listCourses._id} dataSource={listCourses} columns={columns} bordered />
      {/* Modal Lesson */}
      <Modal title="Lesson" onCancel={() => setCurrentLesson(null)} visible={currentLesson !== null} footer={null}>
        {currentLesson && (
          <Fragment>
            <div>{currentLesson.name}</div>
            <a href={currentLesson.exercise} target="_blank" rel="noreferrer">
              exercise
            </a>
            <div>{currentLesson.question.name}</div>
            <div>
              {currentLesson.question.answer.map((item, index) => (
                <Fragment key={index}>
                  <div> {item.content} </div>
                  <Checkbox checked={item.isTrue === 'true'} />
                </Fragment>
              ))}
            </div>
            {currentLesson.video ? <Player src={currentLesson.video} /> : <h1>Bài Học Đang Được Chuẩn Bị</h1>}
          </Fragment>
        )}
      </Modal>
      {/* Modal Add New Course */}
      <Modal title="Add new course" onCancel={() => setVisibleModalAdd(false)} visible={visibleModalAdd} footer={null}>
        <form onSubmit={formik.handleSubmit}>
          <input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />

          <input name="intro" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.intro} />

          <input name="cost" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cost} />

          <textarea
            name="references"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.references}
          />

          <div className="wrapper-field-upload">
            <label htmlFor="image-input">
              <FileImageOutlined />
            </label>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              name="image"
              onChange={event => formik.setFieldValue('image', event.target.files[0])}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="wrapper-field-upload">
            <label htmlFor="outline-input">
              <FileTextOutlined />
            </label>
            <input
              type="file"
              id="outline-input"
              name="outline"
              onChange={event => formik.setFieldValue('outline', event.target.files[0])}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="submit-comment">
            <button className="post" type="submit">
              Đăng Tải
            </button>
            <button className="cancel">Hủy Bỏ</button>
          </div>
        </form>
      </Modal>

      {/* Modal Add New Lesson */}
      <Modal
        title="Add new lesson"
        onCancel={() => setVisibleModalAddLesson(false)}
        visible={visibleModalAddLesson}
        footer={null}
      >
        <form onSubmit={formikLesson.handleSubmit}>
          <input
            name="name"
            onChange={formikLesson.handleChange}
            onBlur={formikLesson.handleBlur}
            value={formikLesson.values.name}
          />

          <input
            name="exercise"
            onChange={formikLesson.handleChange}
            onBlur={formikLesson.handleBlur}
            value={formikLesson.values.exercise}
          />

          <div className="wrapper-field-upload">
            <input
              type="file"
              id="video-input"
              accept="video/mp4,video/x-m4v,video/*"
              name="video"
              onChange={event => formikLesson.setFieldValue('video', event.target.files[0])}
              onBlur={formikLesson.handleBlur}
            />
          </div>

          <div className="wrapper-field-upload">
            <input
              type="text"
              id="question-name"
              value={formikLesson.values.question.name}
              onChange={e =>
                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="wrapper-field-upload">
            <input
              type="text"
              id="question-answer1"
              value={formikLesson.values.question.answer[0].content}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[0] = {
                  ...answerArray[0],
                  content: e.target.value,
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <input
              type="checkbox"
              value={formikLesson.values.question.answer[0].isTrue === 'true'}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[0] = {
                  ...answerArray[0],
                  isTrue: e.target.value === 'false' ? 'true' : 'false',
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>

          <div className="wrapper-field-upload">
            <input
              type="text"
              id="question-answer2"
              value={formikLesson.values.question.answer[1].content}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[1] = {
                  ...answerArray[1],
                  content: e.target.value,
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <input
              type="checkbox"
              value={formikLesson.values.question.answer[1].isTrue === 'true'}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[1] = {
                  ...answerArray[1],
                  isTrue: e.target.value === 'false' ? 'true' : 'false',
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>

          <div className="wrapper-field-upload">
            <input
              type="text"
              id="question-answer3"
              value={formikLesson.values.question.answer[2].content}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[2] = {
                  ...answerArray[2],
                  content: e.target.value,
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <input
              type="checkbox"
              value={formikLesson.values.question.answer[2].isTrue === 'true'}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[2] = {
                  ...answerArray[2],
                  isTrue: e.target.value === 'false' ? 'true' : 'false',
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>

          <div className="wrapper-field-upload">
            <input
              type="text"
              id="question-answer4"
              value={formikLesson.values.question.answer[3].content}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[3] = {
                  ...answerArray[3],
                  content: e.target.value,
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <input
              type="checkbox"
              value={formikLesson.values.question.answer[3].isTrue === 'true'}
              onChange={e => {
                const answerArray = cloneDeep(formikLesson.values.question.answer);

                answerArray[3] = {
                  ...answerArray[3],
                  isTrue: e.target.value === 'false' ? 'true' : 'false',
                };

                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>

          <div className="submit-comment">
            <button className="post" type="submit">
              Đăng Tải
            </button>
            <button className="cancel">Hủy Bỏ</button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    listCourses: state.listCourses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCourses: data => dispatch(getAllCourses(data)),
    createNewCourse: data => dispatch(createNewCourse(data)),
    createNewLesson: data => dispatch(createNewLesson(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
