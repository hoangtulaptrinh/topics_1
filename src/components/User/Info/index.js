import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Collapse, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { ImFire } from 'react-icons/im';
import * as Yup from 'yup';
import Chart from 'react-apexcharts';
import Header from '../Header';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { updateCurrentUser, refreshCurrentUser } from '../../../actions';
import infoUserImage from '../../../assets/img/INFO.png';
import Wrapper from './Info.style';

import DUONG from '../../../assets/img/DUONG.png';
import DAT from '../../../assets/img/DAT.png';
import CUTE from '../../../assets/img/CUTE.jpg';

const { Panel } = Collapse;

const formatDate = 'DD/MM/YYYY';

const HomePage = ({ reRender, listCourses, updateCurrentUser, refreshCurrentUser }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [priview, setPriview] = useState(currentUser.image);
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
      image: null,
      name: currentUser.name,
      date_of_birth: currentUser.date_of_birth,
      phone_number: currentUser.phone_number,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Hãy nhập Họ Tên của bạn'),
      date_of_birth: Yup.string(),
      phone_number: Yup.string().required('Hãy nhập số điện thoại của bạn'),
    }),
    onSubmit: values => {
      const { image, name, date_of_birth, phone_number } = values;

      const formData = new FormData();

      !!image && formData.append('image', image);
      !!name && formData.append('name', name);
      !!date_of_birth && formData.append('date_of_birth', date_of_birth);
      !!phone_number && formData.append('phone_number', phone_number);

      updateCurrentUser(formData);
    },
  });

  const isDisabledBtnSubmitPasswordForm = useMemo(() => !formikPassword.dirty || !isEmpty(formikPassword.errors), [
    formikPassword.dirty,
    formikPassword.errors,
  ]);

  // const isDisabledBtnSubmitInfoForm = useMemo(() => !formikInfo.dirty || !isEmpty(formikInfo.errors), [
  //   formikInfo.dirty,
  //   formikInfo.errors,
  // ]);

  useEffect(() => {
    setPage('all');
  }, [reRender, refreshCurrentUser]);

  const listCoursesCurrentUser = useMemo(() => {
    const currentUserCourse = currentUser.course;
    if (!currentUserCourse || (!!currentUserCourse && !currentUserCourse.length)) return [];

    const currentUserCourseMapToId = currentUserCourse.map(item => item.id);

    return listCourses.filter(item => currentUserCourseMapToId.includes(item._id));
  }, [currentUser.course, listCourses]);

  useEffect(() => {
    setPage('all');
  }, [reRender, refreshCurrentUser]);

  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="total">
          <div className="left">
            <div className="header">
              <img src={currentUser.image ? currentUser.image : CUTE} alt="avatar" />
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
              <div className="login-info">
                <div className="user-info">
                  <h4>Thông tin cá nhân</h4>

                  <div className="item" onClick={() => setPage('info')}>
                    <div className="left">
                      <span className="top">Học Viên</span>
                      <span className="down">{currentUser.name}</span>
                    </div>
                    <AiOutlineRight />
                  </div>

                  <div className="item" style={{ borderTop: 'none' }} onClick={() => setPage('statistical')}>
                    <div className="left">
                      <span className="top">Thống Kê</span>
                      <span className="down">Chi Tiết</span>
                    </div>
                    <AiOutlineRight />
                  </div>

                  <div className="item" style={{ borderTop: 'none' }} onClick={() => setPage('certifies')}>
                    <div className="left">
                      <span className="top">Chứng chỉ</span>
                      <span className="down">
                        {listCoursesCurrentUser.length &&
                        !!listCoursesCurrentUser.filter(
                          item =>
                            Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                            Number(currentUser.course.find(course => course.id === item._id).progress) ===
                              item.lesson.length,
                        ).length
                          ? `Đã Sở Hữu
                        ${
                          listCoursesCurrentUser.filter(
                            item =>
                              Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                              Number(currentUser.course.find(course => course.id === item._id).progress) ===
                                item.lesson.length,
                          ).length
                        }
                        chứng chỉ`
                          : 'Chưa Sở Hữu Chứng Chỉ Nào'}
                      </span>
                    </div>
                    <AiOutlineRight />
                  </div>
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
                  <span className="title">Ảnh Đại Diện</span>
                  <input
                    style={{ marginBottom: 10 }}
                    type="file"
                    name="image"
                    onChange={event => {
                      formikInfo.setFieldValue('image', event.target.files[0]);
                      setPriview(URL.createObjectURL(event.target.files[0]));
                    }}
                    onBlur={formikInfo.handleBlur}
                  />
                </div>
                {!!priview && <img src={priview} alt="img" height={150} />}

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
                  // disabled={isDisabledBtnSubmitInfoForm}
                  // className={`${isDisabledBtnSubmitInfoForm ? 'disabled-btn' : ''} submit-btn`}
                  className="submit-btn"
                  type="submit"
                >
                  Cập nhật
                </button>
              </form>
            </div>
          )}

          {page === 'statistical' && (
            <div className="right">
              <div className="header">
                <img src={infoUserImage} alt="info" />
                <div className="info">
                  <p className="title">Thống kê cá nhân</p>
                  <p className="content">Thống kê các chỉ số của bạn</p>
                </div>
              </div>

              <div className="back-btn" onClick={() => setPage('all')}>
                <AiOutlineLeft /> <span>Tài Khoản</span>
              </div>

              <div style={{ fontWeight: 'bold' }}>Quản Lý Coin</div>
              {listCoursesCurrentUser.length ? (
                <Chart
                  options={{
                    chart: {
                      id: 'basic-bar',
                    },
                    xaxis: {
                      categories: ['tổng số coin đã nạp', 'tổng số coin đã tiêu', 'số coin còn lại'],
                    },
                  }}
                  series={[
                    {
                      name: 'số coin',
                      data: [
                        listCoursesCurrentUser.map(item => Number(item.cost)).reduce((a, b) => a + b) +
                          Number(currentUser.money),
                        listCoursesCurrentUser.map(item => Number(item.cost)).reduce((a, b) => a + b),
                        Number(currentUser.money),
                      ],
                    },
                  ]}
                  type="bar"
                  width="500"
                />
              ) : (
                'Bạn chưa phát sinh giao dịch nào nên chưa có thông tin thống kê'
              )}

              <div style={{ fontWeight: 'bold' }}>Quản Lý Khóa Học</div>
              {listCoursesCurrentUser.length ? (
                <Chart
                  options={{
                    chart: {
                      width: 500,
                      type: 'pie',
                    },
                    labels: ['Tổng Số Khóa Học Đã Mua', 'Tổng Số Khóa Học Chưa Mua'],
                    responsive: [
                      {
                        breakpoint: 480,
                        options: {
                          chart: {
                            width: 200,
                          },
                          legend: {
                            position: 'bottom',
                          },
                        },
                      },
                    ],
                  }}
                  series={[listCoursesCurrentUser.length, listCourses.length - listCoursesCurrentUser.length]}
                  type="pie"
                  width={500}
                />
              ) : (
                'Bạn Chưa Sở Hữu Khóa Học Nào nên chưa có thông tin thống kê'
              )}

              <div style={{ fontWeight: 'bold' }}>Quản Lý Khóa Học Đã Mua</div>
              {listCoursesCurrentUser.length ? (
                <Chart
                  options={{
                    chart: {
                      width: 500,
                      type: 'pie',
                    },
                    labels: [
                      'Tổng Số Khóa Học Đã Hoàn Thành',
                      'Tổng Số Khóa Học Đang Trong Quá Trình Hoàn Thành',
                      'Tổng Số Khóa Học Chưa Bắt Đầu',
                    ],
                    responsive: [
                      {
                        breakpoint: 480,
                        options: {
                          chart: {
                            width: 200,
                          },
                          legend: {
                            position: 'bottom',
                          },
                        },
                      },
                    ],
                  }}
                  series={[
                    listCoursesCurrentUser.length
                      ? listCoursesCurrentUser.filter(
                          item =>
                            Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                            Number(currentUser.course.find(course => course.id === item._id).progress) ===
                              item.lesson.length,
                        ).length
                      : 0,
                    listCoursesCurrentUser.length
                      ? listCoursesCurrentUser.filter(
                          item =>
                            Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                            Number(currentUser.course.find(course => course.id === item._id).progress) <
                              item.lesson.length,
                        ).length
                      : 0,
                    listCoursesCurrentUser.length
                      ? listCoursesCurrentUser.filter(
                          item => Number(currentUser.course.find(course => course.id === item._id).progress) === 0,
                        ).length
                      : 0,
                  ]}
                  type="pie"
                  width={500}
                />
              ) : (
                'Bạn Chưa Sở Hữu Khóa Học Nào nên chưa có thông tin thống kê'
              )}
            </div>
          )}

          {page === 'certifies' && (
            <div className="right" style={{ paddingBottom: 10 }}>
              <div className="header">
                <img src={infoUserImage} alt="info" />
                <div className="info">
                  <p className="title">Chứng Chỉ Đạt Được</p>
                  <p className="content">Chứng Nhận Đã Hoàn Thành Chương Trình Đào Tạo Của Tổ chức</p>
                </div>
              </div>

              <div className="back-btn" onClick={() => setPage('all')}>
                <AiOutlineLeft /> <span>Tài Khoản</span>
              </div>

              <p style={{ fontSize: 18, fontWeight: 500 }}>
                {listCoursesCurrentUser.length &&
                !!listCoursesCurrentUser.filter(
                  item =>
                    Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                    Number(currentUser.course.find(course => course.id === item._id).progress) === item.lesson.length,
                ).length
                  ? `Bạn Đã Sở Hữu
                        ${
                          listCoursesCurrentUser.filter(
                            item =>
                              Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                              Number(currentUser.course.find(course => course.id === item._id).progress) ===
                                item.lesson.length,
                          ).length
                        }
                        chứng chỉ`
                  : 'Bạn Chưa Sở Hữu Chứng Chỉ Nào'}
              </p>

              <Collapse accordion>
                {listCoursesCurrentUser.length &&
                  !!listCoursesCurrentUser.filter(
                    item =>
                      Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                      Number(currentUser.course.find(course => course.id === item._id).progress) === item.lesson.length,
                  ).length &&
                  listCoursesCurrentUser
                    .filter(
                      item =>
                        Number(currentUser.course.find(course => course.id === item._id).progress) !== 0 &&
                        Number(currentUser.course.find(course => course.id === item._id).progress) ===
                          item.lesson.length,
                    )
                    .map((course, index) => (
                      <Panel
                        header={
                          <span style={{ fontSize: 14, fontWeight: 500 }}>
                            Chứng Chỉ Đã Hoàn Thành Khóa Học <span style={{ fontWeight: 'bold' }}>{course.name}</span>
                          </span>
                        }
                        key={index}
                      >
                        <div className="certificate">
                          <div className="certification-header">
                            <div className="left">
                              BeyondTheLimits <ImFire style={{ marginLeft: 7 }} />
                            </div>
                            <div className="right">
                              Cấp Ngày
                              <span style={{ margin: '0 5px' }}>
                                {moment(currentUser.course.find(x => x.id === course._id).date_finish).format('D')}
                              </span>
                              Tháng
                              <span style={{ margin: '0 5px' }}>
                                {moment(currentUser.course[0].date_finish).format('M')}
                              </span>
                              Năm
                              <span style={{ margin: '0 5px' }}>
                                {moment(currentUser.course[0].date_finish).format('YYYY')}
                              </span>
                            </div>
                          </div>

                          <div className="certification-information">
                            <h3>Chứng Chỉ Này Được Cấp Cho</h3>
                            <h1>{currentUser.name}</h1>
                            <h3>Đã Hoàn Thành Khóa Học Dưới Đây Ở BeyondTheLimits</h3>
                            <h1>{course.name}</h1>
                            <h4>Chứng Chỉ Lập Trình Viên ,Đại Diện Cho Khoảng 50 Giờ Học Tập</h4>
                          </div>

                          <div className="certification-signature">
                            <div>
                              <img src={DUONG} width={200} height={120} alt="signature-duong" />

                              <p>Đỗ Tùng Dương</p>
                              <p>Giám Đốc Điều Hành</p>
                            </div>
                            <div>
                              <img src={DAT} width={200} height={120} alt="signature-duong" />

                              <p>Nguyễn Tiến Đạt</p>
                              <p>Giám Đốc Vận Hành</p>
                            </div>
                          </div>
                        </div>
                      </Panel>
                    ))}
              </Collapse>
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

export default connect(mapStatetoProps, { updateCurrentUser, refreshCurrentUser })(HomePage);
