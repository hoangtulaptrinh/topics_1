import React, { Fragment, Component } from 'react';
import { Table, Space, Modal, Input, Button, Form, Popconfirm, Checkbox } from 'antd';
import { getAllCourses } from '../../actions';
import { connect } from 'react-redux';
import { Player } from 'video-react';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 8,
  },
};

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLesson: null,
      visibleModalAdd: false,
    };
  }

  columns = [
    {
      align: 'center',
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: 'Introduction',
      dataIndex: 'intro',
      key: 'intro',
    },
    {
      align: 'center',
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      align: 'center',
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img width={50} height={50} src={image} alt="test" />,
    },
    {
      align: 'center',
      title: 'Outline',
      dataIndex: 'outline',
      key: 'outline',
      render: outline => <a href={outline}> tai </a>,
    },
    {
      align: 'center',
      title: 'References',
      dataIndex: 'references',
      key: 'references',
      render: references =>
        references.map(item => (
          <div>
            <a href={item} target="_blank" rel="noreferrer">
              DOwnload
            </a>
          </div>
        )),
    },
    {
      align: 'center',
      title: 'Lessons',
      dataIndex: 'lesson',
      key: 'lesson',
      render: lesson =>
        lesson.map((item, index) => (
          <div key={index} style={{ marginTop: 5 }}>
            <Button type="primary" onClick={() => this.setState({ currentLesson: item })}>
              {`Bai hoc so ${index + 1}`}
            </Button>
          </div>
        )),
    },
    {
      align: 'center',
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  componentDidMount() {
    this.props.getAllCourses();
  }

  showModalAdd = () => this.setState({ visibleModalAdd: true });

  render() {
    const { currentLesson, visibleModalAdd } = this.state;
    const { listCourses } = this.props;
    console.log('listCousre', listCourses);

    return (
      <Fragment>
        <Button type="primary" onClick={this.showModalAdd} style={{ margin: '10px 0px' }}>
          {' '}
          Add New Course{' '}
        </Button>
        <Table key={listCourses._id} dataSource={listCourses} columns={this.columns} bordered />
        {/* Modal Lesson */}
        <Modal
          title="Lesson"
          onCancel={() => this.setState({ currentLesson: null })}
          visible={currentLesson !== null}
          footer={null}
        >
          {currentLesson && (
            <Fragment>
              <div>{currentLesson.name}</div>
              <a href={currentLesson.exercise} target="_blank" rel="noreferrer">
                exercise
              </a>
              <div>{currentLesson.question.name}</div>
              <div>
                {currentLesson.question.answer.map((item, index) => (
                  <Fragment key={index}>
                    <div> {item.content} </div>
                    <Checkbox checked={item.isTrue === 'true'} />
                  </Fragment>
                ))}
              </div>
              {currentLesson.video ? <Player src={currentLesson.video} /> : <h1>Bài Học Đang Được Chuẩn Bị</h1>}
            </Fragment>
          )}
        </Modal>
        {/* Modal Add New Course */}
        <Modal
          title="Add new course"
          onCancel={() => this.setState({ visibleModalAdd: false })}
          visible={visibleModalAdd}
          footer={null}
        >
          Test
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCourses: state.listCourses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCourses: data => dispatch(getAllCourses(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
