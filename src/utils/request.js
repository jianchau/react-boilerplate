/** @format */
import axios from 'axios';

const request = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.PROXY_URL : process.env.REQUEST_URL,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

export { request };
