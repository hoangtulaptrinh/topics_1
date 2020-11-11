import React, { Fragment, Component } from 'react';
import { Table, Space, Modal, Input, Button, Form, Popconfirm } from 'antd';
import { getAllCourses } from '../../actions';
import { connect } from 'react-redux';

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
      indexLesson: null,
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
        lesson.map((_, index) => (
          <div key={index} style={{ marginTop: 5 }}>
            <Button type="primary" onClick={() => this.setState({ indexLesson: index })}>
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

  render() {
    const { indexLesson } = this.state;
    const { listCourses } = this.props;
    console.log('listCousre', listCourses);

    return (
      <Fragment>
        <Table key={listCourses._id} dataSource={listCourses} columns={this.columns} bordered />
        <Modal
          title="Lesson"
          onCancel={() => this.setState({ indexLesson: null })}
          visible={indexLesson !== null}
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
