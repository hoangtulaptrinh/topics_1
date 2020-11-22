import React, { useState } from 'react';
import {
    Layout,
    Affix
} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import DasboardWrapper from './Dasboard.styles';
import MenuList from './Menu/index';


const Dasboard = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <DasboardWrapper>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="site-layout-background"
                    style={{ background: '#fff', boxShadow: '0 1px 4px 0 rgba(74,74,78,.12)' }}
                >
                    <MenuList />
                </Layout.Sider>
                <Layout className="site-layout">
                    <Affix>
                        <Layout.Header
                            className="site-layout-background"
                            style={{ padding: 0, boxShadow: '0 1px 4px 0 rgba(74,74,78,.12)' }}
                        >
                            {React.createElement(
                                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: 'trigger',
                                    onClick: toggle,
                                },
                            )}
                        </Layout.Header>
                    </Affix>
                    <Layout.Content
                        style={{
                            padding: '24px 24px 24px 24px',
                            background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        </DasboardWrapper>
    )
}

export default Dasboard;