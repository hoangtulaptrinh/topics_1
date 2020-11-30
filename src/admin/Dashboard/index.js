import React from 'react';
import { Layout, Menu } from 'antd';
import { PieChartOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';

import Users from '../Users/index';
import Courses from '../Courses/index';
import Category from '../Category/index';

const { Header, Content, Sider } = Layout;
// const { SubMenu } = Menu;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      test: 'courses',
      currentUser: '5f7849e4fee9ad29f4f70709',
      admin: 'ADMIN',
    };
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
      admin: collapsed === false ? '' : 'ADMIN',
    });
  };

  render() {
    const { test, admin } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={`/React-logo.png`} alt="logo" className="logo-image" />
            <h1 className="logo-title-admin"> {admin} </h1>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={test}>
            <Menu.Item
              className="menu-left"
              key="category"
              icon={<PieChartOutlined />}
              onClick={() => this.setState({ test: 'category' })}
            >
              Quản lý danh mục
            </Menu.Item>
            <Menu.Item
              className="menu-left"
              key="courses"
              icon={<PieChartOutlined />}
              onClick={() => this.setState({ test: 'courses' })}
            >
              Quản lý khóa học
            </Menu.Item>

            <Menu.Item
              className="menu-left"
              key="users"
              icon={<UserOutlined />}
              onClick={() => this.setState({ test: 'users' })}
            >
              Quản lý người dùng
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content className="content-layout">
            {test === 'users' && <Users />}
            {test === 'courses' && <Courses />}
            {test === 'category' && <Category moveToCourse={() => this.setState({ test: 'courses' })} />}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
