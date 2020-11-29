import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadDetailTopics } from '../../../actions';
import Item from '../Item';
import LeftContent from '../LeftContent/LeftContent';
import RightContent from '../RightContent';
import Wrapper from './Detail.styled';
import Header from '../../User/Header';

const List = ({ detailTopic, loadDetailTopics }) => {
  useEffect(() => {
    loadDetailTopics();
  }, [loadDetailTopics]);

  const { loading, topic: data, err } = detailTopic;

  const scrollToBottom = useCallback(
    () =>
      window.scrollTo({
        top: 0,
      }),
    [],
  );

  return (
    <Wrapper>
      <Header />
      <div className="total">
        <LeftContent />
        {loading && <h1>Đang Tải Dữ Liệu</h1>}
        {!loading && data && data.id && <Item topic={data} isDetail scrollToBottom={scrollToBottom} />}
        {!loading && err && <h1>{err}</h1>}
        <RightContent />
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ reRender, detailTopic }) => ({
  reRender,
  detailTopic,
});

const mapDispatchToProps = dispatch => ({
  loadDetailTopics: () => dispatch(loadDetailTopics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
