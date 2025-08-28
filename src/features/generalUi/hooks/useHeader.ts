import { useState } from "react";
import { headerText } from "../texts/headerText";

const useHeader = () => {
  const [menuMobileOpen, setMenuMobileOpen] = useState<boolean>(false);
  const [activitesList, setActivitesList] = useState<boolean>(false);
  const [userGuidesList, setUserGuidesList] = useState<boolean>(false);
  const [linkList, setLinkList] = useState<
    { name: string; href: string; icon?: string }[]
  >([]);

  const handleMenuMobile = () => {
    setMenuMobileOpen(!menuMobileOpen);
    if (activitesList) setActivitesList(false);
    if (userGuidesList) setUserGuidesList(false);
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

  const handleClick = (action: string) => {
    switch (action) {
      case "activitesList":
        handleActivitiesList();
        break;
      case "userGuidesList":
        handleUserGuidesList();
        break;
      default:
        break;
    }
  };

  return {
    menuMobileOpen,
    activitesList,
    userGuidesList,
    linkList,
    handleClick,
    handleMenuMobile,
    handleActivitiesList,
    handleUserGuidesList,
  };
};

export default useHeader;
