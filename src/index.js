/** @format */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, BrowserRouter, useRoutes } from 'react-router-dom';
import Layout from '@/modules/layout';
import { Provider } from 'react-redux';
import store from '@/store';
import { genRouter, menus, LazyWrapper } from '@/router/index';

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
        <Provider store={store}>
            <Main />
        </Provider>
    </BrowserRouter>,
);
