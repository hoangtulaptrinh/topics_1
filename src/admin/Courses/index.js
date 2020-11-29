import React, { Fragment, useEffect, useState } from 'react';
import { Table, Modal, Button, Checkbox, Space, Input } from 'antd';
import { createNewCourse, createNewLesson, getAllCourses, updateCourse, updateLesson } from '../../actions';
import { connect } from 'react-redux';
import { Player } from 'video-react';
import { FileImageOutlined, FileTextOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cloneDeep from 'lodash/cloneDeep';
import { BsPencil } from 'react-icons/bs';
import TextArea from 'antd/lib/input/TextArea';

// import Wrapper from './Course.styled';

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 16,
//     span: 8,
//   },
// };

const Courses = ({ listCourses, getAllCourses, createNewCourse, createNewLesson, updateCourses, updateLesson }) => {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalAddLesson, setVisibleModalAddLesson] = useState(false);
  const [visibleModalEditCourse, setVisibleModalEditCourse] = useState(false);
  const [visibleModalEditLesson, setVisibleModalEditLesson] = useState(false);

  const columns = [
    {
      align: 'center',
      title: 'Name',
      width: '200px',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: 'Introduction',
      dataIndex: 'intro',
      width: '200px',
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
      render: outline => <a href={outline}> Document </a>,
    },
    {
      align: 'center',
      title: 'References',
      dataIndex: 'references',
      key: 'references',
      render: references =>
        references.map((item, index) => (
          <div key={index}>
            <a href={item} target="_blank" rel="noopener noreferrer">
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
                <Button
                  type="primary"
                  onClick={() => {
                    formikEditLesson.setFieldValue('id', item.id);
                    formikEditLesson.setFieldValue('name', item.name);
                    formikEditLesson.setFieldValue('exercise', item.exercise);
                    formikEditLesson.setFieldValue('question', item.question);

                    setVisibleModalEditLesson(true);
                    setCurrentLesson(item);
                  }}
                >
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
      render: (_, record) => (
        <Space size="middle">
          <BsPencil className="styled-icon" onClick={() => showModalEditCourse(record)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  const showModalAdd = () => setVisibleModalAdd(true);
  const showModalEditCourse = record => {
    console.log('record course', record);
    formikEditCourse.setFieldValue('id', record._id);
    formikEditCourse.setFieldValue('name', record.name);
    formikEditCourse.setFieldValue('intro', record.intro);
    formikEditCourse.setFieldValue('cost', record.cost);
    formikEditCourse.setFieldValue('references', record.references.join(' '));

    setVisibleModalEditCourse(true);
  };
  // Formik add new course

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

  // Formik edit course
  const formikEditCourse = useFormik({
    initialValues: { id: null, name: '', intro: '', cost: '', image: null, outline: null, references: '' },
    onSubmit: values => {
      const { id, name, intro, cost, image, outline, references } = values;

      const formData = new FormData();

      !!name && formData.append('name', name);
      !!intro && formData.append('intro', intro);
      !!cost && formData.append('cost', cost);
      !!image && formData.append('image', image);
      !!outline && formData.append('outline', outline);

      const arrayReferences = references.split(' ');

      !!references.length &&
        arrayReferences.forEach((item, index) => {
          formData.append(`references[]`, arrayReferences[index]);
        });

      updateCourses({
        id,
        data: formData,
      });

      setVisibleModalEditCourse(false);
      formikEditCourse.setFieldValue('image', null);
      formikEditCourse.setFieldValue('outline', null);
    },
  });

  // Formik add new lesson

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

  // formik edit lesson

  const formikEditLesson = useFormik({
    initialValues: {
      id: null,
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
    onSubmit: values => {
      const { id, name, exercise, video, question } = values;

      const formData = new FormData();

      formData.append('id', id);

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

      updateLesson({
        id: currentCourse,
        data: formData,
      });
      setVisibleModalEditLesson(false);
    },
  });

  console.log(currentLesson, 'test adadada');
  return (
    <Fragment>
      <Button type="primary" onClick={showModalAdd} style={{ margin: '10px 0px' }}>
        Add New Course
      </Button>
      <Table key={listCourses._id} dataSource={listCourses} columns={columns} bordered />
      {/* Modal Edit Lesson */}
      <Modal
        title="Edit lesson"
        onCancel={() => setVisibleModalEditLesson(false)}
        visible={visibleModalEditLesson}
        footer={null}
      >
        <form onSubmit={formikEditLesson.handleSubmit}>
          <div>
            <label for="name"> Lesson Name: </label>
            <Input
              name="name"
              onChange={formikEditLesson.handleChange}
              onBlur={formikEditLesson.handleBlur}
              value={formikEditLesson.values.name}
            />
          </div>
          <br />
          <div>
            <label for="exercise"> Excersise Name: </label>
            <Input
              name="exercise"
              onChange={formikEditLesson.handleChange}
              onBlur={formikEditLesson.handleBlur}
              value={formikEditLesson.values.exercise}
            />
          </div>
          <br />

          <div className="wrapper-field-upload">
            <label for="video-1"> Video Name: </label>

            <input
              type="file"
              id="video-input-1"
              accept="video/mp4,video/x-m4v,video/*"
              name="video"
              onChange={event => formikEditLesson.setFieldValue('video', event.target.files[0])}
              onBlur={formikEditLesson.handleBlur}
            />
            {!!currentLesson && !!currentLesson.video && (
              <video src={currentLesson.video} width="100%" height="200px" style={{ marginTop: 10 }} controls />
            )}
          </div>
          <br />

          <div className="wrapper-field-upload">
            <label for="question-name-1"> Question Name: </label>

            <Input
              type="text"
              id="question-name-1"
              name="question-name"
              value={formikEditLesson.values.question.name}
              onChange={e =>
                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  name: e.target.value,
                })
              }
            />
          </div>
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer1-1"> Answer 1: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer1-1"
              name="question-answer1"
              value={formikEditLesson.values.question.answer[0].content}
              onChange={e => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[0] = {
                  ...answerArray[0],
                  content: e.target.value,
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <Checkbox
              checked={formikEditLesson.values.question.answer[0].isTrue === 'true'}
              onChange={() => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[0] = {
                  ...answerArray[0],
                  isTrue: answerArray[0].isTrue === 'false' ? 'true' : 'false',
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer2-1"> Answer 2: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer2-1"
              name="question-answer2"
              value={formikEditLesson.values.question.answer[1].content}
              onChange={e => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[1] = {
                  ...answerArray[1],
                  content: e.target.value,
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <Checkbox
              checked={formikEditLesson.values.question.answer[1].isTrue === 'true'}
              onChange={() => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[1] = {
                  ...answerArray[1],
                  isTrue: answerArray[1].isTrue === 'false' ? 'true' : 'false',
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer3-1"> Answer 3: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer3-1"
              name="question-answer3"
              value={formikEditLesson.values.question.answer[2].content}
              onChange={e => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[2] = {
                  ...answerArray[2],
                  content: e.target.value,
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <Checkbox
              checked={formikEditLesson.values.question.answer[2].isTrue === 'true'}
              onChange={() => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[2] = {
                  ...answerArray[2],
                  isTrue: answerArray[2].isTrue === 'false' ? 'true' : 'false',
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer4-1"> Answer 4: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer4-1"
              name="question-answer4"
              value={formikEditLesson.values.question.answer[3].content}
              onChange={e => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[3] = {
                  ...answerArray[3],
                  content: e.target.value,
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
            <Checkbox
              checked={formikEditLesson.values.question.answer[3].isTrue === 'true'}
              onChange={() => {
                const answerArray = cloneDeep(formikEditLesson.values.question.answer);

                answerArray[3] = {
                  ...answerArray[3],
                  isTrue: answerArray[3].isTrue === 'false' ? 'true' : 'false',
                };

                formikEditLesson.setFieldValue('question', {
                  ...formikEditLesson.values.question,
                  answer: [...answerArray],
                });
              }}
            />
          </div>
          <br />
          <div className="submit-comment">
            <Button className="post" type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              Đăng Tải
            </Button>
            <Button className="cancel" onClick={() => setVisibleModalEditLesson(false)}>
              Hủy Bỏ
            </Button>
          </div>
        </form>
      </Modal>
      {/* Modal Add New Course */}
      <Modal title="Add new course" onCancel={() => setVisibleModalAdd(false)} visible={visibleModalAdd} footer={null}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label for="name">Course Name:</label>
            <Input name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          </div>
          <br />
          <div>
            <label for="intro">Introduction:</label>
            <Input name="intro" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.intro} />
          </div>
          <br />
          <div>
            <label for="cost">Cost:</label>
            <Input name="cost" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cost} />
          </div>
          <br />
          <div>
            <label for="references">References:</label>
            <TextArea
              name="references"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.references}
            />
          </div>
          <br />
          <div className="wrapper-field-upload">
            <label htmlFor="image-input" style={{ marginRight: 10 }}>
              Image:
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
          <br />
          <div className="wrapper-field-upload">
            <label htmlFor="outline-input" style={{ marginRight: 10 }}>
              Outline:
            </label>
            <input
              type="file"
              id="outline-input"
              name="outline"
              onChange={event => formik.setFieldValue('outline', event.target.files[0])}
              onBlur={formik.handleBlur}
            />
          </div>
          <br />
          <div className="submit-comment">
            <Button className="post" type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              Đăng Tải
            </Button>
            <Button className="cancel" onClick={() => setVisibleModalAdd(false)}>
              Hủy Bỏ
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit  Course */}
      <Modal
        title="Edit course"
        onCancel={() => setVisibleModalEditCourse(false)}
        visible={visibleModalEditCourse}
        footer={null}
      >
        <form onSubmit={formikEditCourse.handleSubmit}>
          <div>
            <label for="name">Course Name:</label>
            <Input
              name="name"
              onChange={formikEditCourse.handleChange}
              onBlur={formikEditCourse.handleBlur}
              value={formikEditCourse.values.name}
            />
          </div>
          <br />
          <div>
            <label for="intro">Introduction:</label>
            <Input
              name="intro"
              onChange={formikEditCourse.handleChange}
              onBlur={formikEditCourse.handleBlur}
              value={formikEditCourse.values.intro}
            />
          </div>
          <br />
          <div>
            <label for="cost">Cost:</label>
            <Input
              name="cost"
              onChange={formikEditCourse.handleChange}
              onBlur={formikEditCourse.handleBlur}
              value={formikEditCourse.values.cost}
            />
          </div>
          <br />
          <div>
            <label for="references">References:</label>
            <TextArea
              name="references"
              onChange={formikEditCourse.handleChange}
              onBlur={formikEditCourse.handleBlur}
              value={formikEditCourse.values.references}
            />
          </div>
          <br />
          <div className="wrapper-field-upload">
            <label htmlFor="image-input-1" style={{ marginRight: 10 }}>
              Image:
            </label>
            <input
              type="file"
              id="image-input-1"
              accept="image/*"
              name="image"
              onChange={event => formikEditCourse.setFieldValue('image', event.target.files[0])}
              onBlur={formikEditCourse.handleBlur}
            />
          </div>
          <br />
          <div className="wrapper-field-upload">
            <label htmlFor="outline-input-1" style={{ marginRight: 10 }}>
              Outline:
            </label>
            <input
              type="file"
              id="outline-input-1"
              name="outline"
              onChange={event => formikEditCourse.setFieldValue('outline', event.target.files[0])}
              onBlur={formikEditCourse.handleBlur}
            />
          </div>
          <br />
          <div className="submit-comment">
            <Button className="post" type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              Lưu
            </Button>
            <Button className="cancel" onClick={() => setVisibleModalEditCourse(false)}>
              Hủy Bỏ
            </Button>
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
          <div>
            <label for="name"> Lesson Name: </label>
            <Input
              name="name"
              onChange={formikLesson.handleChange}
              onBlur={formikLesson.handleBlur}
              value={formikLesson.values.name}
            />
          </div>
          <br />
          <div>
            <label for="exercise"> Excersise Name: </label>
            <Input
              name="exercise"
              onChange={formikLesson.handleChange}
              onBlur={formikLesson.handleBlur}
              value={formikLesson.values.exercise}
            />
          </div>
          <br />

          <div className="wrapper-field-upload">
            <label for="video"> Video Name: </label>

            <input
              type="file"
              id="video-input"
              accept="video/mp4,video/x-m4v,video/*"
              name="video"
              onChange={event => formikLesson.setFieldValue('video', event.target.files[0])}
              onBlur={formikLesson.handleBlur}
            />
          </div>
          <br />

          <div className="wrapper-field-upload">
            <label for="question-name"> Question Name: </label>

            <Input
              type="text"
              id="question-name"
              name="question-name"
              value={formikLesson.values.question.name}
              onChange={e =>
                formikLesson.setFieldValue('question', {
                  ...formikLesson.values.question,
                  name: e.target.value,
                })
              }
            />
          </div>
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer1"> Answer 1: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer1"
              name="question-answer1"
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
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer2"> Answer 2: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer2"
              name="question-answer2"
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
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer3"> Answer 3: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer3"
              name="question-answer3"
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
          <br />

          <div
            className="wrapper-field-upload"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <label for="question-answer4"> Answer 4: </label>

            <Input
              style={{ width: '70%' }}
              type="text"
              id="question-answer4"
              name="question-answer4"
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
          <br />
          <div className="submit-comment">
            <Button className="post" type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              Đăng Tải
            </Button>
            <Button className="cancel" onClick={() => setVisibleModalAddLesson(false)}>
              Hủy Bỏ
            </Button>
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
    updateCourses: data => dispatch(updateCourse(data)),
    updateLesson: data => dispatch(updateLesson(data)),
    createNewLesson: data => dispatch(createNewLesson(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
