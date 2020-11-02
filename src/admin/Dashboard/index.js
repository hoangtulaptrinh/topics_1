import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

import Users from '../Users/index';
import Courses from '../Courses/index';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
    test: 'courses',
    currentUser: '5f7849e4fee9ad29f4f70709',
  };

  onCollapse = collapsed => {
    console.log(collapsed);
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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => this.setState({ test: 'courses' })} >
              Coures
            </Menu.Item>

            <Menu.Item key="2" icon={<PieChartOutlined />} onClick={() => this.setState({ test: 'users' })}>
              Users
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
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
