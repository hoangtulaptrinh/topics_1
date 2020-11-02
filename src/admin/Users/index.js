import React, { Component } from "react";
import { Table, Space, Modal, Input, Button, Form, Popconfirm } from "antd";
import { FaPencilAlt, FaTrashAlt, FaBan } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { DollarOutlined } from "@ant-design/icons";

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
    };
  }

  columns = [
    {
      align: "center",
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      //   render: (text) => <a href="/">{text}</a>,
    },
    {
      align: "center",
      title: "Tên đăng nhập",
      dataIndex: "name",
      key: "name",
    },
    {
      align: "center",
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
    },
    {
      align: "center",
      title: "Gmail",
      dataIndex: "email",
      key: "email",
    },
    {
      align: "center",
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      align: "center",
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
    },
    {
      align: "center",
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Space size="middle">
          <DollarOutlined className="styled-icon" onClick={this.showModalAddMoney} />
          <FaPencilAlt className="styled-icon" onClick={this.showModalDetail} />
          <Popconfirm
            placement="leftTop"
            title="Bạn chắc chắn muốn cấm người dùng này ? ?"
            onConfirm={() => this.handleDelete()}
            onCancel={this.handleCancelModalDel}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn-delete" shape="circle" type="button">
              <FaBan />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  data = [
    {
      stt: "1",
      name: "Kim Anh",
      password: "Kim Anh",
      email: "123ntd@gmail.com",
      phone_number: "0353689521",
      money: "250.000",
      status: "Đang hoạt động",
    },
  ];

  showModalDetail = () => {
    this.setState({
      visible: true,
      isAddNew: false,
    });
  };

  showModalAdd = () => {
    this.setState({
      visible: true,
      isAddNew: true,
    });
  };

  showModalAddMoney = () => {
    this.setState({
      visibleModalAddMoney: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { isAddNew, visible, visibleModalAddMoney } = this.state;
    return (
      <div className="admin-management">
        <div className="feature-add">
          <h2> Danh sách người dùng </h2>
          <div style={{ display: 'flex', marginBottom: '16px', cursor: 'pointer' }} onClick={this.showModalAdd}>
            <MdAddCircle size="20" className="styled-icon" />
            <span style={{ marginLeft: '4' }}> Thêm người dùng </span>
          </div>
        </div>
        <Table dataSource={this.data} columns={this.columns} bordered />
        {/* Modal Add and Detail */}
        <Modal
          title={isAddNew ? 'Thêm người dùng' : 'Sửa thông tin người dùng'}
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Form {...layout} onFinish={this.onFinish} name="formUser">
            <Form.Item label="Tên người dùng" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên hiển thị" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Mật khẩu" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
              <Button type="primary" onClick={this.handleCancel} style={{ width: '64px' }}>
                Hủy
              </Button>
              <Button type="primary" style={{ marginLeft: 12, width: '64px' }} htmlType="submit">
                {isAddNew ? 'Thêm' : 'Lưu'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* Modal Ban */}
        <Modal
          title="Add Money"
          onOK={this.onOkModalAddMoney}
          onCancel={this.handleCanCelModalAddMoney}
          visible={visibleModalAddMoney}
        >
          <Form {...layout}>
            <Form.Item label="Số tiền">
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Users;
