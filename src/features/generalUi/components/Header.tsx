import React, { useState } from "react";
import "../layout/header.css";
import { ROUTE_PATHS } from "../../../config/routes";

const Header: React.FC = () => {
  const headerText = {
    siteName: "LIRE-O",
    initalPage: "Página Inicial",
    aboutUs: "Sobre Nós",
    userGuide: "Guia do Usuário",
  };

  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);

  const handleMenuMobile = () => setMenuMobileOpen(!menuMobileOpen);

  return (
    <>
      <header>
        <div className="header__logoContainer">
          {/* <img className="header__logoContainer__logo" src="/logo.png" /> */}
          <h1 className="header__logoContainer__siteName">
            {headerText.siteName}
          </h1>
        </div>
        <nav>
          <div className="menu__desktop">
            <a href={ROUTE_PATHS.HOME}> {headerText.initalPage} </a>
            <a href={ROUTE_PATHS.USER_GUIDE}>{headerText.userGuide} </a>
            <a href={ROUTE_PATHS.ABOUT_US}>{headerText.aboutUs} </a>
          </div>
          <button className="menu__toggle__mobile" onClick={handleMenuMobile}>
            <i className="bi bi-list"></i>
          </button>
        </nav>
      </header>
      <div
        className={
          "menu__toggle__mobile__content" + (menuMobileOpen ? " active" : "")
        }
      >
        <ul>
          <li>
            <a href={ROUTE_PATHS.HOME}> {headerText.initalPage} </a>
          </li>
          <li>
            <a href={ROUTE_PATHS.USER_GUIDE}>{headerText.userGuide} </a>
          </li>
          <li>
            <a href={ROUTE_PATHS.ABOUT_US}>{headerText.aboutUs} </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
