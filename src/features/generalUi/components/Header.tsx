import React from 'react';
import '../layout/header.css';
const Header: React.FC = () => {

    const headerText={ initalPage: "Página Inicial", aboutUs: "Sobre nós" }

    return (
        <header>
            <div className='header__logoContainer'>
                <img className="header__logoContainer__logo" src="/logo.png"/>
                <h1 className='header__logoContainer__siteName'>LIRE-O</h1 >
            </div>
            <nav>
                <a href="/"> {headerText.initalPage} </a>
                <a href="/sobre-nos">{headerText.aboutUs} </a>
            </nav>
        </header>
    );
};


export default Header;