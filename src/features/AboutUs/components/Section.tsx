import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import TeamCarousel from "./TeamCarousel";

interface SectionProps {
  title: string;
  members?: Member[];
}

export interface Member {
  name: string;
  role: string;
  position: string;
  education: string;
  affiliation: string;
  photo: string;
}

const Section: React.FC<SectionProps> = ({ title, members }) => {
  return (
    <div className="aboutUsContainer__section">
      <h2 className="aboutUsContainer__sectionTitle">{title}</h2>
      <div className="aboutUsContainer__team">
        {members?.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            position={member.position}
            education={member.education}
            affiliation={member.affiliation}
            photo={getPublicAssetUrl(member.photo)}
          />
        ))}
      </div>
      <TeamCarousel members={members} />
    </div>
  );
};

export default Section;
