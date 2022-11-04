/** @format */

import React, { lazy, Suspense } from 'react';
import { HomeOutlined } from '@ant-design/icons';
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
        id: '1',
        name: '首页',
        path: '/dashboard',
        icon: <HomeOutlined />,
    },
    {
        id: '2',
        name: '模块1',
        path: '/module1',
        icon: <HomeOutlined />,
    },
    {
        id: '4',
        name: '二级菜单',
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
    // let arr = path.split('/');
    // //  forEach 调用的时候 item 如果普通类型如果给 item 重新赋值 则不会修改原始值
    // //  如果是引用类型  直接改变指针的指向则原始值不会被修改
    // //  如果是引用类型  在原来引用的基础上修改会修改原始值
    // return arr
    //     .map((item) => {
    //         if (item) {
    //             return item[0].toUpperCase() + item.substring(1);
    //         } else {
    //             return item;
    //         }
    //     })
    //     .join('/');
    return path;
};
// 收集所有的叶子节点，生成路由信息
const genRouter = (menusConfig, router) => {
    menusConfig.forEach((menuItem) => {
        if (!menuItem.children) {
            router.push({
                path: menuItem.path,
                element: LazyWrapper(convertPath(menuItem.path)),
            });
        } else {
            genRouter(menuItem.children, router);
        }
    });
};

export { LazyWrapper, menus, convertPath, genRouter };
