import React, { Component } from 'react';
import { Table, Space, Modal, Input, Button, Form } from 'antd';
// import { FaBan } from 'react-icons/fa';
import { DollarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllUsers, updateUser } from '../../actions/index';

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
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isAddNew: false,
      visibleModalAddMoney: false,
      coin: '',
      coinAdd: 0,
      userId: '',
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

  onFinish = () => this.handleAddCoin();

  showModalDetail = () => {
    this.setState({
      visible: true,
      isAddNew: false,
    });
  };

  showModalAddMoney = record => {
    console.log('record', record);
    this.setState({
      visibleModalAddMoney: true,
      coin: record.money,
      userId: record._id,
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

  handleAddCoin = () => {
    const fieldValue = this.formRef.current.getFieldsValue();
    this.setState({
      coin: Number(fieldValue.current_coin) + Number(fieldValue.coin_add),
      visibleModalAddMoney: false,
    });
    console.log('coin sau khi add', this.state.coin);
    this.props.updateUser({
      id: this.state.userId,
      money: this.state.coin,
    });
  };

  render() {
    const { visibleModalAddMoney, coin, coinAdd } = this.state;

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
          <Form ref={this.formRef} {...layout} name="form-add-money" onFinish={this.onFinish}>
            <Form.Item label="Số coin" name="current_coin" initialValue={coin}>
              <Input type="number" disabled />
            </Form.Item>
            <Form.Item label="Số coin vừa nạp" name="coin_add" initialValue={coinAdd}>
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
    updateUser: data => dispatch(updateUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
