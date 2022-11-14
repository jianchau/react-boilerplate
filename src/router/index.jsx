/** @format */

import React, { lazy, Suspense } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { isArray } from '@/utils';
const LazyWrapper = (path) => {
    const Component = lazy(() => import(`../pages${path}`));
    return (
        <Suspense fallback={<div>loading</div>}>
            <Component />
        </Suspense>
    );
};
// in real project,menus is often binded with account
// front end get it by send a request(eg:user init)
const menus = [
    {
        id: '/dashboard',
        name: 'index：counter example',
        path: '/dashboard',
        icon: <HomeOutlined />,
    },
    {
        id: '/module1',
        name: 'hidde a child menu',
        path: '/module1',
        icon: <HomeOutlined />,
        children: [
            {
                id: '/module3',
                name: '模块3',
                path: '/module3',
                icon: <HomeOutlined />,
                hidden: true,
            },
        ],
    },
    {
        id: '4',
        name: '/login to access login',
        path: '',
        icon: <HomeOutlined />,
        children: [
            {
                id: '5',
                name: '模块2',
                path: '/module2',
                icon: <HomeOutlined />,
            },
        ],
    },
];

const convertPath = (path) => {
    // if neccessary,we can do url convert job here
    return path;
};
// 收集所有的叶子节点，生成路由信息
const genRouter = (menusConfig, router) => {
    menusConfig.forEach((menuItem) => {
        // gen route for first level
        if (!menuItem.children) {
            router.push({
                path: menuItem.path,
                element: LazyWrapper(convertPath(menuItem.path)),
            });
        }
        // gen route for first level and recursive
        else if (isArray(menuItem.children) && menuItem.children.findIndex((item) => !item.hidden) === -1) {
            router.push({
                path: menuItem.path,
                element: LazyWrapper(convertPath(menuItem.path)),
            });
            genRouter(menuItem.children, router);
        }
        // do not gen route for first level,but for children
        else {
            genRouter(menuItem.children, router);
        }
    });
};

export { LazyWrapper, menus, convertPath, genRouter };
