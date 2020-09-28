import React, { useEffect } from "react";
import { connect } from "react-redux";

import { loadTopics } from "../../../actions";
import Item from "../Item";
import Wrapper from "./List.styled";

const List = ({ listTopics, fetchTopics }) => {
  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const { loading, listTopics: data, err } = listTopics;

  return (
    <Wrapper>
      {loading && <h1>Đang Tải Dữ Liệu</h1>}
      {!loading &&
        data &&
        data.thread &&
        data.thread.map((topic, index) => <Item topic={topic} key={index} />)}
      {!loading && err && <h1>{err}</h1>}
    </Wrapper>
  );
};

const mapStateToProps = ({ listTopics }) => ({
  listTopics
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopics: () => dispatch(loadTopics())
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
