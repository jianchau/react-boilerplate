/** @format */

import React from 'react';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { menus } from '@/router';
import styles from './layout1.module.less';
const Layout1 = () => {
    const navigate = useNavigate();
    function genMenu(menuConfig) {
        return menuConfig.map((menuItem) => {
            if (menuItem.children) {
                return {
                    key: menuItem.id,
                    label: menuItem.name,
                    path: menuItem.path,
                    children: genMenu(menuItem.children),
                };
            } else {
                return {
                    key: menuItem.id,
                    label: menuItem.name,
                    path: menuItem.path,
                };
            }
        });
    }
    const items = genMenu(menus);
    const handleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        let { path } = item.props;
        navigate(path);
    };
    return (
        <Layout style={{ height: '100%', width: '100%' }}>
            <Header className="header">
                <div className={styles['logo']} />
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items}
                        onSelect={handleSelect}
                    />
                </Sider>
                <Layout>
                    <Breadcrumb className={styles['breadcrumb']}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className={styles['content']}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Layout1;
