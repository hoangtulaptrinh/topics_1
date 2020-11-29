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
  state = {
    collapsed: false,
    test: 'courses',
    currentUser: '5f7849e4fee9ad29f4f70709',
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { test } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={test}>
            <Menu.Item key="courses" icon={<PieChartOutlined />} onClick={() => this.setState({ test: 'courses' })}>
              Course
            </Menu.Item>

            <Menu.Item key="users" icon={<UserOutlined />} onClick={() => this.setState({ test: 'users' })}>
              User
            </Menu.Item>

            <Menu.Item key="category" icon={<PieChartOutlined />} onClick={() => this.setState({ test: 'category' })}>
              Category
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
          <Content style={{ margin: '0 16px' }}>
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
