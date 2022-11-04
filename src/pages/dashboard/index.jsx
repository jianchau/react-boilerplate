/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, asyncIncrement } from '@/store/features/counterSlice';
import styles from './dashboard.module.less';
export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <div>
                    1、following is a counter example,count is maintained by react-redux
                    <br />
                    @reduxjs/toolkit makes react-redux easier to use
                </div>
                <br />
                <div>
                    <div>{count}</div>
                    <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                        Decrement
                    </button>
                    <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                        Increment
                    </button>
                    <button aria-label="AsyncIncrement value" onClick={() => dispatch(asyncIncrement())}>
                        AsyncIncrement
                    </button>
                </div>
            </div>
            <br />
            <div>
                <div className={styles['zoom']}>2、zoom browser,you will see the fontsize is changing</div>
            </div>
        </div>
    );
}

export default Counter;
