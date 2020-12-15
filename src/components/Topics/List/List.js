import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FileImageOutlined, VideoCameraOutlined, FileTextOutlined, CheckOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { loadTopics, addThread } from '../../../actions';
import Icon from '../Item/Icon';
import Item from '../Item';
import LeftContent from '../LeftContent/LeftContent';
import RightContent from '../RightContent';
import Wrapper from './List.styled';
import Header from '../../User/Header';

import CUTE from '../../../assets/img/CUTE.jpg';

const List = ({ listTopics, fetchTopics, addThread }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const formik = useFormik({
    initialValues: { content: '', image: null, video: null, outline: null },
    validationSchema: Yup.object({
      content: Yup.string().required('hãy nhập nội dung bài viết'),
    }),
    onSubmit: values => {
      addThread({ ...values, id_author: currentUser._id });

      formik.resetForm();
    },
  });

  const query = new URLSearchParams(window.location.search);

  const idTopic = query.get('idThread');

  // const idTopic = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics, idTopic]);

  const { loading, listTopics: data, err } = listTopics;

  return (
    <Wrapper>
      <Header />
      <div className="total">
        <LeftContent />
        <div className="list-topics">
          <form onSubmit={formik.handleSubmit}>
            <div className="new-thread">
              <span className="title">Tạo chủ đề thảo luận</span>

              <div className="header">
                <img src={currentUser && currentUser.image ? currentUser.image : CUTE} alt="avatar" />
                <div className="info">
                  <div className="right-info">
                    <textarea
                      name="content"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.content}
                    />

                    {formik.touched.content && formik.errors.content ? (
                      <div style={{ color: 'red' }}>{formik.errors.content}</div>
                    ) : null}

                    <div className="upload">
                      <div className="wrapper-field-upload">
                        <label htmlFor="image-input">
                          {formik.values.image ? <CheckOutlined className="check-icon" /> : <FileImageOutlined />}
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
                        <label htmlFor="video-input">
                          {formik.values.video ? <CheckOutlined className="check-icon" /> : <VideoCameraOutlined />}
                        </label>
                        <input
                          type="file"
                          id="video-input"
                          accept="video/mp4,video/x-m4v,video/*"
                          name="video"
                          onChange={event => formik.setFieldValue('video', event.target.files[0])}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className="wrapper-field-upload">
                        <label htmlFor="outline-input">
                          {formik.values.outline ? <CheckOutlined className="check-icon" /> : <FileTextOutlined />}
                        </label>
                        <input
                          type="file"
                          id="outline-input"
                          name="outline"
                          onChange={event => formik.setFieldValue('outline', event.target.files[0])}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <Icon
                        addEmoji={item => formik.setFieldValue('content', `${formik.values.content}${item}`)}
                        idPopoverLegacy="list"
                      />
                    </div>

                    <div className="submit-comment">
                      <button className="post" type="submit">
                        Đăng Tải
                      </button>
                      <button className="cancel">Hủy Bỏ</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {loading && <h1>Đang Tải Dữ Liệu</h1>}
          {!loading &&
            data &&
            data.thread &&
            data.thread.map((topic, index) => <Item topic={topic} key={index} indexTopic={index} />)}
          {!loading && err && <h1>{err}</h1>}
        </div>
        <RightContent />
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ reRender, listTopics }) => ({
  reRender,
  listTopics,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: () => dispatch(loadTopics()),
  addThread: data => dispatch(addThread(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
