import React from "react";
import "../layout/aboutUs.css";

const AboutUs: React.FC = () => {
    const teamMembers = [
      { name: "Luciana", role: "Fonoaudióloga" },
      { name: "Ramiro", role: "Desenvolvedor" },
      { name: "Ana Júlia", role: "Desenvolvedora" },
      { name: "Raphael", role: "Desenvolvedor" },
    ];
    const aboutUsText = {
      title: "Sobre Nós",
      description:
        "O LIRE-O é um site interativo com atividades lúdicas para treinar leitura, focado em melhorar a decodificação, fluência e compreensão por meio de minijogos e desafios gamificados",
    };
  
    return (
      <div className="aboutUsContainer">
        <h1 className="aboutUsContainer__title">{aboutUsText.title}</h1>
        <p className="aboutUsContainer__description">
        {aboutUsText.description}
        </p>
        <div className="aboutUsContainer__team">
          {teamMembers.map((member, index) => (
            <div key={index} className="aboutUsContainer__teamMember">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AboutUs;