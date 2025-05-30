import { ROUTE_PATHS } from "../../../../config/routes";

const supportText = {
  title: "Suporte",
  text1: "Em caso de dúvidas, dificuldades ou sugestões, consulte a seção ",
  link: "Sobre Nós",
  text2: " para obter informações de contato.",
};

const Support = () => {
  return (
    <div className="userGuide__section">
      <h2>{supportText.title}</h2>
      <p>
        {supportText.text1}
        <a href={ROUTE_PATHS.ABOUT_US}>{supportText.link}</a>
        {supportText.text2}
      </p>
    </div>
  );
};

export default Support;
