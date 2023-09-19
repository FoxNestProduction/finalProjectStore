import React from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {

    return(
        <>
            <header>
                <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/Menu">Menu</Link>
                    </li>
                    <li>
                    <Link to="/Blog">Blog</Link>
                    </li>
                    <li>
                    <Link to="/Pricing">Pricing</Link>
                    </li>
                    <li>
                    <Link to="/Contact">Contact</Link>
                    </li>
                </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </>
    )
}

export default PublicLayout;


