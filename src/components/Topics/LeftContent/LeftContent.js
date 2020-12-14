import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { StarOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';

import { loadDetailTopics } from '../../../actions';
import Wrapper from './LeftContent.styled';

import CUTE from '../../../assets/img/CUTE.jpg';

const List = ({ listTopics, loadDetailTopics }) => {
  const history = useHistory();
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
          <div
            className="topic"
            onClick={() => {
              history.push(`/topics/detail?idThread=${thread.idThread}&id=${thread.id}`);
              loadDetailTopics();
            }}
            key={index}
          >
            <div className="header">
              <img src={currentUser.image ? currentUser.image : CUTE} alt="avatar" />
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
                <div className="right-info">
                  <Tooltip title={thread.content}>
                    <span>{thread.content}</span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="user-buy-course">
        <p className="title">Những Chủ Đề Mà Bạn Quan Tâm</p>

        {currentUser.care.map((thread, index) => (
          <div
            style={{ cursor: 'pointer', border: '1px solid #707070' }}
            onClick={() => {
              history.push(`/topics/detail?idThread=${thread.idThread}&id=${thread.id}`);
              loadDetailTopics();
            }}
            key={index}
          >
            <div className="header">
              <img src={currentUser.image ? currentUser.image : CUTE} alt="avatar" />
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
                <div className="right-info">
                  <Tooltip title={thread.content}>
                    <span>{thread.content}</span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ listTopics, reRender }) => ({ listTopics, reRender });

export default connect(mapStateToProps, { loadDetailTopics })(List);
