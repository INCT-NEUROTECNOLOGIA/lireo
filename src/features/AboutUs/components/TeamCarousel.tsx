import React, { useEffect, useRef, useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import type { TeamMemberCardProps } from "./TeamMemberCard";
import { getPublicAssetUrl } from "../../../utils/pathUtils";
import "../layout/TeamCarouselStyle.css";

interface TeamCarouselProps {
  members?: TeamMemberCardProps[];
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ members = [] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const waitTime = 4000;

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, waitTime);

    return () => clearInterval(interval);
  }, [members.length, isPaused]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div
      className="aboutUsContainer__teamCarousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="aboutUsContainer__teamCarousel__track" ref={trackRef}>
        {members.map((member, index) => (
          <div className="aboutUsContainer__teamCarousel__item" key={index}>
            <TeamMemberCard
              name={member.name}
              role={member.role}
              position={member.position}
              education={member.education}
              affiliation={member.affiliation}
              photo={getPublicAssetUrl(member.photo)}
            />
          </div>
        ))}
      </div>
      <div className="aboutUsContainer__teamCarousel__controls">
        <button
          className="aboutUsContainer__teamCarousel__button next"
          onClick={goPrev}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="aboutUsContainer__teamCarousel__indicators">
          {members.map((_member, index) => (
            <button
              key={index}
              className={
                "aboutUsContainer__teamCarousel__indicators__dot" +
                (index === currentIndex ? " active" : "")
              }
              onClick={() => goToIndex(index)}
            ></button>
          ))}
        </div>
        <button
          className="aboutUsContainer__teamCarousel__button prev"
          onClick={goNext}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default TeamCarousel;
