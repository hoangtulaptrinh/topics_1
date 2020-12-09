import React from 'react';

import './AuthorDeveloper.scss';

import DUONG from '../../assets/img/DUONG.jpg';
import DAT from '../../assets/img/DAT.jpg';

const AuthorDeveloper = () => {
  return (
    <div id="item-card">
      <div className="item-border" style={{ marginRight: 10 }}>
        <div className="img-container">
          <img src={DUONG} alt="" />
        </div>
        <div className="text-container">
          <div className="content" style={{ marginTop: 30 }}>
            <h3 style={{ color: 'white' }}>ADMIN</h3>
            <h3 style={{ color: 'white' }}>Đỗ Tùng Dương</h3>
            <h4 style={{ color: 'white' }}>Fullstack JavaScript</h4>
            <h4 style={{ color: 'white' }}>FPT Software</h4>
          </div>
        </div>
      </div>
      <div className="item-border">
        <div className="img-container">
          <img src={DAT} alt="author_dat" />
        </div>
        <div className="text-container">
          <div className="content" style={{ marginTop: 30 }}>
            <h3 style={{ color: 'white' }}>SUB ADMIN</h3>
            <h3 style={{ color: 'white' }}>Nguyễn Tiến Đạt</h3>
            <h4 style={{ color: 'white' }}>ReactJS Developer </h4>
            <h4 style={{ color: 'white' }}>Fabbi JSC</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDeveloper;
