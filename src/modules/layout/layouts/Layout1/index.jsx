/** @format */

import React from 'react';

import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { menus } from '@/router';
import { forEach, isBuffer } from '@/utils';
import styles from './layout1.module.less';
const LayoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const genMenu = (menuConfig) => {
        return menuConfig.map((menuItem) => {
            if (menuItem.children) {
                return {
                    key: menuItem.id,
                    label: <div className={styles['menu-label']}>{menuItem.name}</div>,
                    path: menuItem.path,
                    icon: menuItem.icon,
                    children: genMenu(menuItem.children),
                };
            } else {
                return {
                    key: menuItem.id,
                    label: <div>{menuItem.name}</div>,
                    path: menuItem.path,
                    icon: menuItem.icon,
                };
            }
        });
    };
    const genBreadcrumb = (pathname) => {
        let breadcrumb = [];
        function func(menus) {
            for (const item of menus) {
                if (item.path !== pathname && (!item.children || item.children.length < 1)) {
                    breadcrumb = [];
                } else if (item.path !== pathname && item.children.length >= 1) {
                    breadcrumb.push({
                        label: item.name,
                        key: item.path,
                    });
                    let isFound = func(item.children);
                    if (isFound) return;
                } else {
                    breadcrumb.push({ label: item.name, key: item.path });
                    return true;
                }
            }
        }
        func(menus);
        return breadcrumb;
    };
    const items = genMenu(menus);
    const breadcrumbItems = genBreadcrumb(location.pathname);
    const handleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        let { path } = item.props;
        navigate(path);
    };
    return (
        <Layout className={styles.layout}>
            <Sider className={`${styles.sider} diy-sider`}>
                <div className={styles['logo']}>
                    <img className={styles.icon} src="/static/images/favicon.png" /> project name
                </div>
                <Menu className={styles.menu} mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} items={items} onSelect={handleSelect} />
            </Sider>
            <Layout>
                <Header className={styles['header']}>
                    <Breadcrumb className={styles.breadcrumb}>
                        {breadcrumbItems.map((item) => (
                            <Breadcrumb.Item key={item.key}>
                                <Link to={item.key}></Link>
                                {item.label}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Header>
                <Content className={styles['content']}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
