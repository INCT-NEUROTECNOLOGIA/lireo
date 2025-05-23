import React from "react";
import "../layout/aboutUs.css";

interface TeamMemberCardProps {
  name: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  photo: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, paragraph1, paragraph2, paragraph3, photo }) => {
  const AltText = `Foto de ${name}`;
  return (
    <div className="aboutUsContainer__teamMember">
      <img
        src={photo}
        alt={AltText}
        className="aboutUsContainer__teamMemberPhoto"
        onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; 
          }}
      />
      <div className="aboutUsContainer__teamMemberTexts">
        <h3 className="aboutUsContainer__teamMemberName">{name}</h3>
        <p className="aboutUsContainer__teamMemberParagraph">{paragraph1}</p>
        <p className="aboutUsContainer__teamMemberParagraph">{paragraph2}</p>
        <p className="aboutUsContainer__teamMemberParagraph">{paragraph3}</p>
      </div>

    </div>
  );
};

export default TeamMemberCard;