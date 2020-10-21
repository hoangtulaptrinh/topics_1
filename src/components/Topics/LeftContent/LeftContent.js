import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { StarOutlined, UserOutlined } from '@ant-design/icons';

import Wrapper from './LeftContent.styled';

const List = ({ listTopics }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const topTopics = useMemo(() => {
    if (!listTopics.listTopics.thread) return [];
    return listTopics.listTopics.thread.sort((a, b) => b.comment.length - a.comment.length).slice(0, 4); // sort big => small and
  }, [listTopics.listTopics.thread]);

  return (
    <Wrapper>
      <div className="progress-course">
        <p className="title">Những Chủ Đề Được Bàn Luận Sôi Nổi Nhất</p>

        {topTopics.map((thread, index) => (
          <div key={index}>
            <div className="header">
              <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
              <div className="info">
                <p className="left-info">
                  {thread.author.name}
                  <span className="role">
                    {thread.author.role === 'admin' ? (
                      <span>
                        Quản trị viên
                        <StarOutlined />
                      </span>
                    ) : (
                      <span>
                        Học Viên
                        <UserOutlined />
                      </span>
                    )}
                  </span>
                </p>
                <div className="right-info">{thread.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="user-buy-course">
        <p className="title">Những Chủ Đề Mà Bạn Quan Tâm</p>

        {currentUser.care.map((thread, index) => (
          <div key={index}>
            <div className="header">
              <img src="https://scr.vn/wp-content/uploads/2020/07/h%C3%ACnh-n%E1%BB%81n-cute-6.jpg" alt="avatar" />
              <div className="info">
                <p className="left-info">
                  {thread.author.name}
                  <span className="role">
                    {thread.author.role === 'admin' ? (
                      <span>
                        Quản trị viên
                        <StarOutlined />
                      </span>
                    ) : (
                      <span>
                        Học Viên
                        <UserOutlined />
                      </span>
                    )}
                  </span>
                </p>
                <div className="right-info">{thread.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ listTopics, reRender }) => ({ listTopics, reRender });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
