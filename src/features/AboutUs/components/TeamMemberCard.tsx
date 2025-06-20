import React from "react";
import "../layout/aboutUs.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

export interface TeamMemberCardProps {
  name: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  photo: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
  photo,
}) => {
  return (
    <div className="aboutUsContainer__teamMember">
      <img
        src={photo}
        alt={`Foto de ${name}`}
        className="aboutUsContainer__teamMemberPhoto"
        onError={(e) => {
          (e.target as HTMLImageElement).src = getPublicAssetUrl(
            "/images/placeholder.jpg"
          );
        }}
      />
      <div className="aboutUsContainer__teamMemberTexts">
        <h3 className="aboutUsContainer__teamMemberName">{name}</h3>
        <p className="aboutUsContainer__teamMemberTexts role">{paragraph1}</p>
        <p>{paragraph2}</p>
        <p>{paragraph3}</p>
        <p>{paragraph4}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
