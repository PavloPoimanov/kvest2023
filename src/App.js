import './App.css';
import {Content} from "./containers/layout/Content";
import {Header} from "./containers/layout/Header";
import {Footer} from "./containers/layout/Footer";


function App() {
    return (
        <div className="app">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default App;
