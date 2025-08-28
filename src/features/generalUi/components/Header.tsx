import "../layout/header.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import { headerText } from "../texts/headerText";
import useHeader from "../hooks/useHeader";

const Header: React.FC = () => {
  const {
    menuMobileOpen,
    activitesList,
    userGuidesList,
    linkList,
    handleClick,
    handleMenuMobile,
  } = useHeader();

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
            {headerText.menuLinks.map(
              (link, index) =>
                (link.href && (
                  <a key={index} href={link?.href}>
                    <i className={link.icon}></i>
                    {link.name}
                  </a>
                )) ||
                (link.action && (
                  <a key={index} onClick={() => handleClick(link.action)}>
                    <i className={link.icon}></i>
                    {link.name}
                  </a>
                ))
            )}
          </div>
          <button className="menu__toggle__mobile" onClick={handleMenuMobile}>
            <i
              className={
                menuMobileOpen || activitesList || userGuidesList
                  ? "bi bi-x-lg"
                  : "bi bi-list"
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
        {headerText.menuLinks.map(
          (link, index) =>
            (link.href && (
              <a key={index} href={link?.href}>
                <i className={link.icon}></i>
                {link.name}
              </a>
            )) ||
            (link.action && (
              <a key={index} onClick={() => handleClick(link.action)}>
                <i className={link.icon}></i>
                {link.name}
              </a>
            ))
        )}
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
