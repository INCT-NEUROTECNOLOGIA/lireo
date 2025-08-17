import React, { use, useState } from "react";
import "../layout/header.css";
import { ROUTE_PATHS } from "../../../config/routes";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const Header: React.FC = () => {
  const headerText = {
    initalPage: "Início",
    aboutUs: "Sobre Nós",
    activites: "Atividades",
    activitesList: [
      {
        name: "LireFlow",
        href: ROUTE_PATHS.LIRE_FLOW,
        icon: "bi bi-highlighter",
      },
      {
        name: "LireGrow",
        href: ROUTE_PATHS.LIRE_GROW,
        icon: "bi bi-card-text",
      },
    ],
    userGuides: "Guias do Usuário",
    userGuidesList: [
      {
        name: "LireFlow",
        href: ROUTE_PATHS.USER_GUIDE_LIRE_FLOW,
      },
      {
        name: "LireGrow",
        href: ROUTE_PATHS.USER_GUIDE_LIRE_GROW,
      },
    ],
    lireo: { img: "/images/logo-lireo-white.png", alt: "logo LIRE-O" },
    UFMG: { img: "/images/logo-UFMG-short.png", alt: "logo UFMG" },
    faculMed: {
      img: "/images/logo-Faculdade-de-Medicina-UFMG.png",
      alt: "logo Faculdade de Medicina UFMG",
    },
  };

  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);
  const [activitesList, setActivitesList] = useState<boolean>(false);
  const [userGuidesList, setUserGuidesList] = useState<boolean>(false);
  const [linkList, setLinkList] = useState<
    { name: string; href: string; icon?: string }[]
  >([]);

  const handleMenuMobile = () => {
    setMenuMobileOpen(!menuMobileOpen);
    if (activitesList) setActivitesList(false);
  };

  const handleActivitiesList = () => {
    setActivitesList(!activitesList);
    if (menuMobileOpen) setMenuMobileOpen(false);
    setLinkList(headerText.activitesList);
  };

  const handleUserGuidesList = () => {
    setUserGuidesList(!userGuidesList);
    if (menuMobileOpen) setMenuMobileOpen(false);
    setLinkList(headerText.userGuidesList);
  };

  return (
    <div className="header__container">
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
              {headerText.activites}
            </a>
            <a onClick={handleUserGuidesList}>
              <i className="bi bi-journal-text"></i>
              {headerText.userGuides}
            </a>
            <a href={ROUTE_PATHS.ABOUT_US}>
              <i className="bi bi-people"></i>
              {headerText.aboutUs}
            </a>
          </div>
          <button className="menu__toggle__mobile" onClick={handleMenuMobile}>
            <i
              className={
                menuMobileOpen || activitesList ? "bi bi-x-lg" : "bi bi-list"
              }
            ></i>
          </button>
        </nav>
      </header>
      <div
        className={
          "menu__toggle__mobile__content" + (menuMobileOpen ? " active" : "")
        }
      >
        <a href={ROUTE_PATHS.HOME}>
          <i className="bi bi-house"></i>
          {headerText.initalPage}
        </a>
        <a onClick={handleActivitiesList}>
          <i className="bi bi-book"></i>
          {headerText.activites}
        </a>
        <a href={ROUTE_PATHS.ABOUT_US}>
          <i className="bi bi-people"></i>
          {headerText.aboutUs}
        </a>
      </div>
      <div
        className={
          "menu__toggle__activitiesList" +
          (activitesList || userGuidesList ? " active" : "")
        }
      >
        {linkList.map((item, index) => (
          <a key={index} href={item.href}>
            <i className={item.icon}></i>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;
