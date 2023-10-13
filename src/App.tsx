import React from 'react';
import s from './App.module.scss'
import {Main} from './pages/Main/Main';

function App() {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                {/*<Layout />*/}
                {/*<Routes>*/}
                {/*    /!*<Route path='/' element={<Main/>}/>*!/*/}
                {/*    /!*<Route path='/currency-statistics' element={<CurrencyStatistics />} />*!/*/}
                {/*    /!*<Route path='*' element={<ErrorPage />} />*!/*/}
                {/*</Routes>*/}
                <Main/>
            </div>
        </div>
    );
}

export default App;
