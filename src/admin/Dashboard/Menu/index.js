import React, { useCallback } from 'react';
import {
    Menu
} from 'antd';
import {
    InboxOutlined,
    SettingOutlined,
    TagOutlined,
    WalletOutlined,
    ShopOutlined
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router';
import {LogoWrapper} from '../Dasboard.styles';

const MenuList = () => {
    const history = useHistory();
    const location = useLocation();

    const onGoPage = useCallback(
        pathName => {
          history.push(pathName);
        },
        [location.pathname],
      );

    return (
        <LogoWrapper>
            <Menu mode="inline"                
            >
                <div
                    className="logo"
                    // onClick={() => {
                    //     onGoPage('/homepage');
                    // }}
                />
                <Menu.SubMenu
                    key="sub1"
                    icon={<InboxOutlined style={{ position: 'relative', top: -3 }} />}
                    title="Quản lý đơn hàng"
                >
                    <Menu.Item
                        key="/orders?type=all"
                        // onClick={() => onGoPage('/orders?type=all')}
                    >
                        Tất cả
                    </Menu.Item>
                    <Menu.Item key="/orders?type=toship"
                        // onClick={() => onGoPage('/orders?type=toship')}
                    >
                        Chờ lấy hàng
                    </Menu.Item>
                    <Menu.Item key="/orders?type=shipping"
                        // onClick={() => onGoPage('/orders?type=shipping')}
                    >
                        Đang giao
                    </Menu.Item>
                    <Menu.Item key="/orders?type=cancelled"
                        // onClick={() => onGoPage('/orders?type=cancelled')}
                    >
                        Đã huỷ
                    </Menu.Item>
                    <Menu.Item key="/orders?type=completed"
                        // onClick={() => onGoPage('/orders?type=completed')}
                    >
                        Hoàn thành
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub2"
                    icon={<InboxOutlined style={{ position: 'relative', top: -3 }} />}
                    title="Quản lý sản phẩm"
                >
                    <Menu.Item
                        key="/products?type=all"
                        // onClick={() => onGoPage('/products?type=all')}
                    >
                        Tất cả
                    </Menu.Item>
                    <Menu.Item
                        key="/products?type=new"
                        // onClick={() => onGoPage('/products?type=new')}
                    >
                        Đang bán
                    </Menu.Item>
                    <Menu.Item
                        key="/products?type=sold_out"
                        // onClick={() => onGoPage('/products?type=sold_out')}
                    >
                        Hết hàng
                    </Menu.Item>
                    <Menu.Item
                        key="/products?type=locked"
                        // onClick={() => onGoPage('/products?type=locked')}
                    >
                        Tạm khoá
                    </Menu.Item>
                </Menu.SubMenu>                
                <Menu.SubMenu
                    key="sub4"
                    icon={<WalletOutlined style={{ position: 'relative', top: -3 }} />}
                    title="Tài chính"
                >
                    <Menu.Item 
                        key="/finance" 
                        // onClick={() => onGoPage('/finance')}
                    >
                        Doanh thu
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub5"
                    icon={<ShopOutlined style={{ position: 'relative', top: -3 }} />}
                    title="Quản lý shop"
                >
                    <Menu.Item
                        key="/manager/shop/profile"
                        // onClick={() => onGoPage('/manager/shop/profile')}
                    >
                        Hồ sơ shop
                    </Menu.Item>
                    <Menu.Item key="/manager/shop/ratting"
                        // onClick={() => onGoPage('/manager/shop/ratting')}
                    >
                        Đánh giá shop
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub6"
                    icon={<SettingOutlined style={{ position: 'relative', top: -3 }} />}
                    title="Thiết lập shop"
                >
                    <Menu.Item key="/setting/shop/account"
                        // onClick={() => onGoPage('/setting/shop/account')}
                    >
                        Tài khoản
                    </Menu.Item>
                    <Menu.Item key="19"
                        // onClick={() => onGoPage('/setting/shop/address')}
                    >
                        Thiết lập cơ bản
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </LogoWrapper>
    )
};

export default MenuList;