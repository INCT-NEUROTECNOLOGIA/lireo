import React, { useState } from "react";
import "../layout/header.css";
import { ROUTE_PATHS } from "../../../config/routes";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const Header: React.FC = () => {
  const headerText = {
    initalPage: "Início",
    aboutUs: "Sobre Nós",
    userGuide: "Como usar",
  };

  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);

  const handleMenuMobile = () => setMenuMobileOpen(!menuMobileOpen);

  return (
    <>
      <header>
        <div className="header__logoContainer">
          <img
            className="header__logoContainer__logo"
            src={getPublicAssetUrl("/images/logo-lireo-white.png")}
          />
        </div>
        <nav>
          <div className="menu__desktop">
            <a href={ROUTE_PATHS.HOME}>
              <i className="bi bi-house"></i>
              {headerText.initalPage}{" "}
            </a>
            <a href={ROUTE_PATHS.USER_GUIDE}>
              <i className="bi bi-book"></i>
              {headerText.userGuide}{" "}
            </a>
            <a href={ROUTE_PATHS.ABOUT_US}>
              <i className="bi bi-people"></i>
              {headerText.aboutUs}{" "}
            </a>
          </div>
          <button className="menu__toggle__mobile" onClick={handleMenuMobile}>
            <i className={menuMobileOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </nav>
      </header>
      <div
        className={
          "menu__toggle__mobile__content" + (menuMobileOpen ? " active" : "")
        }
      >
        <a href={ROUTE_PATHS.HOME}> {headerText.initalPage} </a>
        <a href={ROUTE_PATHS.USER_GUIDE}>{headerText.userGuide} </a>
        <a href={ROUTE_PATHS.ABOUT_US}>{headerText.aboutUs} </a>
      </div>
    </>
  );
};

export default Header;
