import {Link} from 'react-router-dom';
import React from 'react';

export const Header = () => {
    return (
        <header className="bg-white py-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-blue-gray">Kvest 2023</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link className="text-blue-gray hover:text-light-blue-gray transition duration-300" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/names' className="text-blue-gray hover:text-light-blue-gray transition duration-300">
                                    Names
                            </Link>
                        </li>
                        <li>
                            <Link to='/testTheme' className="text-blue-gray hover:text-light-blue-gray transition duration-300">
                                    Theme check
                            </Link>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
