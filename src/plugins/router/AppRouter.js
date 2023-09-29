import {Route, Routes} from 'react-router-dom';
import {Home} from "../../pages/home/Home";
import {Text} from "../../pages/text/Text";
import Names from "../../pages/names/Names";
import {ElegantMonochrome} from "../../pages/themes/ElegantMonochrome";
import React from 'react';
import Numbers from "../../pages/numbers/Numbers";
import Places from "../../pages/places/Places";
import Quotes from "../../pages/quotes/Quotes";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/names" element={<Names/>}/>
            <Route path="/numbers" element={<Numbers/>}/>
            <Route path="/places" element={<Places/>}/>
            <Route path="/quotes" element={<Quotes/>}/>
            <Route path="/text/:bookId/:chapterId/:verseId" element={<Text/>}/>
            <Route path="/text/:bookId/:chapterId" element={<Text/>}/>
            <Route path="/text" element={<Text/>}/>
            <Route path="/testTheme" element={<ElegantMonochrome/>}/>
            {/*<Route path="/places" element={<Places />} />*/}
            {/*<Route path="/numbers" element={<Numbers />} />*/}
            {/*<Route path="/quotes" element={<Quotes />} />*/}
        </Routes>
    );
};

export default AppRouter;
