import React from 'react';
import s from './Loader.module.scss'

export const Loader = () => {
    return (
        <div className={s.container}>
            <div className={s.loader}>
                <div className={s.loader_dot} />
                <div className={s.loader_dot} />
                <div className={s.loader_dot} />
                <div className={s.loader_dot} />
                <div className={s.loader_dot} />
                <div className={s.loader_dot} />
                <div className={s.loader_text}>Loading...</div>
            </div>
        </div>
    );
};

