import React, { useMemo, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { DatePicker } from 'antd';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../Header';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { updateCurrentUser } from '../../../actions';
import infoUserImage from '../../../assets/img/INFO.png';
import Wrapper from './Info.style';

const formatDate = 'DD/MM/YYYY';

const HomePage = ({ updateCurrentUser }) => {
  const currentUser = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  const [page, setPage] = useState('all');

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

  const formikInfo = useFormik({
    initialValues: {
      name: currentUser.name,
      date_of_birth: currentUser.date_of_birth,
      phone_number: currentUser.phone_number,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Hãy nhập Họ Tên của bạn'),
      date_of_birth: Yup.string(),
      phone_number: Yup.string().required('Hãy nhập số điện thoại của bạn'),
    }),
    onSubmit: values => updateCurrentUser(values),
  });

  const isDisabledBtnSubmitPasswordForm = useMemo(() => !formikPassword.dirty || !isEmpty(formikPassword.errors), [
    formikPassword.dirty,
    formikPassword.errors,
  ]);

  const isDisabledBtnSubmitInfoForm = useMemo(() => !formikInfo.dirty || !isEmpty(formikInfo.errors), [
    formikInfo.dirty,
    formikInfo.errors,
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

                <div className="item" onClick={() => setPage('info')}>
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

          {page === 'info' && (
            <div className="right">
              <div className="header">
                <img src={infoUserImage} alt="info" />
                <div className="info">
                  <p className="title">Thông tin cá nhân</p>
                  <p className="content">
                    Thông tin cá nhân của bạn là cơ sở để chúng tôi giúp bạn tạo hồ sơ xin việc trong tương lai
                  </p>
                </div>
              </div>

              <div className="back-btn" onClick={() => setPage('all')}>
                <AiOutlineLeft /> <span>Tài Khoản</span>
              </div>

              <form onSubmit={formikInfo.handleSubmit}>
                <div className="field">
                  <span className="title">Họ và tên</span>
                  <input
                    name="name"
                    className={`${formikInfo.touched.name && formikInfo.errors.name ? 'has-error' : ''} input`}
                    placeholder="Nhập Họ Tên Của Bạn"
                    value={formikInfo.values.name}
                    onChange={formikInfo.handleChange}
                    onBlur={formikInfo.handleBlur}
                  />
                  {formikInfo.touched.name && formikInfo.errors.name ? (
                    <div style={{ color: 'red' }}>{formikInfo.errors.name}</div>
                  ) : null}
                </div>

                <div className="field">
                  <span className="title">Ngày sinh</span>
                  <DatePicker
                    defaultValue={moment(formikInfo.values.date_of_birth, formatDate)}
                    format={formatDate}
                    onChange={value => formikInfo.setFieldValue('date_of_birth', moment(value).format(formatDate))}
                  />
                  {formikInfo.touched.date_of_birth && formikInfo.errors.date_of_birth ? (
                    <div style={{ color: 'red' }}>{formikInfo.errors.date_of_birth}</div>
                  ) : null}
                </div>

                <div className="field">
                  <span className="title">Số Điện Thoại</span>
                  <input
                    name="phone_number"
                    className={`${
                      formikInfo.touched.phone_number && formikInfo.errors.phone_number ? 'has-error' : ''
                    } input`}
                    placeholder="Nhập Số Điện Thoại Của Bạn"
                    value={formikInfo.values.phone_number}
                    onChange={formikInfo.handleChange}
                    onBlur={formikInfo.handleBlur}
                  />
                  {formikInfo.touched.phone_number && formikInfo.errors.phone_number ? (
                    <div style={{ color: 'red' }}>{formikInfo.errors.phone_number}</div>
                  ) : null}
                </div>

                <button
                  disabled={isDisabledBtnSubmitInfoForm}
                  className={`${isDisabledBtnSubmitInfoForm ? 'disabled-btn' : ''} submit-btn`}
                  type="submit"
                >
                  Cập nhật
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
