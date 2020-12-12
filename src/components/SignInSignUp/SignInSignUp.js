import React, { useEffect } from 'react';
import Wrapper from './SignInSignUp.styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions';

const SignInSignUp = ({ signIn, signUp }) => {
  useEffect(() => localStorage.clear(), []);

  const formikSignIn = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().required('hãy điền tên đăng nhập của bạn'),
      password: Yup.string()
        .min(8)
        .max(15)
        .required('hãy nhập mật khẩu của bạn'),
    }),
    onSubmit: values => signIn(values),
  });

  const formikSignUp = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordRepeat: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required('Hãy điền email của bạn'),
      password: Yup.string()
        .min(8)
        .max(15)
        .required('Hãy điền mật khẩu của bạn'),
      passwordRepeat: Yup.string()
        .min(8)
        .max(15)
        .required('hãy nhập lại mật khẩu của bạn 1 lần nữa')
        .oneOf([Yup.ref('password'), null], 'mật khẩu không trùng với mật khẩu ở trên'),
      name: Yup.string().required('Hãy điền tên của bạn'),
    }),
    onSubmit: values => signUp(values),
  });

  return (
    <Wrapper>
      <div className="Login">
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in height" defaultChecked />
            <label htmlFor="tab-1" className="tab">
              Đăng Nhập
            </label>
            <input id="tab-2" type="radio" name="tab" className="sign-up height" />
            <label htmlFor="tab-2" className="tab">
              Đăng Ký
            </label>
            <div className="login-form">
              <form onSubmit={formikSignIn.handleSubmit}>
                <div className="sign-in-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      placeholder="Nhập email của bạn"
                      className="input height"
                      onChange={formikSignIn.handleChange}
                      onBlur={formikSignIn.handleBlur}
                      value={formikSignIn.values.username}
                    />
                    {formikSignIn.touched.email && formikSignIn.errors.email ? (
                      <div style={{ color: 'red', marginTop: 15 }}>{formikSignIn.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Mật Khẩu
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Nhập mật khẩu của bạn"
                      className="input height"
                      data-type="password"
                      onChange={formikSignIn.handleChange}
                      onBlur={formikSignIn.handleBlur}
                      value={formikSignIn.values.username}
                    />
                    {formikSignIn.touched.password && formikSignIn.errors.password ? (
                      <div style={{ color: 'red', marginTop: 15 }}>{formikSignIn.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="group">
                    <input type="submit" className="button height" value="ĐĂNG NHẬP" />
                  </div>
                  <div className="hr" />
                </div>
              </form>

              <form onSubmit={formikSignUp.handleSubmit}>
                <div className="sign-up-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Tên của bạn
                    </label>
                    <input
                      id="user"
                      type="text"
                      placeholder="Nhập tên của bạn"
                      className="input height"
                      name="name"
                      onChange={formikSignUp.handleChange}
                      onBlur={formikSignUp.handleBlur}
                      value={formikSignUp.values.name}
                    />
                    {formikSignUp.touched.name && formikSignUp.errors.name ? (
                      <div style={{ color: 'red', marginTop: 15 }}>{formikSignUp.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập email của bạn"
                      className="input height"
                      name="email"
                      onChange={formikSignUp.handleChange}
                      onBlur={formikSignUp.handleBlur}
                      value={formikSignUp.values.email}
                    />
                    {formikSignUp.touched.email && formikSignUp.errors.email ? (
                      <div style={{ color: 'red', marginTop: 15 }}>{formikSignUp.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      className="input height"
                      data-type="password"
                      name="password"
                      onChange={formikSignUp.handleChange}
                      onBlur={formikSignUp.handleBlur}
                      value={formikSignUp.values.password}
                    />
                    {formikSignUp.touched.password && formikSignUp.errors.password ? (
                      <div style={{ color: 'red', marginTop: 15 }}>{formikSignUp.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Nhập lại Password
                    </label>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu của bạn"
                      className="input height"
                      data-type="password"
                      name="passwordRepeat"
                      onChange={formikSignUp.handleChange}
                      onBlur={formikSignUp.handleBlur}
                      value={formikSignUp.values.passwordRepeat}
                    />
                    {formikSignUp.touched.passwordRepeat && formikSignUp.errors.passwordRepeat ? (
                      <div style={{ color: 'red', marginTop: 15 }}>{formikSignUp.errors.passwordRepeat}</div>
                    ) : null}
                  </div>
                  <div className="group">
                    <input type="submit" className="button height" value="ĐĂNG KÝ" />
                  </div>
                  <div className="hr" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStatetoProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(signIn(data)),
    signUp: data => dispatch(signUp(data)),
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(SignInSignUp);
