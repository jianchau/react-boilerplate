/** @format */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Layout from '@/pages/layout';
import { Provider } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import store from '@/store';
import { genRouter, menus, LazyWrapper } from '@/router/index';

import './index.less';

import ErrorPage from './error-page';

const Main = () => {
    let router = [
        {
            path: '/login',
            element: LazyWrapper('/login'),
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
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <Main />
            </ConfigProvider>
        </Provider>
    </BrowserRouter>,
);
