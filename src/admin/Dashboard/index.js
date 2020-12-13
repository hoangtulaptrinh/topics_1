import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  StarOutlined,
  LineChartOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Users from '../Users/index';
import Courses from '../Courses/index';
import Category from '../Category/index';
import { withRouter } from 'react-router-dom';
import Statistical from '../Statistical';
const { Header, Content, Sider } = Layout;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      test: 'users',
      currentUser: '5f7849e4fee9ad29f4f70709',
      admin: 'ADMIN',
      titleHeader: 'Danh sách người dùng',
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

  logOut = () => {
    const { history } = this.props;
    history.push('/login');
    localStorage.clear();
    window.location.reload();
  };
  render() {
    const currentUserDetail = JSON.parse(localStorage.getItem('currentUser'));

    const { test, admin, titleHeader } = this.state;
    const { history } = this.props;

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
              key="users"
              icon={<UserOutlined />}
              onClick={() => this.setState({ test: 'users', titleHeader: 'Danh sách người dùng' })}
            >
              Quản lý người dùng
            </Menu.Item>

            <Menu.Item
              className="menu-left"
              key="courses"
              icon={<HeartOutlined />}
              onClick={() => this.setState({ test: 'courses', titleHeader: 'Danh sách khóa học' })}
            >
              Quản lý khóa học
            </Menu.Item>

            <Menu.Item
              className="menu-left"
              key="category"
              icon={<StarOutlined />}
              onClick={() => this.setState({ test: 'category', titleHeader: 'Danh sách danh mục' })}
            >
              Quản lý danh mục
            </Menu.Item>
            <Menu.Item
              className="menu-left"
              key="statistical"
              icon={<LineChartOutlined />}
              onClick={() => this.setState({ test: 'statistical', titleHeader: 'Thống kê' })}
            >
              Thống kê
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <div className="content-header-admin">
              <h1>{titleHeader.toUpperCase()}</h1>
              <div>
                <span className="name-admin"> Hi, {currentUserDetail.name}</span>
                <img src={currentUserDetail.image} alt="avatar-admin" className="avt-admin" />
                <HomeOutlined
                  style={{ margin: '0 5px 0 10px', fontSize: '30px', cursor: 'pointer' }}
                  onClick={() => history.push('/')}
                />
                <LogoutOutlined
                  style={{ margin: '0 5px 0 10px', fontSize: '30px', cursor: 'pointer' }}
                  onClick={this.logOut}
                />
              </div>
            </div>
          </Header>
          <Content className="content-layout">
            {test === 'category' && <Category moveToCourse={() => this.setState({ test: 'courses' })} />}
            {test === 'users' && <Users />}
            {test === 'courses' && <Courses />}
            {test === 'statistical' && <Statistical />}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Dashboard);
