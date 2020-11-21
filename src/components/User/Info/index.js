import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Header from '../Header';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { toastWarning } from '../../../helper/toastHelper';
import { updateCurrentUser } from '../../../actions';
import infoUserImage from '../../../assets/img/INFO.png';
import Wrapper from './Info.style';

const { Panel } = Collapse;

const HomePage = ({ listCourses, updateCurrentUser }) => {
  const history = useHistory();

  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const [page, setPage] = useState('password');

  const formikPassword = useFormik({
    initialValues: { oldPassword: '', newPassword: '', newPasswordRepeat: '' },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, 'Mật Khẩu Tối Thiếu Là 8 Ký Tự')
        .max(15, 'Mật Khẩu Tối Đa Là 15 Ký Tự')
        .required('Hãy nhập mật khẩu cũ của bạn')
        .oneOf([currentUser.password, null], 'Mật Khẩu Hiện Tại Không Đúng'),
      newPassword: Yup.string()
        .min(8, 'Mật Khẩu Tối Thiếu Là 8 Ký Tự')
        .max(15, 'Mật Khẩu Tối Đa Là 15 Ký Tự')
        .required('Hãy nhập mật khẩu mới của bạn')
        .notOneOf([Yup.ref('oldPassword')], 'Mật Khẩu Mới Không Được Trùng Khớp Với Mật Khẩu Cũ'),
      newPasswordRepeat: Yup.string()
        .min(8, 'Mật Khẩu Tối Thiếu Là 8 Ký Tự')
        .max(15, 'Mật Khẩu Tối Đa Là 15 Ký Tự')
        .required('Hãy nhập lại mật khẩu mới của bạn')
        .oneOf([Yup.ref('newPassword'), null], 'Không Trùng Khớp Với Mật Khẩu Mới'),
    }),
    onSubmit: values => updateCurrentUser({ password: values.newPassword }),
  });

  const isDisabledBtnSubmitPasswordForm = useMemo(() => !formikPassword.dirty || !isEmpty(formikPassword.errors), [
    formikPassword.dirty,
    formikPassword.errors,
  ]);

  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="total">
          <div className="left">
            <div className="header">
              <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
              <div className="info">
                <p className="info__name">{currentUser.name}</p>
                <p className="info__coin">{`${currentUser.money} Coin`}</p>
              </div>
            </div>
          </div>

          {page === 'all' && (
            <div className="right">
              <div className="header">
                <img src={infoUserImage} alt="info" />
                <div className="info">
                  <p className="title">Tài khoản</p>
                  <p className="content">
                    Quản lý thông tin đăng nhập và thông tin cá nhân của bạn tại đây điều đó sẽ giúp chúng tôi tạo hồ sơ
                    giới thiệu việc làm cho các bạn
                  </p>
                </div>
              </div>
              <div className="login-info">
                <h4>Thông tin đăng nhập</h4>

                <div className="item">
                  <div className="left">
                    <span className="top">Email</span>
                    <span className="down">{currentUser.email}</span>
                  </div>
                  <AiOutlineRight />
                </div>

                <div className="item" style={{ borderTop: 'none' }} onClick={() => setPage('password')}>
                  <div className="left">
                    <span className="top">Mật khẩu</span>
                    <span className="down">********</span>
                  </div>
                  <AiOutlineRight />
                </div>
              </div>

              <div className="user-info">
                <h4>Thông tin cá nhân</h4>

                <div className="item">
                  <div className="left">
                    <span className="top">Học Viên</span>
                    <span className="down">{currentUser.name}</span>
                  </div>
                  <AiOutlineRight />
                </div>

                <div className="item" style={{ borderTop: 'none' }}>
                  <div className="left">
                    <span className="top">Thống Kê</span>
                    <span className="down">Chi Tiết</span>
                  </div>
                  <AiOutlineRight />
                </div>
              </div>
            </div>
          )}

          {page === 'password' && (
            <div className="right">
              <div className="header">
                <img src={infoUserImage} alt="info" />
                <div className="info">
                  <p className="title">Đổi mật khẩu</p>
                  <p className="content">
                    Đây là mật khẩu sử dụng để đăng nhập. Hãy đặt mật khẩu an toàn bằng cách sử dụng ít nhất 8 ký tự,
                    bao gồm cả chữ thường và chữ in hoa, chữ số và ký tự đặc biệt.
                  </p>
                </div>
              </div>

              <div className="back-btn" onClick={() => setPage('all')}>
                <AiOutlineLeft /> <span>Tài Khoản</span>
              </div>

              <form onSubmit={formikPassword.handleSubmit}>
                <div className="field">
                  <span className="title">Mật khẩu Cũ</span>
                  <input
                    name="oldPassword"
                    className={`${
                      formikPassword.touched.oldPassword && formikPassword.errors.oldPassword ? 'has-error' : ''
                    } input`}
                    type="password"
                    placeholder="Nhập Mật Khẩu Cũ"
                    value={formikPassword.values.oldPassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                  />
                  {formikPassword.touched.oldPassword && formikPassword.errors.oldPassword ? (
                    <div style={{ color: 'red' }}>{formikPassword.errors.oldPassword}</div>
                  ) : null}
                </div>

                <div className="field">
                  <span className="title">Mật khẩu mới</span>
                  <input
                    name="newPassword"
                    className={`${
                      formikPassword.touched.newPassword && formikPassword.errors.newPassword ? 'has-error' : ''
                    } input`}
                    type="password"
                    placeholder="Nhập Mật Khẩu Mới"
                    value={formikPassword.values.newPassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                  />
                  {formikPassword.touched.newPassword && formikPassword.errors.newPassword ? (
                    <div style={{ color: 'red' }}>{formikPassword.errors.newPassword}</div>
                  ) : null}
                </div>

                <div className="field">
                  <span className="title">Nhập lại mật khẩu mới</span>
                  <input
                    name="newPasswordRepeat"
                    className={`${
                      formikPassword.touched.newPasswordRepeat && formikPassword.errors.newPasswordRepeat
                        ? 'has-error'
                        : ''
                    } input`}
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    value={formikPassword.values.newPasswordRepeat}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                  />
                  {formikPassword.touched.newPasswordRepeat && formikPassword.errors.newPasswordRepeat ? (
                    <div style={{ color: 'red' }}>{formikPassword.errors.newPasswordRepeat}</div>
                  ) : null}
                </div>

                <button
                  disabled={isDisabledBtnSubmitPasswordForm}
                  className={`${isDisabledBtnSubmitPasswordForm ? 'disabled-btn' : ''} submit-btn`}
                  type="submit"
                >
                  Đổi Mật Khẩu
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const mapStatetoProps = ({ reRender, listCourses }) => {
  return { reRender, listCourses };
};

export default connect(mapStatetoProps, { updateCurrentUser })(HomePage);
