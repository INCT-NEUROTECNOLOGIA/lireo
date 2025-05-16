import React from "react";
import "../layout/aboutUs.css";
import Section from "./Section";

const AboutUs: React.FC = () => {
  const projectCreators = [
    { name: "Profa. Dra. Luciana Mendonça Alves", paragraph1: "Departamento de Fonoaudiologia da Faculdade de Medicina", paragraph2: "UFMG", paragraph3: "CRFa 6-1319", photo: "/images/DraLucianaMendonca_TeamMemberPicture.jpeg" },
    { name: "Ramiro", paragraph1: "Desenvolvedor", paragraph2:"", paragraph3:"", photo: "/images/ramiro.jpg" },
    { name: "Ana Julia Ferreira Garcia", paragraph1: "Bolsista de Iniciação Científica", paragraph2:"Curso Técnico em Desenvolvimento de Sistemas", paragraph3:" COLTEC/UFMG", photo: "/images/AnaJulia_TeamMemberPicture.jpeg" },
    { name: "Raphael Inácio Bicalho de Carvalho", paragraph1: "Bolsista de Iniciação Científica", paragraph2:"Curso Técnico em Desenvolvimento de Sistemas", paragraph3:" COLTEC/UFMG", photo: "/images/raphael.jpg" },
  ];

  const collaborators = [
    { name: "example name", paragraph1: "example", paragraph2:"", paragraph3:"", photo: "/images/exampleName.jpg" },

  ];

  const aboutUsText = {
    title: "Sobre Nós",
    description:
      "O LIRE-O é um site interativo com atividades lúdicas para treinar leitura, focado em melhorar a decodificação, fluência e compreensão por meio de minijogos e desafios gamificados.",
    creatorsSection: "Idealizadores do Projeto",
    collaboratorsSection: "Colaboradores do Projeto",
  };

  return (
    <div className="aboutUsContainer">
      <h1 className="aboutUsContainer__title">{aboutUsText.title}</h1>
      <p className="aboutUsContainer__description">{aboutUsText.description}</p>

      <Section title={aboutUsText.creatorsSection} members={projectCreators} />

      <Section title={aboutUsText.collaboratorsSection} members={collaborators} />
    </div>
  );
};

export default AboutUs;