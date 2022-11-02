/** @format */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, BrowserRouter, useRoutes } from 'react-router-dom';
import Layout from '@/modules/layout';
import { genRouter, menus, LazyWrapper } from '@/router/index';
import './Normalize.css';
import 'antd/dist/antd.css';
import './index.less';

import ErrorPage from './error-page';

const Main = () => {
    let router = [
        {
            path: '/login',
            element: LazyWrapper('Login'),
        },
        {
            path: '/',
            element: <Layout />,
            children: [],
        },
    ];
    genRouter(menus, router[1].children);
    const elements = useRoutes(router);

    return <React.Fragment>{elements}</React.Fragment>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
);
