import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { FileImageOutlined, VideoCameraOutlined, FileTextOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { loadDetailTopics } from '../../../actions';
import Icon from '../Item/Icon';
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

  console.log(data);
  return (
    <Wrapper>
      <Header />
      <div className="total">
        <LeftContent />
        {loading && <h1>Đang Tải Dữ Liệu</h1>}
        {!loading && data && data.id && <Item topic={data} />}
        {!loading && err && <h1>{err}</h1>}
        <RightContent />
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ detailTopic }) => ({
  detailTopic,
});

const mapDispatchToProps = dispatch => ({
  loadDetailTopics: () => dispatch(loadDetailTopics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
