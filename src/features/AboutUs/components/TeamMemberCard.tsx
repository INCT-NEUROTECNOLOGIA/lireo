import React from "react";
import "../layout/aboutUs.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

export interface TeamMemberCardProps {
  name: string;
  role: string;
  position: string;
  education: string;
  affiliation: string;
  photo: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  position,
  education,
  affiliation,
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
        <p className="aboutUsContainer__teamMemberTexts role">{role}</p>
        <p>{position}</p>
        <p>{education}</p>
        <p>{affiliation}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
