import React, { useState } from "react";
import "../layout/header.css";
import { ROUTE_PATHS } from "../../../config/routes";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const Header: React.FC = () => {
  const headerText = {
    initalPage: "Início",
    aboutUs: "Sobre Nós",
    userGuide: "Como usar",
    lireo: { img: "/images/logo-lireo-white.png", alt: "logo LIRE-O" },
    UFMG: { img: "/images/logo-UFMG-short.png", alt: "logo UFMG" },
    faculMed: {
      img: "/images/logo-Faculdade-de-Medicina-UFMG.png",
      alt: "logo Faculdade de Medicina UFMG",
    },
  };

  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false);

  const handleMenuMobile = () => setIsMenuMobileOpen(!isMenuMobileOpen);

  return (
    <>
      <header>
        <div className="header__logoContainer">
          <img
            className="header__logoContainer__logo"
            src={getPublicAssetUrl(headerText.lireo.img)}
            alt={headerText.lireo.alt}
          />
        </div>
        <nav>
          <div className="menu__desktop">
            <a href={ROUTE_PATHS.HOME}>
              <i className="bi bi-house"></i>
              {headerText.initalPage}
            </a>
            <a href={ROUTE_PATHS.USER_GUIDE}>
              <i className="bi bi-book"></i>
              {headerText.userGuide}
            </a>
            <a href={ROUTE_PATHS.ABOUT_US}>
              <i className="bi bi-people"></i>
              {headerText.aboutUs}
            </a>
          </div>
          <button className="menu__toggle__mobile" onClick={handleMenuMobile}>
            <i className={isMenuMobileOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </nav>
      </header>
      <div
        className={
          "menu__toggle__mobile__content" + (isMenuMobileOpen ? " active" : "")
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
