import React from "react";
import "../layout/header.css";

const Header: React.FC = () => {
  const headerText = {
    siteName: "LIRE-O",
    initalPage: "Página Inicial",
    aboutUs: "Sobre Nós",
    userGuide: "Guia do Usuário",
  };

  return (
    <header>
      <div className="header__logoContainer">
        <img className="header__logoContainer__logo" src="/logo.png" />
        <h1 className="header__logoContainer__siteName">
          {headerText.siteName}
        </h1>
      </div>
      <nav>
        <a href="/"> {headerText.initalPage} </a>
        <a href="/sobre-nos">{headerText.aboutUs} </a>
        <a href="/guia-user">{headerText.userGuide} </a>
      </nav>
    </header>
  );
};

export default Header;
