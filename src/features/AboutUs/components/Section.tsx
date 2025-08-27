import React from "react";
import MemberCard from "./MemberCard";
import TeamCarousel from "./MemberCarousel";

export interface Member {
  type: "teamMember" | "collaborator";
  name?: string;
  role?: string;
  position?: string;
  education?: string;
  affiliation?: string;
  photo: string;
  alt: string;
}

interface SectionProps {
  title: string;
  members?: Member[];
}

const Section: React.FC<SectionProps> = ({ title, members }) => {
  return (
    <div className="aboutUsContainer__section">
      <h2 className="aboutUsContainer__sectionTitle">{title}</h2>
      <div className="aboutUsContainer__team">
        {members?.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
      <TeamCarousel members={members} />
    </div>
  );
};

export default Section;
