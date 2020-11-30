import React, { Component, useState } from 'react';
import { Table, Space, Modal, Input, Button, Form } from 'antd';
// import { FaBan } from 'react-icons/fa';
import { DollarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllUsers, updateUser } from '../../actions/index';
import { useForm } from 'antd/lib/form/Form';

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

function Users({ fetchAllUser, updateUser, listUser }) {

  const [visible, setVisible] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [visibleModalAddMoney, setVisibleModalAddMoney] = useState(false);
  const [coin, setCoin] = useState('');
  const [coinAdd, setCoinAdd] = useState(0);
  const [userId, setUserId] = useState('');

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     visible: false,
  //     isAddNew: false,
  //     visibleModalAddMoney: false,
  //     coin: '',
  //     coinAdd: 0,
  //     userId: '',
  //   };
  // }

  const [form] = Form.useForm();
  const columns = [
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
          <DollarOutlined className="styled-icon" onClick={() => showModalAddMoney(record)} />
        </Space>
      ),
    },
  ];

  const onFinish = () => handleAddCoin();

  // const showModalDetail = () => {
  //   this.setState({
  //     visible: true,
  //     isAddNew: false,
  //   });
  // };

  const showModalAddMoney = record => {
    setVisibleModalAddMoney(true);
    setCoin(record.money);
    setUserId(record._id);
  };

  const handleCanCelModalAddMoney = () => {
    setVisibleModalAddMoney(false);
  };

  const handleAddCoin = () => {
    const fieldValue = form.getFieldsValue();
    setCoin(Number(fieldValue.current_coin) + Number(fieldValue.coin_add));
    console.log("coin sau khi add", coin);
    setVisibleModalAddMoney(false);
    updateUser({
      id: userId,
      money: coin,
    });
  };

  const showModalAddUser = () => {};
  return (
    <div className="admin-management">
      <div className="feature-add">
        <Button type="primary" onClick={showModalAddUser} style={{ margin: '10px 0px', height: '5%' }}>
          Thêm mới người dùng
        </Button>
      </div>
      <Table dataSource={listUser.listUsers} columns={columns} bordered />
      <Modal
        title="Thêm coin"
        // onOK={onOkModalAddMoney}
        onCancel={handleCanCelModalAddMoney}
        visible={visibleModalAddMoney}
        footer={null}
      >
        <Form form={form} {...layout} name="form-add-money" onFinish={onFinish}>
          <Form.Item label="Số coin" name="current_coin" initialValue={coin}>
            <Input type="number" disabled />
          </Form.Item>
          <Form.Item label="Số coin vừa nạp" name="coin_add" initialValue={coinAdd}>
            <Input type="number" />
          </Form.Item>
          <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
            <Button type="primary" style={{ marginRight: 12, width: '64px' }} htmlType="submit">
              Thêm
            </Button>
            <Button type="primary" onClick={handleCanCelModalAddMoney} style={{ width: '64px' }} danger>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
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
