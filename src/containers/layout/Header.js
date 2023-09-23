import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/names">Names</Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/places">Places</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/numbers">Numbers</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/quotes">Quotes</Link>*/}
                    {/*</li>*/}
                </ul>
            </nav>
        </header>
    );
};
