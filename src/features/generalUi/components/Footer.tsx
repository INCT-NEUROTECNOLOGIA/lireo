import React from "react";
import "../layout/footer.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const Footer: React.FC = () => {
  const footerText = {
    catchphrase: ["Fluência que diverte.", "Leitura que transforma."],
    contactTitle: "Contato",
    contactText: "Para dúvidas ou sugestões, entre em contato em: ",
    email: "lireo.suporte@gmail.com",
    emailRef:
      "https://mail.google.com/mail/u/0/?fs=1&to=lireo.suporte@gmail.com&tf=cm",
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
          <h3 className="footer__title">{footerText.contactTitle}</h3>
          <p className="footer__text">{footerText.contactText}</p>
          <a
            className="footer__email"
            href={footerText.emailRef}
            target="_blank"
            rel="noopener noreferrer"
          >
            {footerText.email}
          </a>
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
