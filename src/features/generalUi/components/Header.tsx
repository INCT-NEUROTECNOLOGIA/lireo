import React from 'react';
import '../layout/header.css';
const Header: React.FC = () => {
    return (
        <header>
            <div className='header__logoContainer'>
                <img className="header__logoContainer__logo" src="/logo.png"/>
                <h1 className='header__logoContainer__siteName'>LIRE-O</h1 >
            </div>
            <nav>
                <a href="/"> Página Inicial </a>
                <a href="/sobre-nos">Sobre Nós </a>
            </nav>
        </header>
    );
};


export default Header;