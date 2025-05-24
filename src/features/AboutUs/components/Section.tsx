import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import { getPublicAssetUrl } from "../../../utils/pathUtils";

interface SectionProps {
  title: string;
  members: { name: string; paragraph1: string; paragraph2: string; paragraph3: string; photo: string }[];
}

const Section: React.FC<SectionProps> = ({ title, members }) => {
  return (
    <div className="aboutUsContainer__section">
      <h2 className="aboutUsContainer__sectionTitle">{title}</h2>
      <div className="aboutUsContainer__team">
        {members.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            paragraph1={member.paragraph1}
            paragraph2={member.paragraph2}
            paragraph3={member.paragraph3}
            photo={getPublicAssetUrl(member.photo)}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;