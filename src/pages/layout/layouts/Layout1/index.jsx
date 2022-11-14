/** @format */

import React from 'react';

import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { menus } from '@/router';
import { forEach, isArray } from '@/utils';
import styles from './layout1.module.less';
const LayoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const genMenu = (menuConfig) => {
        const ret = [];
        forEach(menuConfig, (menuItem, index, arr) => {
            if (menuItem.hidden) {
                // menuItem hidden
            } else if (menuItem.children && menuItem.children.findIndex((item) => !item.hidden) !== -1) {
                const data = {
                    key: menuItem.id,
                    label: <div className={styles['menu-label']}>{menuItem.name}</div>,
                    path: menuItem.path,
                    icon: menuItem.icon,
                    children: genMenu(menuItem.children),
                };
                ret.push(data);
            } else {
                const data = {
                    key: menuItem.id,
                    label: <div>{menuItem.name}</div>,
                    path: menuItem.path,
                    icon: menuItem.icon,
                };
                ret.push(data);
            }
        });
        return ret;
    };
    const genBreadcrumb = (pathname) => {
        let breadcrumb = [];
        function func(menus) {
            for (const idx in menus) {
                if (menus[idx].path !== pathname && (!menus[idx].children || menus[idx].children.length < 1)) {
                    // idx is like '0'
                    if (Number(idx) === menus.length - 1) {
                        // this path fail,clean breadcrumbItems
                        breadcrumb = [];
                    } else {
                        // do nothing
                    }
                } else if (menus[idx].path !== pathname && isArray(menus[idx].children) && menus[idx].children.length >= 1) {
                    // this path may be succeful,stach this segment
                    breadcrumb.push({
                        label: menus[idx].name,
                        key: menus[idx].path,
                    });
                    // only one path exactly math,find it,return
                    let isFound = func(menus[idx].children);
                    if (isFound) return;
                } else {
                    // this path succed,mark it as true
                    breadcrumb.push({ label: menus[idx].name, key: menus[idx].path });
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
