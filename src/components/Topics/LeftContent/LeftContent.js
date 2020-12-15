import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { StarOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';

import { loadDetailTopics } from '../../../actions';
import Wrapper from './LeftContent.styled';

import CUTE from '../../../assets/img/CUTE.jpg';

const List = ({ listUsers, listTopics, loadDetailTopics }) => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const topTopics = useMemo(() => {
    if (!listTopics.listTopics.thread) return [];

    return listTopics.listTopics.thread.sort((a, b) => b.comment.length - a.comment.length).slice(0, 4); // sort big => small and
  }, [listTopics.listTopics.thread]);

  const imageUser = useCallback(
    id => {
      if (!listUsers || !listUsers.listUsers.length) return null;

      return listUsers.listUsers.find(user => user._id === id).image;
    },
    [listUsers],
  );

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
              <img src={imageUser(thread.author.id) || CUTE} alt="avatar" />
              <div className="info">
                <p className="left-info">
                  {thread.author.name}
                  <span className="role">{thread.author.role === 'admin' ? <StarOutlined /> : <UserOutlined />}</span>
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
            style={{ cursor: 'pointer', border: '1px solid #707070', marginTop: 10 }}
            onClick={() => {
              history.push(`/topics/detail?idThread=${thread.idThread}&id=${thread.id}`);
              loadDetailTopics();
            }}
            key={index}
          >
            <div className="header">
              <img src={imageUser(thread.author.id) || CUTE} alt="avatar" />
              <div className="info">
                <p className="left-info">
                  {thread.author.name}
                  <span className="role">{thread.author.role === 'admin' ? <StarOutlined /> : <UserOutlined />}</span>
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

const mapStateToProps = ({ listUsers, listTopics, reRender }) => ({ listUsers, listTopics, reRender });

export default connect(mapStateToProps, { loadDetailTopics })(List);
