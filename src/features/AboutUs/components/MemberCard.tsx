import React from "react";
import "../layout/aboutUs.css";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import { Member } from "./Section";

export interface MemberCardProps {
  member?: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <>
      {member?.type === "teamMember" && (
        <div className="aboutUsContainer__member">
          <img
            src={getPublicAssetUrl(member.photo)}
            alt={`Foto de ${member.name}`}
            className="aboutUsContainer__teamMemberPhoto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getPublicAssetUrl(
                "/images/placeholder.jpg"
              );
            }}
          />
          <div className="aboutUsContainer__teamMemberTexts">
            <h3 className="aboutUsContainer__teamMemberName">{member.name}</h3>
            <p className="aboutUsContainer__teamMemberTexts role">
              {member.role}
            </p>
            <p>{member.position}</p>
            <p>{member.education}</p>
            <p>{member.affiliation}</p>
          </div>
        </div>
      )}

      {member?.type === "collaborator" && (
        <div className="aboutUsContainer__member">
          <img
            src={getPublicAssetUrl(member.photo)}
            alt={member.alt}
            className="aboutUsContainer__collaboratorPhoto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getPublicAssetUrl(
                "/images/placeholder.jpg"
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default MemberCard;
