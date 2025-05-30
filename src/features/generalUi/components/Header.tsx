import React from "react";
import "../layout/header.css";
import { ROUTE_PATHS } from "../../../config/routes";

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
        {/* <img className="header__logoContainer__logo" src="/logo.png" /> */}
        <h1 className="header__logoContainer__siteName">
          {headerText.siteName}
        </h1>
      </div>
      <nav>
        <a href={ROUTE_PATHS.HOME}> {headerText.initalPage} </a>
        <a href={ROUTE_PATHS.USER_GUIDE}>{headerText.userGuide} </a>
        <a href={ROUTE_PATHS.ABOUT_US}>{headerText.aboutUs} </a>
      </nav>
    </header>
  );
};

export default Header;
