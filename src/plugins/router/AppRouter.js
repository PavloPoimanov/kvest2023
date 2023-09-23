import React from 'react';
import {Home} from "../../pages/home/home";
import Names from "../../pages/names/names";
import {Route, Routes} from 'react-router-dom';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/names" element={<Names/>}/>
            {/*<Route path="/places" element={<Places />} />*/}
            {/*<Route path="/numbers" element={<Numbers />} />*/}
            {/*<Route path="/quotes" element={<Quotes />} />*/}
        </Routes>
    );
};

export default AppRouter;
