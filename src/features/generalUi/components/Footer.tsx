import React from "react";
import "../layout/footer.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import { ROUTE_PATHS } from "../../../config/routes";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer__content">
        <div className="footer__section">
          <img
            className="footer__img"
            src={getPublicAssetUrl("/images/logo-lireo-white.png")}
          />
          <p className="footer__text">
            Transformando a maneira como as pessoas leem e aprendem.
          </p>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">Links Rápidos</h3>
          <div className="footer__links">
            <a href={ROUTE_PATHS.HOME}>Início</a>
            <a href={ROUTE_PATHS.USER_GUIDE}>Como usar</a>
            <a href={ROUTE_PATHS.ABOUT_US}>Sobre Nós</a>
          </div>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">Contato</h3>
          <p className="footer__text">Email: contato@lire-o.edu.br</p>
          <p className="footer__text">Tel: (11) 1234-5678</p>
        </div>
      </div>
      <p className="footer__quote">
        "Observai os lírios, como crescem. Não trabalham nem fiam e, no entanto,
        eu vos digo: nem Salomão, em toda a sua glória, jamais se vestiu como um
        só dentre eles."
        <span>Lucas 12:27</span>
      </p>
      <div className="footer__copyright">
        © 2024 LIRE-O. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
