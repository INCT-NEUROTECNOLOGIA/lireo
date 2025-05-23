import React from "react";
import "../layout/aboutUs.css";
import Section from "./Section";

const AboutUs: React.FC = () => {
  interface TeamMember {
    name: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    photo: string;
  }

  const projectCreators: TeamMember[] = [
    { name: "Profa. Dra. Luciana Mendonça Alves", paragraph1: "Departamento de Fonoaudiologia da Faculdade de Medicina", paragraph2: "UFMG", paragraph3: "CRFa 6-1319", photo: "/images/DraLucianaMendonca_TeamMemberPicture.jpeg" },
    { name: "Ramiro", paragraph1: "Desenvolvedor", paragraph2:"", paragraph3:"", photo: "/images/ramiro.jpg" },
    { name: "Ana Julia Ferreira Garcia", paragraph1: "Bolsista de Iniciação Científica", paragraph2:"Curso Técnico em Desenvolvimento de Sistemas", paragraph3:" COLTEC/UFMG", photo: "/images/AnaJulia_TeamMemberPicture.jpeg" },
    { name: "Raphael Inácio Bicalho de Carvalho", paragraph1: "Bolsista de Iniciação Científica", paragraph2:"Curso Técnico em Desenvolvimento de Sistemas", paragraph3:" COLTEC/UFMG", photo: "/images/raphael.jpg" },
  ];

  const collaborators: TeamMember[] = [
    { name: "example name", paragraph1: "example", paragraph2:"", paragraph3:"", photo: "/images/exampleName.jpg" },

  ];

  const supportingInstitutions = [
    { name: "UFMG", logo: "/images/logoUFMG.jpg" },
    { name: "COLTEC", logo: "/images/coltec_logo.png" },
    
  ];

  const aboutUsText = {
    title: "Sobre Nós",
    description:
      "O LIRE-O é um site interativo com atividades lúdicas para treinar leitura, focado em melhorar a decodificação, fluência e compreensão por meio de minijogos e desafios gamificados.",
    creatorsSection: "Idealizadores do Projeto",
    collaboratorsSection: "Colaboradores do Projeto",
    institutionsSection: "Instituições de Apoio",
  };

  return (
    <div className="aboutUsContainer">
      <h1 className="aboutUsContainer__title">{aboutUsText.title}</h1>
      <p className="aboutUsContainer__description">{aboutUsText.description}</p>

      <div className="aboutUsContainer__section">
        <h2 className="aboutUsContainer__sectionTitle">{aboutUsText.institutionsSection}</h2>
        <div className="aboutUsContainer__logos">
          {supportingInstitutions.map((institution, index) => (
            <img
              key={index}
              src={institution.logo}
              alt={`Logo da ${institution.name}`}
              className="aboutUsContainer__logo"
            />
          ))}
        </div>
      </div>

      <Section title={aboutUsText.creatorsSection} members={projectCreators} />

      <Section title={aboutUsText.collaboratorsSection} members={collaborators} />
    </div>
  );
};

export default AboutUs;