import React, { Component } from 'react';
import { Table, Space, Modal, Input, Button, Form, Popconfirm } from 'antd';
import { FaBan } from 'react-icons/fa';
import { DollarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/index';

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

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isAddNew: false,
      visibleModalAddMoney: false,
      coin: '',
    };
  }

  columns = [
    // {
    //   align: "center",
    //   title: "STT",
    //   dataIndex: "stt",
    //   key: "stt",
    // },
    {
      align: 'center',
      title: 'Tên đăng nhập',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: 'Gmail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      align: 'center',
      title: 'Số coin',
      dataIndex: 'money',
      key: 'money',
    },
    {
      align: 'center',
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DollarOutlined className="styled-icon" onClick={() => this.showModalAddMoney(record)} />
          <Popconfirm
            placement="leftTop"
            title="Bạn chắc chắn muốn cấm người dùng này ? ?"
            onConfirm={() => this.handleDelete()}
            onCancel={this.handleCancelModalDel}
            okText="Yes"
            cancelText="No"
          >
            {/* <FaBan className="btn-ban" /> */}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  data = [
    {
      stt: '1',
      name: 'Kim Anh',
      password: 'Kim Anh',
      email: '123ntd@gmail.com',
      phone_number: '0353689521',
      money: '250.000',
      status: 'Đang hoạt động',
    },
  ];

  showModalDetail = () => {
    this.setState({
      visible: true,
      isAddNew: false,
    });
  };

  showModalAddMoney = record => {
    this.setState({
      visibleModalAddMoney: true,
      coin: record.money,
    });
    console.log('da', this.state.coin);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleCanCelModalAddMoney = () => {
    this.setState({
      visibleModalAddMoney: false,
    });
  };

  render() {
    const { visibleModalAddMoney, coin } = this.state;
    return (
      <div className="admin-management">
        <div className="feature-add">
          <h2> Danh sách người dùng </h2>
        </div>
        <Table dataSource={this.props.listUser.listUsers} columns={this.columns} bordered />
        <Modal
          title="Add Money"
          onOK={this.onOkModalAddMoney}
          onCancel={this.handleCanCelModalAddMoney}
          visible={visibleModalAddMoney}
          footer={null}
        >
          <Form {...layout} name="form-add-money" onFinish={this.onFinish}>
            <Form.Item label="Số coin">
              <Input value={coin} type="number" disabled />
            </Form.Item>
            <Form.Item label="Số coin vừa nạp">
              <Input type="number" />
            </Form.Item>
            <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
              <Button type="primary" onClick={this.handleCanCelModalAddMoney} style={{ width: '64px' }}>
                Hủy
              </Button>
              <Button type="primary" style={{ marginLeft: 12, width: '64px' }} htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    listUser: state.listUsers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUser: data => dispatch(getAllUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
