import React from "react";
import "../layout/aboutUs.css";
import Section from "./Section";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

const AboutUs: React.FC = () => {
  const projectCreators = [
    {
      name: "Profa. Dra. Luciana Mendonça Alves",
      paragraph1: "Coordenadora do projeto",
      paragraph2: "Departamento de Fonoaudiologia da Faculdade de Medicina",
      paragraph3: "UFMG",
      paragraph4: "CRFa 6-1319",
      photo: "/images/DraLucianaMendonca_TeamMemberPicture.jpeg",
    },
    {
      name: "Ramiro",
      paragraph1: "Desenvolvedor",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      photo: "/images/ramiro.jpg",
    },
    {
      name: "Ana Julia Ferreira Garcia",
      paragraph1: "Desenvolvedora",
      paragraph2: "Bolsista de Iniciação Científica",
      paragraph3: "Curso Técnico em Desenvolvimento de Sistemas",
      paragraph4: " COLTEC/UFMG",
      photo: "/images/AnaJulia_TeamMemberPicture.jpeg",
    },
    {
      name: "Raphael Inácio Bicalho de Carvalho",
      paragraph1: "Desenvolvedor",
      paragraph2: "Bolsista de Iniciação Científica",
      paragraph3: "Curso Técnico em Desenvolvimento de Sistemas",
      paragraph4: " COLTEC/UFMG",
      photo: "/images/raphael.jpg",
    },
  ];

  const collaborators = [
    {
      name: "example name",
      paragraph1: "example",
      paragraph2: "",
      paragraph3: "",
      paragraph4: "",
      photo: "/images/exampleName.jpg",
    },
  ];

  const aboutUsText = {
    summary: {
      title: "Sobre Nós",
      description:
        "O LIRE-O é um site interativo com atividades lúdicas para treinar leitura, focado em melhorar a decodificação, fluência e compreensão por meio de minijogos e desafios gamificados.",
    },
    ourStory: {
      title: "Nossa História",
      description: [
        "O LIRE-O nasceu como um projeto acadêmico desenvolvido na Universidade Federal de Minas Gerais (UFMG), no Departamento de Fonoaudiologia da Faculdade de Medicina. O projeto foi idealizado pela Profa. Dra. Luciana Mendonça Alves e desenvolvido com o apoio de bolsistas do COLTEC/UFMG, dentro de uma proposta voltada à promoção da fluência leitora entre crianças e adolescentes.",
        "Sabemos que, para muitos, o ato de ler pode parecer uma obrigação ou um desafio difícil de superar. Por isso, o LIRE-O foi pensado como um espaço onde a leitura se torna leve, divertida e acessível. Através de minijogos e desafios gamificados, os alunos são estimulados a praticar a leitura de forma natural e envolvente, no seu próprio ritmo.",
        "Ao mesmo tempo, pais e professores encontram no LIRE-O uma ferramenta de apoio, que permite acompanhar o progresso dos leitores e incentivar o hábito da leitura no cotidiano.",
        "Mais do que um site, o LIRE-O é fruto de uma construção coletiva e acadêmica que acredita que ler pode — e deve — ser uma aventura prazerosa desde os primeiros passos.",
      ],
    },
    creatorsSection: "Idealizadores do Projeto",
    collaboratorsSection: "Colaboradores do Projeto",
  };

  return (
    <div className="aboutUsContainer">
      <div className="aboutUsContainer__summary">
        <h1>{aboutUsText.summary.title}</h1>
        <p>{aboutUsText.summary.description}</p>
      </div>

      <div className="aboutUsContainer__ourStory">
        <div className="aboutUsContainer__ourStory__text">
          <h1>{aboutUsText.ourStory.title}</h1>
          {aboutUsText.ourStory.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <img src={getPublicAssetUrl("/images/icone-lireo.png")} />
      </div>

      <Section title={aboutUsText.creatorsSection} members={projectCreators} />

      <Section
        title={aboutUsText.collaboratorsSection}
        members={collaborators}
      />
    </div>
  );
};

export default AboutUs;
