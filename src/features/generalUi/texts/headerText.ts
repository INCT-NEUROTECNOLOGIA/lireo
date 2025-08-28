import { ROUTE_PATHS } from "../../../config/routes";

export const headerText = {
  menuLinks: [
    { name: "Início", href: ROUTE_PATHS.HOME, icon: "bi bi-house" },
    {
      name: "Atividades",
      icon: "bi bi-book",
      action: "activitesList",
    },
    {
      name: "Guias do Usuário",
      icon: "bi bi-journal-text",
      action: "userGuidesList",
    },
    { name: "Sobre Nós", href: ROUTE_PATHS.ABOUT_US, icon: "bi bi-people" },
  ],
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
      icon: "bi bi-journal-text",
    },
    {
      name: "LireGrow",
      href: ROUTE_PATHS.USER_GUIDE_LIRE_GROW,
      icon: "bi bi-journal-text",
    },
  ],
  lireo: { img: "/images/logo-lireo-white.png", alt: "logo LIRE-O" },
  UFMG: { img: "/images/logo-UFMG-short.png", alt: "logo UFMG" },
  faculMed: {
    img: "/images/logo-Faculdade-de-Medicina-UFMG.png",
    alt: "logo Faculdade de Medicina UFMG",
  },
};
