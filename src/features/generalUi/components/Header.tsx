import React, { useState } from "react";
import "../layout/header.css";
import { ROUTE_PATHS } from "../../../config/routes";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const Header: React.FC = () => {
  const headerText = {
    initalPage: "Início",
    aboutUs: "Sobre Nós",
    userGuide: "Atividades",
    lireo: { img: "/images/logo-lireo-white.png", alt: "logo LIRE-O" },
    UFMG: { img: "/images/logo-UFMG-short.png", alt: "logo UFMG" },
    faculMed: {
      img: "/images/logo-Faculdade-de-Medicina-UFMG.png",
      alt: "logo Faculdade de Medicina UFMG",
    },
  };

  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);
  const [activitesList, setActivitesList] = useState<boolean>(false);

  const handleMenuMobile = () => setMenuMobileOpen(!menuMobileOpen);
  const handleActivitiesList = () => setActivitesList(!activitesList);

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
            <a onClick={handleActivitiesList}>
              <i className="bi bi-book"></i>
              {headerText.userGuide}
            </a>
            <a href={ROUTE_PATHS.ABOUT_US}>
              <i className="bi bi-people"></i>
              {headerText.aboutUs}
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
        <a onClick={handleActivitiesList}>{headerText.userGuide} </a>
        <a href={ROUTE_PATHS.ABOUT_US}>{headerText.aboutUs} </a>
      </div>
    </>
  );
};

export default Header;
