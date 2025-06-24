import React from "react";
import "../layout/footer.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const Footer: React.FC = () => {
  const footerText = {
    catchphrase: ["Fluência que diverte.", "Leitura que transforma."],
    contact: "Contato",
    email: "Email: ",
    telephone: "Tel: ",
    quote: {
      text: '"Observai os lírios, como crescem. Não trabalham nem fiam e, no entanto, eu vos digo: nem Salomão, em toda a sua glória, jamais se vestiu como um só dentre eles."',
      origin: "Lucas 12:27",
    },
    copyright: "© 2024 LIRE-O. Todos os direitos reservados.",
    logo: "logotipo LIRE-O",
  };

  return (
    <footer>
      <div className="footer__content">
        <div className="footer__section">
          <img
            className="footer__img"
            src={getPublicAssetUrl("/images/logo-lireo-white.png")}
            alt={footerText.logo}
          />
          <p className="footer__text">{footerText.catchphrase[0]}</p>
          <p className="footer__text">{footerText.catchphrase[1]}</p>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">{footerText.contact}</h3>
          <p className="footer__text">{footerText.email}</p>
          <p className="footer__text">{footerText.telephone}</p>
        </div>
      </div>
      <p className="footer__quote">
        {footerText.quote.text}
        <span>{footerText.quote.origin}</span>
      </p>
      <div className="footer__copyright">{footerText.copyright}</div>
    </footer>
  );
};

export default Footer;
