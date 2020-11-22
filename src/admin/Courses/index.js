import React, { Fragment, Component, useEffect, useState } from 'react';
import { Table, Modal, Input, Button, Checkbox } from 'antd';
import { createNewCourse, getAllCourses } from '../../actions';
import { connect } from 'react-redux';
import { Player } from 'video-react';
import { FileImageOutlined, FileTextOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const Courses = ({ listCourses, getAllCourses, createNewCourse }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalAddLesson, setVisibleModalAddLesson] = useState(true);

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
      render: lesson => (
        <div>
          {lesson.map((item, index) => (
            <div key={index} style={{ marginTop: 5 }}>
              <Button type="primary" onClick={() => setCurrentLesson(item)}>
                {`Lesson ${index + 1}`}
              </Button>
            </div>
          ))}
          <PlusCircleOutlined />
        </div>
      ),
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
