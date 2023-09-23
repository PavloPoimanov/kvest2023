import {Route, Routes} from 'react-router-dom';
import {Home} from "../../pages/home/Home";
import Names from "../../pages/names/Names";
import {ElegantMonochrome} from "../../pages/themes/ElegantMonochrome";
import React from 'react';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/names" element={<Names/>}/>
            <Route path="/testTheme" element={<ElegantMonochrome/>}/>
            {/*<Route path="/places" element={<Places />} />*/}
            {/*<Route path="/numbers" element={<Numbers />} />*/}
            {/*<Route path="/quotes" element={<Quotes />} />*/}
        </Routes>
    );
};

export default AppRouter;
