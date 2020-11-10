import styled from 'styled-components';

import backGroundImage from '../../assets/img/NARUTOXHINATA.png';

export default styled.div`
  input {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }

  .Login {
    margin: 0;
    color: #646674c5;
    background: #c8c8c8d2;
    font: 600 16px/18px 'Open Sans', sans-serif;
    height: 100vh;
    background: url(${backGroundImage}) no-repeat center;
    background-size: cover;
  }
  png *,
  :after,
  :before {
    box-sizing: border-box;
  }
  .clearfix:after,
  .clearfix:before {
    content: '';
    display: table;
  }
  .clearfix:after {
    clear: both;
    display: block;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  .login-wrap {
    width: 100%;
    margin: auto;
    max-width: 525px;
    height: 100%;
    position: relative;
    /* box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19); */
  }
  .login-html {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 90px 70px 50px 70px;
    background: rgba(40, 57, 101, 0.3);
  }
  .login-html .sign-in-htm,
  .login-html .sign-up-htm {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    transition: all 0.4s linear;
  }
  .login-html .sign-in,
  .login-html .sign-up,
  .login-form .group .check {
    display: none;
  }
  .login-html .tab,
  .login-form .group .label,
  .login-form .group .button {
    text-transform: uppercase;
  }
  .login-html .tab {
    font-size: 22px;
    margin-right: 15px;
    padding-bottom: 5px;
    margin: 0 15px 10px 0;
    display: inline-block;
    border-bottom: 2px solid transparent;
  }
  .login-html .sign-in:checked + .tab,
  .login-html .sign-up:checked + .tab {
    color: rgba(255, 255, 255, 0.787);
    border-color: #215ec7;
  }
  .login-form {
    min-height: 345px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .login-form .group {
    margin-bottom: 15px;
  }
  .login-form .group .label,
  .login-form .group .input,
  .login-form .group .button {
    width: 100%;
    color: rgb(255, 255, 255);
    display: block;
  }
  .login-form .group .input,
  .login-form .group .button {
    border: none;
    padding: 25px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.2);
  }
  .login-form .group input[data-type='password'] {
    -webkit-text-security: circle;
  }
  .login-form .group .label {
    color: rgb(241, 233, 233);
    font-size: 12px;
  }
  .login-form .group .button {
    background: #025fff32;
  }
  .button:hover {
    background: #2600ffad !important;
  }
  .login-form .group label .icon {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
  }
  .login-form .group label .icon:before,
  .login-form .group label .icon:after {
    content: '';
    width: 10px;
    height: 2px;
    background: #fff;
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
  }
  .login-form .group label .icon:before {
    left: 3px;
    width: 5px;
    bottom: 6px;
    transform: scale(0) rotate(0);
  }
  .login-form .group label .icon:after {
    top: 6px;
    right: 0;
    transform: scale(0) rotate(0);
  }
  .login-form .group .check:checked + label {
    color: rgb(223, 215, 215);
  }
  .login-form .group .check:checked + label .icon {
    background: #1161ee;
  }
  .login-form .group .check:checked + label .icon:before {
    transform: scale(1) rotate(45deg);
  }
  .login-form .group .check:checked + label .icon:after {
    transform: scale(1) rotate(-45deg);
  }
  .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm {
    transform: rotate(0);
  }
  .login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
    transform: rotate(0);
  }

  .hr {
    height: 2px;
    margin: 60px 0 50px 0;
    background: rgba(255, 255, 255, 0.2);
  }
  .foot-lnk {
    text-align: center;
    color: rgb(205, 209, 202);
  }
  .foot-lnk > label,
  a {
    cursor: pointer;
    color: rgb(255, 255, 255);
  }
  .foot-lnk > label,
  a:hover {
    text-decoration: none;
  }
  .foot-lnk > label:hover {
    cursor: pointer;
    color: #0056b3;
  }
  .height {
    height: auto;
  }
  .login-html > label {
    cursor: pointer;
  }
  .button.height {
    cursor: pointer;
    outline: none;
  }
`;
